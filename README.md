# G.M POS backend

This server provides the authentication and subscription API used by the browser app in the parent directory.

## Setup

Use Node.js 20 or 22 LTS (the native SQLite dependency does not support every newer Node release), then run:

```powershell
pnpm install
Copy-Item .env.example .env
# ضع كلمات مرور محلية قوية في SEED_SUPER_ADMIN_PASSWORD وSEED_MANAGER_PASSWORD داخل .env
pnpm migrate
pnpm seed
pnpm start
```

Set `JWT_SECRET` in `.env` to a unique random value of at least 32 characters before deployment. Never use the example value in production.

Never put live passwords in source code, `.env.example`, logs, or commits. The seed script reads its two local passwords only from the ignored `.env` file, requires at least 12 characters for each, and stores bcrypt hashes only.

The API listens on port `3001` by default. The browser app automatically targets `http://localhost:3001/api` when it is served from another local port. If it is served by the API host itself, it uses `/api`.
