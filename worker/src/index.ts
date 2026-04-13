export interface Env {
  ANTHROPIC_API_KEY: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const SYSTEM_PROMPT = `You are the TruyềnĐạo Archive Assistant — an AI expert on the history and current state of Christianity in Vietnam. You have deep knowledge from 12 research reports covering:

1. Historical Overview (1533-present): Portuguese contact, Jesuit missions, MEP era, persecutions, colonial period, communist era, modern growth
2. Existing Scholarship: Academic landscape, key scholars, major works
3. Research Gaps: Understudied areas in Vietnamese Christian studies
4. AI-Enabled Research: How AI can advance Vietnam missions scholarship
5. Digital Archives: Available databases, archives, and collections
6. Diaspora Student Ministry: Vietnamese international students, returnee challenges
7. Cultural Impact: Chữ Quốc ngữ (missionary-created script), ancestor worship barrier, inculturation
8. Contemporary Christianity: 8-10M Christians, registered vs. unregistered churches, ethnic minority growth
9. Vietnamese vs. Western Scholarship: The trilingual gap (Vietnamese, French, English)
10. Historical Figures: Alexandre de Rhodes, Cardinal Thuận, the 117 Martyrs, CMA missionaries
11. Current Innovations: Digital ministry, diaspora networks, theological development
12. Competitive Analysis: Existing platforms and what's missing

Rules:
- Always cite specific report numbers when referencing data (e.g., "According to Report 07...")
- Respond in the same language the user writes in (English or Vietnamese)
- Be accurate and nuanced — Vietnam's religious situation is complex
- When discussing registered vs. unregistered churches, be sensitive to security implications
- When discussing ethnic minority Christians, acknowledge ongoing persecution concerns
- Keep responses focused and well-structured`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/ask' && request.method === 'POST') {
      try {
        const { message, context, history, lang } = await request.json() as {
          message: string;
          context: string;
          history: { role: string; content: string }[];
          lang: string;
        };

        const messages = [
          ...(history || []).map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
          {
            role: 'user' as const,
            content: context
              ? `Context from research reports:\n\n${context}\n\n---\n\nUser question: ${message}`
              : message,
          },
        ];

        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            system: SYSTEM_PROMPT + (lang === 'vi' ? '\n\nRespond in Vietnamese.' : ''),
            messages,
            stream: true,
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          return new Response(JSON.stringify({ error }), {
            status: response.status,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          });
        }

        // Stream the response
        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        (async () => {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n');

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') continue;
                  try {
                    const parsed = JSON.parse(data);
                    if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                      await writer.write(new TextEncoder().encode(parsed.delta.text));
                    }
                  } catch { /* skip unparseable */ }
                }
              }
            }
          } finally {
            await writer.close();
          }
        })();

        return new Response(readable, {
          headers: {
            ...CORS_HEADERS,
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response('Not Found', { status: 404, headers: CORS_HEADERS });
  },
};
