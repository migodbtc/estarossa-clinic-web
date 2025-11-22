import db.controller as db_controller
import utils as utils


def test_register_success(client, monkeypatch):
    # simulate user does not exist and create returns id
    monkeypatch.setattr(db_controller.controller, 'find_one_by', lambda table, col, val: None)
    monkeypatch.setattr(db_controller.controller, 'create', lambda table, data: 99)
    monkeypatch.setattr(db_controller.controller, 'get_by_id', lambda table, id: {'auth_id': 99, 'email': 'r@example.com'})

    resp = client.post('/auth/register', json={'email': 'r@example.com', 'password': 'p'})
    assert resp.status_code == 201
    assert resp.get_json().get('id') == 99


def test_login_success(client, monkeypatch):
    # simulate user found and password verification success
    monkeypatch.setattr(db_controller.controller, 'find_one_by', lambda table, col, val: {'auth_id': 1, 'password_hash': 'hash', 'role': 'patient'})
    monkeypatch.setattr(utils, '_verify_password', lambda h, p: True)

    resp = client.post('/auth/login', json={'email': 'x@example.com', 'password': 'p'})
    assert resp.status_code == 200
    j = resp.get_json()
    assert 'access_token' in j and 'refresh_token' in j


def test_register_invalid_payload_missing_fields(client):
    # missing email -> should be client error
    resp = client.post('/auth/register', json={'password': 'p'})
    assert 400 <= resp.status_code < 500


def test_login_invalid_payload_missing_password(client):
    # missing password -> should be client error
    resp = client.post('/auth/login', json={'email': 'x@example.com'})
    assert 400 <= resp.status_code < 500
