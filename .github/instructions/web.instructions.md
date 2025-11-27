---
applyTo: "web/**"
---

# Web (frontend) - AI agent instructions

Purpose: help AI coding agents be productive working inside the `web/` Next.js app.

**Big Picture**

- **Stack:** Next.js (App Router, Next 16) + React 19 + TypeScript + Tailwind.
- **Entrypoint:** `web/src/app` (app-directory routing). Pages and route layouts live under `src/app` and nested folders such as `(web)` and `(auth)`.
- **Why this layout:** The project uses the app router (server/client components) for layout and fonts; see `web/src/app/layout.tsx` for global layout and font loading.

**Dev / Build / Debug**

- **Start dev server:** from `web/` run `npm run dev` (starts Next dev on port 3000 by default).
- **Build / Start:** `npm run build` then `npm run start` for production mode.
- **Lint:** `npm run lint` (project uses `eslint`).
- **Environment:** The frontend talks to the backend via `NEXT_PUBLIC_API_BASE_URL`. Default in code falls back to `http://localhost:5822` (see `web/src/lib/api/client.ts`). Set `NEXT_PUBLIC_API_BASE_URL` in your environment when developing against the local Flask API.

**Key files & conventions**

- `web/package.json`: canonical scripts (`dev`, `build`, `start`, `lint`). Use these scripts rather than calling `next` directly.
- `web/src/app/layout.tsx`: global layout, global CSS import (`globals.css`) and font setup.
- `web/src/lib/api/client.ts`: single `ApiClient` instance (`apiClient`) used for all server calls. Use this client (or its methods) for HTTP interactions and call `apiClient.setAuthToken(token)` to add Authorization headers.
- `web/src/types/*`: shared API and DB shape types live here; reference these when adding or changing API call shapes.

**API integration patterns** (examples)

- Use the exported `apiClient` (from `web/src/lib/api/client.ts`) for requests, e.g. `apiClient.get('/api/user_profiles')`.
- Token handling: set `apiClient.setAuthToken(token)` when the user logs in; clear it on logout.
- Base URL is resolved from `process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5822'` — do not hardcode backend host in components.

**Routing & authentication**

- Auth pages live under `src/app/(web)/(auth)` (see `login`, `register`, `forgot` in repository structure). Protect client-only routes using middlewares or token checks in client components.
- Prefer server components for static/global content and client components only where interactivity is required. Follow the `app/` patterns already present.

**Styling & assets**

- Tailwind is installed (see `devDependencies` in `package.json`); global styles live in `web/src/app/globals.css`.
- Fonts are loaded via `next/font` in `layout.tsx`; prefer this approach for performance.

**Testing & QA notes**

- There are no frontend unit tests in the repository; if adding tests, follow the app-router structure and keep fast, isolated tests for components.

**When editing the frontend, remember**

- Keep API shapes in sync with `web/src/types/*` and the backend `server/` routes.
- Use `NEXT_PUBLIC_API_BASE_URL` for endpoint configuration — it is read by `apiClient`.
- Reuse `apiClient` instead of rolling ad-hoc `fetch` calls (centralized error shaping and auth headers).

If anything here is unclear or you want additional, file-specific examples (component wiring, sample auth flow, or a small deploy checklist), tell me which area to expand.
