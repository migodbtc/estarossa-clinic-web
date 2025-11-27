---
applyTo: "**/*"
---

# Project-specific Copilot instructions for untitled-clinic-system

Created: 2025-11-27

Purpose

- Provide concise, actionable guidance so AI coding agents can be productive in this repo immediately.

Quick architecture (big picture)

- **Backend (API):** `server/` — Flask app. `server/app.py` creates `app` and DB objects; `server/main.py` runs the server on `0.0.0.0:5822`.
- **DB access layer:** `server/db/controller.py` is the canonical SQL helper for CRUD, pagination and primary-key discovery. It must be used for table operations.
- **Resources:** Routes live in `server/resource/*.py` (e.g., `server/resource/auth_users.py`, `appointments.py`, `medical_records.py`). Each resource follows a create/list/get/update/delete pattern.
- **Auth & middleware:** `server/middleware/auth.py` implements JWT handling with `flask_jwt_extended`. Refresh tokens store only the `jti` in DB; revocation checks use that `jti`.
- **Audit:** `server/services/audit.py` is used to write JSON `old_values`/`new_values` into `audit_log`. Audit writes are best-effort and must not break request flows.
- **Frontend (UI):** `web/` is a Next.js app (dev via `npm run dev`). The frontend runs independently from Flask during development.

Developer workflows (Windows cmd.exe)

- Backend quick start (from repo root):

  ```cmd
  python -m venv .venv
  .venv\Scripts\activate
  pip install -r server\requirements.txt
  set SECRET_KEY=replace-me
  set JWT_SECRET_KEY=replace-me
  python server\main.py
  ```

- Frontend dev (from repo root):

  ```cmd
  cd web
  npm install
  npm run dev
  ```

- Database: default connection in `server/config.py` (host `localhost`, port `3306`, DB `untitledclinicdb`, user `root`). Use `db/versions/create_initial_schema.sql` to bootstrap; `db/mock/` contains sample data.

- Tests: run Python tests from repo root:

  ```cmd
  .venv\Scripts\activate
  python -m pytest server\tests
  ```

Key repo conventions (must follow)

- **Always use `controller` for DB work.** It centralizes SQL, safely quotes identifiers, and applies pagination. Do not open ad-hoc MySQL connections for table CRUD.
- **Identifier safety:** `controller._safe_identifier()` only allows [A-Za-z0-9_]. Any dynamic table/column names must pass this check.
- **Resource pattern:** Each `server/resource/<name>.py` declares a `TABLE = '<table_name>'` and exposes REST routes for list/create and item get/update/delete. Copy `server/resource/auth_users.py` as a template for new resources.
- **Auth & roles:** Use `@jwt_required()` for protected routes and `auth.authorize_table_action(table, action, data, item_id, current_user)` for per-table permission checks.
- **Refresh tokens:** Only store the token `jti` using `auth.store_jti(...)`; revocation is handled via the blocklist loader in `server/middleware/auth.py`.
- **Audit:** After successful DB mutations call the audit helper (`log_audit` / service) to record `old_values` and `new_values`. Audit failures must not raise errors to clients.

Files to inspect for examples

- CRUD pattern: `server/resource/auth_users.py`
- DB helper: `server/db/controller.py`
- Auth flows and token lifecycle: `server/middleware/auth.py`
- Audit implementation: `server/services/audit.py`
- DB schema and samples: `db/versions/create_initial_schema.sql`, `db/mock/`

Automation & CI notes

- The app expects a MySQL instance matching `server/config.py`. For CI, provide a disposable MySQL instance or a test DB; do not run changes against production data.
- Avoid bypassing `controller._safe_identifier` when generating SQL; automation that generates SQL must validate identifiers.

Editing guidelines for AI agents (practical rules)

- To add a resource endpoint: copy `server/resource/auth_users.py` then:
  - set `TABLE = '<table>'` at top
  - implement `create`, `list`, `get`, `update`, `delete` routes
  - apply `@jwt_required()` where needed and call `auth.authorize_table_action(...)` for permission checks
  - call the audit helper after successful mutations
- Prefer `controller` functions over writing raw SQL or new DB connection code.
- Add regression curl examples or short integration examples under `server/tests/` when adding endpoints.

If something is unclear

- Tell me which resource or workflow you want more examples for (e.g., token lifecycle, adding a new table resource, or Windows CI for MySQL), and I will expand this file with code snippets and curl tests.
