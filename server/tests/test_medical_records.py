import db.controller as db_controller


def test_list_medical_records(client, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'list', lambda table, page=1, per_page=20: {'items': [], 'page': 1, 'per_page': per_page, 'total': 0, 'pages': 0})
    resp = client.get('/api/medical_records')
    assert resp.status_code == 200
    assert resp.get_json().get('items') == []


def test_get_medical_record_not_found(client, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'get_by_id', lambda table, id: None)
    resp = client.get('/api/medical_records/55')
    assert resp.status_code == 404


def test_create_medical_record_admin_allowed(client, auth_headers, monkeypatch):
    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'medical_records' and id == 200:
            return {'medical_record_id': 200, 'patient': 'x'}
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, 'create', lambda table, data: 200)

    resp = client.post('/api/medical_records', json={'patient': 'x'}, headers=auth_headers)
    assert resp.status_code == 201
    assert resp.get_json().get('id') == 200


def test_update_medical_record_admin_allowed(client, auth_headers, monkeypatch):
    item_id = 11
    old_row = {'medical_record_id': item_id, 'notes': 'old'}
    new_row = {'medical_record_id': item_id, 'notes': 'new'}
    calls = {'n': 0}

    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'medical_records' and id == item_id:
            if calls['n'] == 0:
                calls['n'] += 1
                return old_row
            return new_row
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, '_get_primary_key', lambda table: 'medical_record_id')
    monkeypatch.setattr(db_controller.controller, 'update', lambda table, data: 1)

    resp = client.put(f'/api/medical_records/{item_id}', json={'notes': 'new'}, headers=auth_headers)
    assert resp.status_code == 200
    assert resp.get_json().get('affected') == 1


def test_delete_medical_record_admin_allowed(client, auth_headers, monkeypatch):
    item_id = 12
    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'medical_records' and id == item_id:
            return {'medical_record_id': item_id, 'notes': 'to-delete'}
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, 'delete', lambda table, id: 1)

    resp = client.delete(f'/api/medical_records/{item_id}', headers=auth_headers)
    assert resp.status_code == 200
    assert resp.get_json().get('affected') == 1
