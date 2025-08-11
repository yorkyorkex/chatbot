## Nova Chatbot — Deploying to Vercel

This app is a Next.js (App Router) chatbot that proxies to OpenRouter. Follow these steps to deploy to Vercel and avoid common issues.

### 1) Prepare environment variables

Create these variables in Vercel Project Settings → Environment Variables (Production and Preview):

- OPENROUTER_API_KEY: your OpenRouter API key
- OPENROUTER_MODEL: deepseek/deepseek-r1-0528:free (or any OpenRouter model you prefer)
- OPENROUTER_SITE_URL: your Vercel URL, for example https://your-app.vercel.app
- OPENROUTER_SITE_NAME: Nova Chat (or your app name)
- NEXT_PUBLIC_TEST_ECHO: 0

Note: OPENROUTER_SITE_URL helps satisfy OpenRouter’s allowed referer checks. If not set, the app will infer it from the request host.

### 2) Deploy

Option A: Import the GitHub repo into Vercel. Vercel will auto-detect Next.js.

Option B: Use the Vercel CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

### 3) Verify health and config

Once deployed, visit:

- /api/health → should return ok
- /api/config → should show provider: openrouter and the model

If /api/chat returns plain text with an error message, the OpenRouter key or model may be invalid, or the domain referer is not allowed.

### 4) Troubleshooting

- 404 DEPLOYMENT_NOT_FOUND: Ensure you’re opening the latest Vercel deployment URL (check your project’s Deployments tab). If using a stale URL, it will 404.
- 401/403 from OpenRouter: Confirm OPENROUTER_API_KEY is set and the site URL is allowed in your OpenRouter dashboard if required.
- Blank responses: Some free models rate-limit aggressively. Try again or switch model.

### Local development

```bash
npm install
npm run dev
```

Prod build locally:

```bash
npm run build
npm start
```
