/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Minimal OpenRouter proxy using Chat Completions API.
// Returns plain text so the client can render without JSON parsing.
export async function POST(req: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY) {
    return new Response(
      'OPENROUTER_API_KEY is missing. Create one at https://openrouter.ai/keys and set it in .env.local.',
      { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
  }

  let body: unknown = {};
  try {
    body = await req.json();
  } catch {}
  const b = (body ?? {}) as { messages?: any };
  const messages = Array.isArray(b.messages) ? (b.messages as any[]) : [];

  const model = process.env.OPENROUTER_MODEL || 'deepseek/deepseek-r1-0528:free';

  try {
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost',
        'X-Title': process.env.OPENROUTER_SITE_NAME || 'Chatbot',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant. Always respond in clear English, even if the user uses another language.',
          },
          ...messages,
        ],
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(`OpenRouter error ${resp.status}: ${text}`, {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const data = (await resp.json()) as any;
    const content = data?.choices?.[0]?.message?.content ?? '';
    return new Response(String(content), {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'unknown error';
    return new Response(`AI error: ${msg}`, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
