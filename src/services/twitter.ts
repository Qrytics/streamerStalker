import axios from 'axios';

export interface Tweet {
  id: string;
  text: string;
  url: string;
  author: string;
  publishedAt: Date;
}

// Uses nitter RSS feeds as a free alternative to the Twitter API
const NITTER_INSTANCES = [
  'https://nitter.net',
  'https://nitter.privacydev.net',
];

export async function getLatestTweets(username: string, count: number = 5): Promise<Tweet[]> {
  for (const instance of NITTER_INSTANCES) {
    try {
      const response = await axios.get(`${instance}/${username}/rss`, {
        timeout: 10000,
        headers: { 'User-Agent': 'StreamerStalkerBot/1.0' },
      });

      const tweets = parseRssFeed(response.data, username);
      return tweets.slice(0, count);
    } catch {
      // Try next instance
      continue;
    }
  }

  return [];
}

function parseRssFeed(xml: string, username: string): Tweet[] {
  const tweets: Tweet[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const linkMatch = item.match(/<link>(.*?)<\/link>/);
    const guidMatch = item.match(/<guid>(.*?)<\/guid>/);
    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);

    if (titleMatch && linkMatch) {
      const link = linkMatch[1];
      const tweetIdMatch = link.match(/\/status\/(\d+)/);
      const tweetId = tweetIdMatch ? tweetIdMatch[1] : guidMatch?.[1] || link;

      tweets.push({
        id: tweetId,
        text: titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
        url: `https://twitter.com/${username}/status/${tweetId.split('/').pop()}`,
        author: username,
        publishedAt: pubDateMatch ? new Date(pubDateMatch[1]) : new Date(),
      });
    }
  }

  return tweets;
}
