export const runtime = 'edge';

export async function POST(req: Request) {
  let body: unknown = {};
  try {
    body = await req.json();
  } catch {}
  const b = (body ?? {}) as { messages?: unknown };
  const messages = Array.isArray(b.messages) ? (b.messages as Array<{ role?: string; content?: unknown }>) : [];
  const lastUser = [...messages].reverse().find((m) => m?.role === 'user');
  const text: string = typeof lastUser?.content === 'string' ? lastUser.content : 'Hello!';

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const prefix = 'echo: ';
      controller.enqueue(encoder.encode(prefix));
      for (const ch of text) {
        controller.enqueue(encoder.encode(ch));
        await new Promise((r) => setTimeout(r, 25));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
