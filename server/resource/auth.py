from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
import traceback

from utils import _log, _hash_password, _verify_password
from db.controller import controller
from middleware.auth import store_jti, revoke_jti
from services.audit import log_audit
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
    decode_token,
)

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=['POST'])
def register():
    payload = request.get_json() or {}
    email = payload.get('email')
    password = payload.get('password')
    role = payload.get('role', 'patient')

    if not email or not password:
        return jsonify({'error': 'email and password are required'}), 400
    if role not in ('patient', 'doctor', 'nurse', 'admin'):
        return jsonify({'error': 'invalid role'}), 400

    existing = controller.find_one_by('auth_users', 'email', email)
    if existing:
        return jsonify({'error': 'user already exists'}), 400

    pw_hash = _hash_password(password)
    user_id = controller.create('auth_users', {
        'email': email,
        'password_hash': pw_hash,
        'role': role,
    })

    # write audit record: self-registration -> actor is the new user
    try:
        new_row = controller.get_by_id('auth_users', user_id)
        log_audit(user_id, 'auth_users', user_id, 'INSERT', None, new_row)
    except Exception:
        try:
            _log("[auth][audit] failed to write audit for new user %s" % user_id)
            traceback.print_exc()
        except Exception:
            pass

    return jsonify({'id': user_id}), 201


@bp.route('/login', methods=['POST'])
def login():
    payload = request.get_json() or {}
    email = payload.get('email')
    password = payload.get('password')

    if not email or not password:
        return jsonify({'error': 'email and password are required'}), 400

    user = controller.find_one_by('auth_users', 'email', email)
    if not user or not _verify_password(user['password_hash'], password):
        return jsonify({'error': 'invalid credentials'}), 401

    identity = user['auth_id']
    additional_claims = {'role': user.get('role')}

    # Flask-JWT-Extended / PyJWT expect the subject (sub) to be a string.
    identity_str = str(identity)
    access_token = create_access_token(identity=identity_str, additional_claims=additional_claims)
    refresh_token = create_refresh_token(identity=identity_str)

    # store the refresh token's jti in DB (do not store the raw token)
    decoded = decode_token(refresh_token)
    jti = decoded.get('jti')
    refresh_expires = None
    try:
        refresh_expires = bp.root_path and None
    except Exception:
        refresh_expires = None
    expires_at = (datetime.utcnow() + timedelta(days=14))
    expires_at_str = expires_at.strftime('%Y-%m-%d %H:%M:%S')
    try:
        store_jti(identity, jti, expires_at_str)
    except Exception:
        try:
            _log(f"[auth] failed to store jti for user {identity}")
        except Exception:
            pass

    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'token_type': 'bearer',
    })


@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    new_access = create_access_token(identity=identity)
    return jsonify({'access_token': new_access})


@bp.route('/logout', methods=['POST'])
@jwt_required(refresh=True)
def logout():
    jwt_payload = get_jwt()
    jti = jwt_payload.get('jti')
    if not jti:
        return jsonify({'error': 'invalid token'}), 400
    affected = revoke_jti(jti)
    if affected:
        return jsonify({'revoked': True})
    return jsonify({'revoked': False}), 400
