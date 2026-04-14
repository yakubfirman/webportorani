# Deploy Frontend (Next.js) — quick guide

Recommended: deploy to Vercel for simplest Next.js support (server-side + static).

1) Push repo to GitHub (if not already):

```bash
cd frontend
git init
git add .
git commit -m "frontend"
git remote add origin https://github.com/<you>/frontend.git
git push -u origin main
```

2) Vercel (recommended)
- Go to https://vercel.com and sign in with GitHub.
- Import Project → select your `frontend` repository.
- In Vercel Project Settings → Environment Variables, add:
 - In Vercel Project Settings → Environment Variables, add:
  - `NEXT_PUBLIC_API_URL` = `https://<yourusername>.pythonanywhere.com` (or your backend production URL)
    - Important: do NOT include a trailing slash. The frontend normalizes the value automatically to avoid double-slash redirects.
- Deploy. Vercel will build using `npm run build`.

3) Alternative: GitHub Actions + artifact
- A workflow `/.github/workflows/frontend-build.yml` is included to build and archive the Next.js output on push.
- You can extend it to deploy to a host of your choice (Netlify, custom server, etc.).

4) Local dev
- Create `.env.local` from `.env.local.example` and set `NEXT_PUBLIC_API_URL` to your local backend (e.g. `http://localhost:5000`).
