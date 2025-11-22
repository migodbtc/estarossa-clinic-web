import db.controller as db_controller


def test_list_audit_log_forbidden_without_role(client, auth_headers, monkeypatch):
    # simulate non-privileged user
    monkeypatch.setattr(db_controller.controller, 'get_by_id', lambda table, id: {'auth_id': 1, 'role': 'patient'})
    resp = client.get('/api/audit_log', headers=auth_headers)
    # should be forbidden for non-privileged role
    assert resp.status_code in (403, 400)


def test_list_audit_log_allowed_for_admin(client, auth_headers, monkeypatch):
    monkeypatch.setattr(db_controller.controller, 'get_by_id', lambda table, id: {'auth_id': 1, 'role': 'admin'})
    monkeypatch.setattr(db_controller.controller, 'list', lambda table, page=1, per_page=20: {'items': [], 'page': 1, 'per_page': per_page, 'total': 0, 'pages': 0})
    resp = client.get('/api/audit_log', headers=auth_headers)
    assert resp.status_code == 200


def test_list_audit_log_invalid_params(client, auth_headers, monkeypatch):
    # admin but invalid query params (negative per_page)
    monkeypatch.setattr(db_controller.controller, 'get_by_id', lambda table, id: {'auth_id': 1, 'role': 'admin'})
    resp = client.get('/api/audit_log?per_page=-1', headers=auth_headers)
    assert 400 <= resp.status_code < 500
