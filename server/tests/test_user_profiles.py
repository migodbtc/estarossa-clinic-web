import db.controller as db_controller


def test_list_user_profiles(client, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'list', lambda table, page=1, per_page=20: {'items': [], 'page': 1, 'per_page': per_page, 'total': 0, 'pages': 0})
    resp = client.get('/api/user_profiles')
    assert resp.status_code == 200
    assert resp.get_json().get('items') == []


def test_get_user_profile_not_found(client, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'get_by_id', lambda table, id: None)
    resp = client.get('/api/user_profiles/42')
    assert resp.status_code == 404


def test_create_user_profile_admin_allowed(client, auth_headers, monkeypatch):
    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'user_profiles' and id == 77:
            return {'user_profile_id': 77, 'name': 'new'}
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, 'create', lambda table, data: 77)

    resp = client.post('/api/user_profiles', json={'name': 'new'}, headers=auth_headers)
    assert resp.status_code == 201
    assert resp.get_json().get('id') == 77


def test_update_user_profile_admin_allowed(client, auth_headers, monkeypatch):
    item_id = 33
    old_row = {'user_profile_id': item_id, 'name': 'old'}
    new_row = {'user_profile_id': item_id, 'name': 'new'}
    calls = {'n': 0}

    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'user_profiles' and id == item_id:
            if calls['n'] == 0:
                calls['n'] += 1
                return old_row
            return new_row
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, '_get_primary_key', lambda table: 'user_profile_id')
    monkeypatch.setattr(db_controller.controller, 'update', lambda table, data: 1)

    resp = client.put(f'/api/user_profiles/{item_id}', json={'name': 'new'}, headers=auth_headers)
    assert resp.status_code == 200
    assert resp.get_json().get('affected') == 1


def test_delete_user_profile_admin_allowed(client, auth_headers, monkeypatch):
    item_id = 44
    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'user_profiles' and id == item_id:
            return {'user_profile_id': item_id, 'name': 'to-delete'}
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, 'delete', lambda table, id: 1)

    resp = client.delete(f'/api/user_profiles/{item_id}', headers=auth_headers)
    assert resp.status_code == 200
    assert resp.get_json().get('affected') == 1


def test_create_user_profile_invalid_payload(client, auth_headers, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'get_by_id', lambda table, id: {'auth_id': 1, 'role': 'admin'})
    resp = client.post('/api/user_profiles', json={'name': ''}, headers=auth_headers)
    # empty name likely invalid
    assert 400 <= resp.status_code < 500


def test_get_user_profile_invalid_param(client, monkeypatch):
    # non-integer id param
    resp = client.get('/api/user_profiles/not-an-int')
    assert 400 <= resp.status_code < 500 or resp.status_code == 404
