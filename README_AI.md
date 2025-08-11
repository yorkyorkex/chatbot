# AI Chatbot (Next.js + Vercel AI SDK)

A polished, streaming AI chatbot built with Next.js App Router, Tailwind CSS, and the Vercel AI SDK, ready for local dev and Vercel deployment.

## Quickstart

1. Copy the example env file and set your key:

```
cp .env.local.example .env.local
# set OPENAI_API_KEY=...
# optional for UI banner: NEXT_PUBLIC_OPENAI_CONFIGURED=1
```

2. Run locally:

```
npm run dev
```

3. Open http://localhost:3000

## Deploy to Vercel

- Push this repo to GitHub.
- Import the project in Vercel.
- Add Environment Variable: `OPENAI_API_KEY`.
- Deploy.

## Notes
- API route: `src/app/api/chat/route.ts` using `ai` streaming.
- Client: `src/app/page.tsx` with a minimal, responsive chat UI.
- Runtime: edge functions for fast, low-latency streaming.

## Customize
- Change model in `route.ts` (e.g., `gpt-4o`, `gpt-4o-mini`).
- Add system prompt or memory as needed.
