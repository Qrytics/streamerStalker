import axios from 'axios';
import { decodeHtmlEntities } from '../utils/html';

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
      // Fall back to guid or link, but always extract only the numeric ID segment
      const rawId = tweetIdMatch ? tweetIdMatch[1] : (guidMatch?.[1] || link);
      const numericIdMatch = rawId.match(/(\d+)$/);
      const tweetId = numericIdMatch ? numericIdMatch[1] : rawId;

      tweets.push({
        id: tweetId,
        text: decodeHtmlEntities(titleMatch[1]),
        url: `https://twitter.com/${username}/status/${tweetId}`,
        author: username,
        publishedAt: pubDateMatch ? new Date(pubDateMatch[1]) : new Date(),
      });
    }
  }

  return tweets;
}
