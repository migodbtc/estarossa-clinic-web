# Table endpoints curl tests (Windows cmd.exe)

Prerequisites

- Start the server from the `server` folder:

```cmd
cd \Users\migue\Documents\BSIT_unsaved_projects\untitled-clinic-system\server
python main.py
```

- These commands assume the server is reachable at `http://127.0.0.1:5822`.
- Replace placeholder values (email, passwords, ids, tokens, and sample fields) as needed.
- When a request requires authentication, use `Authorization: Bearer <ACCESS_TOKEN>` header.

Notes

- For convenience the `AUTH` flow is in `AUTH_CURL_TESTS.md` (login/register/refresh/logout). Use that file to obtain `access_token` and `refresh_token`.
- The commands below show typical CRUD operations for each table module under `server/tables`.
- `audit_log` is read-protected (no create/update/delete routes available in code).

Base URL

- `http://127.0.0.1:5822`

Token extraction (example)

```cmd
:: login and save response
curl -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"adminpw\"}" http://127.0.0.1:5822/auth/login > login.json

:: extract tokens (Python)
python - <<'PY'
import json
o = json.load(open('login.json'))
print('ACCESS_TOKEN:', o.get('access_token'))
print('REFRESH_TOKEN:', o.get('refresh_token'))
PY
```

--

The sections below are ordered by table name and provide a 1:1 mapping of table -> example curl checks.

---

## appointments

- List appointments (pagination):

```cmd
curl "http://127.0.0.1:5822/api/appointments?page=1&per_page=10"
```

- Get one appointment by id:

```cmd
curl http://127.0.0.1:5822/api/appointments/1
```

- Create an appointment (requires `access_token`):

```cmd
curl -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"patient_id\":1,\"staff_id\":2,\"date_time\":\"2025-11-21 10:00:00\",\"visit_reason\":\"Checkup\"}" http://127.0.0.1:5822/api/appointments
```

- Update an appointment (PUT /api/appointments/<id>):

```cmd
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"visit_reason\":\"Follow-up\"}" http://127.0.0.1:5822/api/appointments/1
```

- Delete an appointment (admin/authorized):

```cmd
curl -X DELETE -H "Authorization: Bearer <ACCESS_TOKEN>" http://127.0.0.1:5822/api/appointments/1
```

---

## audit_log

- List audit log entries (protected):

```cmd
curl -H "Authorization: Bearer <ACCESS_TOKEN>" "http://127.0.0.1:5822/api/audit_log?page=1&per_page=20"
```

- Get one audit log entry by id (protected):

```cmd
curl -H "Authorization: Bearer <ACCESS_TOKEN>" http://127.0.0.1:5822/api/audit_log/1
```

Note: there are no POST/PUT/DELETE routes for `audit_log` in `server/tables/audit_log.py`.

---

## auth_users

- List users (public depending on policy):

```cmd
curl "http://127.0.0.1:5822/api/auth_users?page=1&per_page=10"
```

- Get user by id:

```cmd
curl http://127.0.0.1:5822/api/auth_users/1
```

- Create auth user (requires `access_token` and proper role according to policy):

```cmd
curl -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"email\":\"newuser@example.com\",\"password_hash\":\"ignored_on_create\",\"role\":\"patient\"}" http://127.0.0.1:5822/api/auth_users
```

- Update auth user (PUT):

```cmd
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"role\":\"doctor\"}" http://127.0.0.1:5822/api/auth_users/1
```

- Delete auth user (admin-only in policy):

```cmd
curl -X DELETE -H "Authorization: Bearer <ACCESS_TOKEN>" http://127.0.0.1:5822/api/auth_users/1
```

---

## medical_records

- List medical records:

```cmd
curl "http://127.0.0.1:5822/api/medical_records?page=1&per_page=10"
```

- Get one medical record by id:

```cmd
curl http://127.0.0.1:5822/api/medical_records/1
```

- Create a medical record (requires `access_token`):

```cmd
curl -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"patient_id\":1,\"diagnosis\":\"Hypertension\",\"notes\":\"Initial visit notes\"}" http://127.0.0.1:5822/api/medical_records
```

- Update a medical record (PUT):

```cmd
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"notes\":\"Updated notes after visit\"}" http://127.0.0.1:5822/api/medical_records/1
```

- Delete a medical record (authorized roles):

```cmd
curl -X DELETE -H "Authorization: Bearer <ACCESS_TOKEN>" http://127.0.0.1:5822/api/medical_records/1
```

---

## user_profiles

- List user profiles:

```cmd
curl "http://127.0.0.1:5822/api/user_profiles?page=1&per_page=10"
```

- Get one profile by id:

```cmd
curl http://127.0.0.1:5822/api/user_profiles/1
```

- Create user profile (requires `access_token`):

```cmd
curl -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"auth_id\":1,\"full_name\":\"Test User\",\"phone\":\"+123456789\"}" http://127.0.0.1:5822/api/user_profiles
```

- Update a user profile (PUT):

```cmd
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"full_name\":\"Updated Name\"}" http://127.0.0.1:5822/api/user_profiles/1
```

- Delete a user profile (authorized):

```cmd
curl -X DELETE -H "Authorization: Bearer <ACCESS_TOKEN>" http://127.0.0.1:5822/api/user_profiles/1
```

---

Troubleshooting

- If you get 401/403 when calling protected endpoints, make sure you used the correct `Authorization: Bearer <ACCESS_TOKEN>` header and that the token belongs to a user with the required role.
- If JSON payloads fail, ensure the request body is valid JSON and double-quoted fields are escaped for `cmd.exe`.

-- End of file
