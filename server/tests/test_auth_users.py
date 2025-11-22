import json

import db.controller as db_controller


def test_list_auth_users(client, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'list', lambda table, page=1, per_page=20: {'items': [], 'page': 1, 'per_page': per_page, 'total': 0, 'pages': 0})
    resp = client.get('/api/auth_users')
    assert resp.status_code == 200
    assert resp.get_json().get('items') == []


def test_get_auth_user_not_found(client, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'get_by_id', lambda table, id: None)
    resp = client.get('/api/auth_users/999')
    assert resp.status_code == 404


def test_create_auth_user_admin_allowed(client, auth_headers, monkeypatch):
    # simulate current_user is admin and create returns new id
    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'auth_users' and id == 123:
            return {'auth_id': 123, 'role': 'patient', 'email': 'new@example.com'}
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, 'create', lambda table, data: 123)

    resp = client.post('/api/auth_users', json={'email': 'new@example.com'}, headers=auth_headers)
    assert resp.status_code == 201
    assert resp.get_json().get('id') == 123


def test_update_auth_user_admin_allowed(client, auth_headers, monkeypatch):
    item_id = 123
    old_row = {'auth_id': item_id, 'email': 'old@example.com'}
    new_row = {'auth_id': item_id, 'email': 'new@example.com'}
    calls = {'n': 0}

    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'auth_users' and id == item_id:
            if calls['n'] == 0:
                calls['n'] += 1
                return old_row
            return new_row
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, '_get_primary_key', lambda table: 'auth_id')
    monkeypatch.setattr(db_controller.controller, 'update', lambda table, data: 1)

    resp = client.put(f'/api/auth_users/{item_id}', json={'email': 'new@example.com'}, headers=auth_headers)
    assert resp.status_code == 200
    assert resp.get_json().get('affected') == 1


def test_delete_auth_user_admin_allowed(client, auth_headers, monkeypatch):
    item_id = 124
    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'auth_users' and id == item_id:
            return {'auth_id': item_id, 'email': 'to-delete@example.com'}
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, 'delete', lambda table, id: 1)

    resp = client.delete(f'/api/auth_users/{item_id}', headers=auth_headers)
    assert resp.status_code == 200
    assert resp.get_json().get('affected') == 1
