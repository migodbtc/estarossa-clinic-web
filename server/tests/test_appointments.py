import db.controller as db_controller


def test_list_appointments(client, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'list', lambda table, page=1, per_page=20: {'items': [], 'page': 1, 'per_page': per_page, 'total': 0, 'pages': 0})
    resp = client.get('/api/appointments')
    assert resp.status_code == 200
    assert resp.get_json().get('items') == []


def test_get_appointment_not_found(client, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'get_by_id', lambda table, id: None)
    resp = client.get('/api/appointments/7')
    assert resp.status_code == 404


def test_create_appointment_admin_allowed(client, auth_headers, monkeypatch):
    # simulate current_user is admin and create returns new id
    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'appointments' and id == 10:
            return {'appointment_id': 10, 'patient': 'x'}
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, 'create', lambda table, data: 10)

    resp = client.post('/api/appointments', json={'patient': 'x'}, headers=auth_headers)
    assert resp.status_code == 201
    assert resp.get_json().get('id') == 10


def test_update_appointment_admin_allowed(client, auth_headers, monkeypatch):
    item_id = 5
    old_row = {'appointment_id': item_id, 'patient': 'old'}
    new_row = {'appointment_id': item_id, 'patient': 'new'}
    calls = {'n': 0}

    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'appointments' and id == item_id:
            if calls['n'] == 0:
                calls['n'] += 1
                return old_row
            return new_row
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, '_get_primary_key', lambda table: 'appointment_id')
    monkeypatch.setattr(db_controller.controller, 'update', lambda table, data: 1)

    resp = client.put(f'/api/appointments/{item_id}', json={'patient': 'new'}, headers=auth_headers)
    assert resp.status_code == 200
    assert resp.get_json().get('affected') == 1


def test_delete_appointment_admin_allowed(client, auth_headers, monkeypatch):
    item_id = 6
    def fake_get_by_id(table, id):
        if table == 'auth_users' and id == 1:
            return {'auth_id': 1, 'role': 'admin'}
        if table == 'appointments' and id == item_id:
            return {'appointment_id': item_id, 'patient': 'to-delete'}
        return None

    monkeypatch.setattr(db_controller.controller, 'get_by_id', fake_get_by_id)
    monkeypatch.setattr(db_controller.controller, 'delete', lambda table, id: 1)

    resp = client.delete(f'/api/appointments/{item_id}', headers=auth_headers)
    assert resp.status_code == 200
    assert resp.get_json().get('affected') == 1
