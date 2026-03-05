# MovieLensAI

AI-powered movie insights web app — Next.js frontend + Express + TypeScript backend with Prisma/Postgres, Redis and JWT auth.

## Contents
- Frontend: [frontend](frontend) — Next.js (app router), Tailwind, Redux
  - Entry/UI: [frontend/app/Landing.jsx](frontend/app/Landing.jsx), [frontend/app/login/page.jsx](frontend/app/login/page.jsx)
  - Config/assets: [frontend/public/assets.js](frontend/public/assets.js), [frontend/components.json](frontend/components.json), [frontend/package.json](frontend/package.json), [frontend/README.md](frontend/README.md)
- Backend: [backend](backend) — Express (TS), Prisma, Redis, JWT
  - Entry: [backend/src/index.ts](backend/src/index.ts)
  - Prisma schema: [backend/prisma/schema.prisma](backend/prisma/schema.prisma)
  - Config: [backend/package.json](backend/package.json), [backend/tsconfig.json](backend/tsconfig.json), [backend/.gitignore](backend/.gitignore)

## Quick overview
- Frontend fetches data and user session from the backend. Backend exposes REST endpoints and handles auth, user data, credits and Prisma DB operations.
- Frontend uses `backendUrl` at [frontend/public/assets.js](frontend/public/assets.js) to point to the API.

## Local setup (dev)
1. Clone repo.
2. Backend
   - cd backend
   - copy `.env` (see [backend/.gitignore](backend/.gitignore) — env excluded)
   - npm install
   - npm run build
   - npm run dev (runs built server: `dist/index.js`) — entry: [backend/src/index.ts](backend/src/index.ts)
3. Frontend
   - cd frontend
   - npm install
   - npm run dev
   - Open http://localhost:3000

## Environment
- Backend needs DB/Redis credentials and JWT secret in `.env` (not committed). Prisma config lives at [backend/prisma/schema.prisma](backend/prisma/schema.prisma).
- Frontend backend URL is set at [frontend/public/assets.js](frontend/public/assets.js).

## Developer notes
- UI: Landing/search, AI summaries and credits display in [frontend/app/Landing.jsx](frontend/app/Landing.jsx).
- Auth UI + login flow: [frontend/app/login/page.jsx](frontend/app/login/page.jsx).
- Backend API and routes are initialized in [backend/src/index.ts](backend/src/index.ts).
- Package scripts: see [backend/package.json](backend/package.json) and [frontend/package.json](frontend/package.json).

## Tests / CI
- No test suite detected — add unit/integration tests and CI as needed.

## Deploy
- Frontend: standard Next.js deployment (Vercel recommended).
- Backend: build with `npm run build` then run `npm run dev` (or adapt to your host). Ensure Postgres and Redis env vars are configured.

## Contributing
- Keep secrets out of commits.
- Update Prisma schema and run migrations when DB models change.
- Add README updates for any architectural or API changes.
