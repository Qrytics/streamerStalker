/**
 * Unit tests for src/services/twitter.ts
 *
 * Validates RSS parsing, de-duplication of tweet IDs, fallback to a second
 * Nitter instance when the first fails, and correct URL construction —
 * all without making real HTTP requests.
 */

import axios from 'axios';
import { getLatestTweets } from '../services/twitter';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// ── Helpers ─────────────────────────────────────────────────────────────────

function buildRssFeed(items: Array<{ id: string; title: string; pubDate?: string }>): string {
  const itemsXml = items
    .map(
      ({ id, title, pubDate }) => `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>https://nitter.net/testuser/status/${id}#m</link>
      <guid>https://nitter.net/testuser/status/${id}#m</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
    </item>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>testuser / Twitter</title>
    ${itemsXml}
  </channel>
</rss>`;
}

beforeEach(() => jest.clearAllMocks());

// ── Tests ───────────────────────────────────────────────────────────────────

describe('getLatestTweets', () => {
  it('returns an empty array when the Nitter instance returns an error and no fallback succeeds', async () => {
    mockedAxios.get.mockRejectedValue(new Error('ECONNREFUSED'));

    const result = await getLatestTweets('testuser', 5);
    expect(result).toEqual([]);
  });

  it('falls back to the second Nitter instance when the first one fails', async () => {
    mockedAxios.get
      .mockRejectedValueOnce(new Error('timeout'))          // first instance fails
      .mockResolvedValueOnce({                               // second instance succeeds
        data: buildRssFeed([{ id: '1111111111111111111', title: 'Hello world' }]),
      });

    const result = await getLatestTweets('testuser', 5);
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe('Hello world');
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  it('parses tweet IDs, text, author, and URL from a valid RSS feed', async () => {
    const pubDate = 'Mon, 01 Jan 2024 12:00:00 +0000';
    mockedAxios.get.mockResolvedValueOnce({
      data: buildRssFeed([
        { id: '1234567890123456789', title: 'Test tweet text', pubDate },
      ]),
    });

    const [tweet] = await getLatestTweets('testuser', 5);

    expect(tweet.id).toBe('1234567890123456789');
    expect(tweet.text).toBe('Test tweet text');
    expect(tweet.author).toBe('testuser');
    expect(tweet.url).toBe('https://twitter.com/testuser/status/1234567890123456789');
    expect(tweet.publishedAt).toEqual(new Date(pubDate));
  });

  it('honours the count limit — never returns more tweets than requested', async () => {
    const items = Array.from({ length: 10 }, (_, i) => ({
      id: String(1000000000000000000 + i),
      title: `Tweet ${i}`,
    }));

    mockedAxios.get.mockResolvedValueOnce({ data: buildRssFeed(items) });

    const result = await getLatestTweets('testuser', 3);
    expect(result).toHaveLength(3);
  });

  it('decodes HTML entities in tweet text', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: buildRssFeed([{ id: '9999999999999999999', title: 'AT&amp;T &lt;3 TypeScript &gt; Java' }]),
    });

    const [tweet] = await getLatestTweets('testuser', 1);
    expect(tweet.text).toBe('AT&T <3 TypeScript > Java');
  });

  it('returns an empty array for a feed with no <item> elements', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: '<?xml version="1.0"?><rss><channel><title>Empty</title></channel></rss>',
    });

    const result = await getLatestTweets('testuser', 5);
    expect(result).toEqual([]);
  });
});
