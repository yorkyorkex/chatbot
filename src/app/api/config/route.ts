export const runtime = 'edge';

export async function GET() {
  const data = {
    provider: 'openrouter',
    hasOpenRouterKey: Boolean(process.env.OPENROUTER_API_KEY),
    openrouterModel: process.env.OPENROUTER_MODEL || 'deepseek/deepseek-r1-0528:free',
    siteUrl: process.env.OPENROUTER_SITE_URL || 'http://localhost',
    siteName: process.env.OPENROUTER_SITE_NAME || 'Chatbot',
    echo: process.env.NEXT_PUBLIC_TEST_ECHO === '1',
  } as const;
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
