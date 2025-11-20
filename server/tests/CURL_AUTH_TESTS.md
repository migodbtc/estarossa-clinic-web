# Auth curl tests (Windows cmd.exe)

Prerequisites

- Start the server from the `server` folder:

```cmd
cd \Users\migue\Documents\BSIT_unsaved_projects\untitled-clinic-system\server
python main.py
```

- These commands assume the server is reachable at `http://127.0.0.1:5822`.
- Replace placeholder values (email, passwords, ids) as needed.

Notes

- The examples show how to obtain `access_token` and `refresh_token` and how to use them with `Authorization: Bearer <TOKEN>` headers.
- For simple JSON extraction we use a tiny Python one-liner to pick fields from the response.

1. Register (create a user)

```cmd
curl -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"adminpw\",\"role\":\"admin\"}" http://127.0.0.1:5822/auth/register
```

2. Login (get access + refresh tokens)

```cmd
curl -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"adminpw\"}" http://127.0.0.1:5822/auth/login > login.json

:: extract tokens (Python)
python - <<'PY'
import json
o = json.load(open('login.json'))
print('ACCESS_TOKEN:', o.get('access_token'))
print('REFRESH_TOKEN:', o.get('refresh_token'))
PY
```

3. Refresh access token (use refresh token as Bearer)

Replace <REFRESH_TOKEN> with the value printed above.

```cmd
curl -H "Authorization: Bearer <REFRESH_TOKEN>" -X POST http://127.0.0.1:5822/auth/refresh
```

4. Logout / revoke refresh token

```cmd
curl -H "Authorization: Bearer <REFRESH_TOKEN>" -X POST http://127.0.0.1:5822/auth/logout
```

5. Simple resource checks (examples)

- List users (public or protected depending on your app):

```cmd
curl http://127.0.0.1:5822/api/auth_users
```

- Get one user by id:

```cmd
curl http://127.0.0.1:5822/api/auth_users/1
```

- Create a user (requires an access token if endpoint is protected):

```cmd
curl -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"email\":\"newuser@example.com\",\"password_hash\":\"ignored_on_create\",\"role\":\"patient\"}" http://127.0.0.1:5822/api/auth_users
```

- Update a user (example: change role or name). Controller expects primary key present when calling update via `/api/<table>/<id>` handlers; the route already inserts PK into payload.

```cmd
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"role\":\"doctor\"}" http://127.0.0.1:5822/api/auth_users/1
```

- Delete a user (admin-only in your policy):

```cmd
curl -X DELETE -H "Authorization: Bearer <ACCESS_TOKEN>" http://127.0.0.1:5822/api/auth_users/1
```

6. Appointments / Profiles / Medical Records (examples)

- Create a profile (example):

```cmd
curl -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"auth_id\":1,\"full_name\":\"Test User\"}" http://127.0.0.1:5822/api/user_profiles
```

- Create an appointment:

```cmd
curl -H "Content-Type: application/json" -H "Authorization: Bearer <ACCESS_TOKEN>" -d "{\"patient_id\":1,\"staff_id\":2,\"date_time\":\"2025-11-21 10:00:00\",\"visit_reason\":\"Checkup\"}" http://127.0.0.1:5822/api/appointments
```

7. Troubleshooting

- If you get 401/403 when calling protected endpoints, make sure you used the correct `Authorization: Bearer <ACCESS_TOKEN>` header.
- If `/auth/login` raises a server error relating to password hashing, ensure the `auth_users.password_hash` is a valid werkzeug hash (create via `/auth/register` or reset using the interactive controller from Python).
- If a route returns 404, ensure the `server/tables` route modules are imported in `main.py` (they are imported by default in this repo).

-- End of file
