import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

/**
 * Generates a concise (2–3 sentence) AI summary of a list of vtuber news
 * articles using the OpenAI `gpt-3.5-turbo` model.
 *
 * Privacy-safe: only article titles and source names are transmitted; no
 * Discord message content, user data, or guild information is included.
 *
 * Returns `null` when:
 * - `OPENAI_API_KEY` is not set in the environment, or
 * - `articles` is empty, or
 * - the OpenAI API call fails for any reason.
 *
 * @param articles - Array of `{ title, source }` objects to summarise.
 * @returns The AI-generated summary string, or `null`.
 */
export async function summarizeNews(articles: Array<{ title: string; source: string }>): Promise<string | null> {
  const client = getClient();
  if (!client || articles.length === 0) return null;

  const articleList = articles
    .map((a, i) => `${i + 1}. [${a.source}] ${a.title}`)
    .join('\n');

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes vtuber news concisely in 2-3 sentences.',
        },
        {
          role: 'user',
          content: `Summarize these vtuber news items:\n\n${articleList}`,
        },
      ],
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content || null;
  } catch (err) {
    console.error('OpenAI error:', err);
    return null;
  }
}
