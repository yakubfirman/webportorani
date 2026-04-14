# Frontend deploy notes

Before pushing the frontend to GitHub / Vercel, set the API base URL so the site talks to your PythonAnywhere backend.

- In your local environment or CI, set `NEXT_PUBLIC_API_URL` to `https://<yourusername>.pythonanywhere.com` (replace with your PythonAnywhere domain).
- Example (Linux/macOS):

  export NEXT_PUBLIC_API_URL="https://<yourusername>.pythonanywhere.com"

- If you deploy to Vercel, configure the Environment Variable `NEXT_PUBLIC_API_URL` in the project settings.

Push to GitHub and let Vercel build with the environment variable set.
