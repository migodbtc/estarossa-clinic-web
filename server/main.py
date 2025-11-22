
# packages
from flask import Response, jsonify, redirect, render_template, url_for, request, g
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import app
import os
from datetime import timedelta
from pprint import pprint
from db.controller import controller
import traceback
import time

# modules
import middleware.auth as auth
from resource.auth_users import bp as auth_users_bp
from resource.user_profiles import bp as user_profiles_bp
from resource.appointments import bp as appointments_bp
from resource.medical_records import bp as medical_records_bp
from resource.audit_log import bp as audit_log_bp
from resource.auth import bp as auth_bp


# blueprint registration
for bp in (auth_bp, auth_users_bp, user_profiles_bp, appointments_bp, medical_records_bp, audit_log_bp):
    try:
        app.register_blueprint(bp)
    except Exception:
        print(f"[main] failed to register blueprint: {getattr(bp, 'name', repr(bp))}")
        traceback.print_exc()


@app.route('/', methods=['GET'])
def index():
    return {'status': 'ok', 'message': 'Untitled Clinic System API'}, 200

### === BOILERPLATE RUN ===
if __name__ == "__main__":
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Starting server on 0.0.0.0:5822 (debug=False)")
    try:
        app.run(debug=False, host="0.0.0.0", port=5822)
    finally:
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Server stopped")
    