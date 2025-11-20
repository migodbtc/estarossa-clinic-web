# Project-specific Copilot instructions for untitled-clinic-system

Created: 2025-11-21

Purpose

- Help AI coding agents be productive in this repository by documenting architecture, runtime workflows, and code patterns that are specific to this project.

Big-picture architecture

- **Backend (API):** `server/` — a small Flask (v3.x) application. The thin wrapper is `server/app.py` which creates `app` and `mysql` instances. The server is started via `server/main.py` which runs `app.run(host="0.0.0.0", port=5822)`.
- **Controller layer:** `server/controller.py` implements a generic SQL access layer (create/list/get/update/delete) using `PyMySQL` and `Flask-MySQL`. It enforces identifier safety via `_safe_identifier(name)` (letters, numbers, underscore only). Use this controller for direct table operations — it is the canonical DB access pattern in this project.
- **Auth & tokens:** `server/auth.py` uses `flask_jwt_extended`. Refresh tokens are stored by their `jti` in the `refresh_tokens` table (only the jti, not the raw token). Token revocation checks consult that table via `check_if_token_revoked`.
- **Audit:** `server/audit.py` writes JSON-serialized `old_values` / `new_values` into the `audit_log` table via the `controller.create` helper. Audits are best-effort and must not break the main flow.
- **Routes by table:** Per-table REST endpoints live under `server/tables/*.py` and follow a consistent pattern: `TABLE = '<table_name>'`, then `@app.route('/api/<table_name>')` for list/create and `@app.route('/api/<table_name>/<int:item_id>')` for get/update/delete. See `server/tables/auth_users.py` for the canonical example.
- **Frontend:** `web/` is a Next.js app (Next 16, React 19). It runs independently via `npm run dev` and is not served directly by Flask. `main.py` redirects root to a `ui_index` endpoint but there is no server-side `ui_index` route defined — the frontend is expected to be run separately during development.

Critical developer workflows

- Create a Python virtualenv, install backend dependencies, and run server (Windows cmd.exe):

  ```cmd
  python -m venv .venv
  .venv\Scripts\activate
  pip install -r server\requirements.txt
  set SECRET_KEY=replace-me
  set JWT_SECRET_KEY=replace-me
  python server\main.py
  ```

- Database: default DB settings live in `server/config.py`:

  - Host: `localhost`, port `3306`, DB `untitledclinicdb`, user `root`, password "".
  - Use the SQL in `db/migrations/create_initial_schema.sql` to bootstrap the schema and `db/mock/` for sample data.

- Frontend dev (from repository root):

  ```cmd
  cd web
  npm install
  npm run dev
  ```

- API test examples: there are curl examples in `server/tests/CURL_AUTH_TESTS.md` and `server/tests/CURL_TABLES_TESTS.md`. Use them as canonical request/response shapes and authentication flows.

Project-specific conventions & patterns (do not change without care)

- Use `controller` for all DB interactions. It centralizes SQL, primary-key discovery, and pagination. Avoid creating separate DB connection logic unless adding a new capability.
- Identifier safety: `controller._safe_identifier` only accepts A-Za-z0-9\_. Any controller call that builds SQL uses this check — adding columns or tables programmatically must obey this rule.
- Audit logging: call `log_audit(actor, table, id, 'INSERT'|'UPDATE'|'DELETE', old_values, new_values)` after successful data changes. Audit failures are logged but should not cause request failures.
- Auth roles & gating: Use `@jwt_required()` for protected endpoints and `auth.roles_required(...)` where role-level enforcement is needed. For table-level fine-grained rules, call `auth.authorize_table_action(table, action, data, item_id, current_user)` (see `server/tables/*.py` usage).
- Refresh tokens: store only `jti` (not raw token) via `auth.store_jti` and check revocation with `@jwt.token_in_blocklist_loader` implemented in `server/auth.py`.
- Password hashing hooks: `server/config.py` exposes `PASSWORD_HASHER` and `PASSWORD_VERIFY` config points. Tests or feature branches may set these to inject deterministic hashes/verifiers.

Where to look for examples

- Add/modify API endpoints: `server/tables/auth_users.py` (full create/list/get/update/delete pattern with auditing and auth checks).
- Generic DB operations: `server/controller.py` (primary-key caching, cursor mgmt, SQL construction).
- Auth flows and token lifecycle: `server/auth.py` (login, refresh, logout, token revocation checks).
- Audit pattern: `server/audit.py` (how values are serialized and stored in `audit_log`).

Common pitfalls & gotchas for automation

- The app expects a live MySQL server and database matching `server/config.py`. CI or local agents should run a disposable MySQL instance or use a test DB to avoid destructive changes to production data.
- `controller` builds SQL with backticks and placeholders — but it relies on `_safe_identifier`. Do not bypass identifier validation.
- `main.py` runs `app.run(..., debug=False)` on port `5822`. Tests or local runs should respect this default or change config explicitly.

Editing guidelines for AI agents

- When adding a new table endpoint, copy the pattern from `server/tables/auth_users.py`:
  - define `TABLE = '<table>'`
  - implement `create`, `list`, `get`, `update`, `delete` routes
  - apply `@jwt_required()` where needed and call `auth.authorize_table_action` for permission checks
  - call `log_audit` after DB mutations
- Prefer reusing `controller` APIs rather than raw connections.
- Write regression curl examples into `server/tests/*.md` alongside new endpoints.

Note about timing and revisions

- These instructions were created on 2025-11-21. Future edits made after this date may not be reflected here; please update this file when you change core architecture or runtime commands.

Questions / Feedback

- If any section is unclear or you want me to add examples for a specific table or a Windows CI script to spin up MySQL, tell me which target and I'll extend this file.
