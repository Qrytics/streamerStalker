import axios from 'axios';
import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { Pool } from 'pg';
import { summarizeNews } from '../services/aiSummary';
import { decodeHtmlEntities } from '../utils/html';

interface NewsArticle {
  title: string;
  url: string;
  source: string;
  publishedAt: Date;
}

// RSS feeds for vtuber news sources
const NEWS_SOURCES = [
  {
    name: 'VirtualYoutuber Reddit',
    url: 'https://www.reddit.com/r/VirtualYoutubers/new/.rss',
  },
  {
    name: 'Hololive Reddit',
    url: 'https://www.reddit.com/r/Hololive/new/.rss',
  },
];

async function fetchRssFeed(source: { name: string; url: string }): Promise<NewsArticle[]> {
  try {
    const response = await axios.get(source.url, {
      timeout: 10000,
      headers: { 'User-Agent': 'StreamerStalkerBot/1.0' },
    });

    const articles: NewsArticle[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(response.data)) !== null) {
      const item = match[1];
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                         item.match(/<title>(.*?)<\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/) ||
                        item.match(/<link\s+href="(.*?)"/);
      const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/) ||
                           item.match(/<published>(.*?)<\/published>/);

      if (titleMatch && linkMatch) {
        const title = decodeHtmlEntities(titleMatch[1]);
        const url = linkMatch[1].trim();

        articles.push({
          title,
          url,
          source: source.name,
          publishedAt: pubDateMatch ? new Date(pubDateMatch[1]) : new Date(),
        });
      }
    }

    return articles;
  } catch (err) {
    console.error(`Failed to fetch RSS from ${source.name}:`, err);
    return [];
  }
}

export async function checkVtuberNews(client: Client, db: Pool): Promise<void> {
  try {
    const allArticles: NewsArticle[] = [];

    for (const source of NEWS_SOURCES) {
      const articles = await fetchRssFeed(source);
      allArticles.push(...articles);
    }

    const newArticles: NewsArticle[] = [];

    for (const article of allArticles) {
      // Check if we've already posted this article
      const { rows: existing } = await db.query(
        `SELECT id FROM news_articles WHERE url = $1`,
        [article.url]
      );

      if (existing.length > 0) continue;

      // Store the article
      try {
        await db.query(
          `INSERT INTO news_articles (source, title, url, published_at)
           VALUES ($1, $2, $3, $4) ON CONFLICT (url) DO NOTHING`,
          [article.source, article.title, article.url, article.publishedAt]
        );
        newArticles.push(article);
      } catch {
        // Skip duplicates
      }
    }

    if (newArticles.length === 0) return;

    // Get optional AI summary
    const summary = await summarizeNews(newArticles.slice(0, 5));

    // Get all servers subscribed to vtuber news with their tracked vtubers in one query
    const { rows: subscribers } = await db.query(
      `SELECT DISTINCT guild_id, channel_id FROM server_subscriptions
       WHERE subscription_type = 'vtuber'`
    );

    const { rows: allTrackedVtubers } = await db.query(
      `SELECT guild_id, target FROM server_subscriptions WHERE subscription_type = 'vtuber'`
    );

    // Build a map of guild_id -> tracked vtuber names for fast lookup
    const vtubersByGuild = new Map<string, string[]>();
    for (const row of allTrackedVtubers) {
      const list = vtubersByGuild.get(row.guild_id) ?? [];
      list.push(row.target.toLowerCase());
      vtubersByGuild.set(row.guild_id, list);
    }

    for (const sub of subscribers) {
      try {
        const channel = await client.channels.fetch(sub.channel_id) as TextChannel;
        if (!channel) continue;

        const trackedNames = vtubersByGuild.get(sub.guild_id) ?? [];

        // Filter articles relevant to tracked vtubers (or send all if tracking broadly)
        const relevantArticles = newArticles.filter(a => {
          if (trackedNames.length === 0) return true;
          const titleLower = a.title.toLowerCase();
          return trackedNames.some((name: string) => titleLower.includes(name));
        });

        if (relevantArticles.length === 0) continue;

        // Send news embed
        const embed = new EmbedBuilder()
          .setTitle('📰 Vtuber News Update')
          .setColor(0xff69b4)
          .setTimestamp();

        const articleText = relevantArticles
          .slice(0, 5)
          .map(a => `• [${a.title.length > 80 ? a.title.slice(0, 77) + '...' : a.title}](${a.url})\n  *${a.source}*`)
          .join('\n\n');

        embed.setDescription(articleText);

        if (summary) {
          embed.addFields({ name: '🤖 AI Summary', value: summary });
        }

        await channel.send({ embeds: [embed] });
      } catch (err) {
        console.error('Failed to send vtuber news:', err);
      }
    }
  } catch (err) {
    console.error('Error in checkVtuberNews:', err);
  }
}
