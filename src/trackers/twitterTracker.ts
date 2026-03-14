import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { Pool } from 'pg';
import { getLatestTweets } from '../services/twitter';

export async function checkTwitterUpdates(client: Client, db: Pool): Promise<void> {
  try {
    // Get all tracked Twitter accounts
    const { rows: subscriptions } = await db.query(
      `SELECT DISTINCT target FROM server_subscriptions WHERE subscription_type = 'twitter'`
    );

    if (subscriptions.length === 0) return;

    for (const sub of subscriptions) {
      const username = sub.target;
      const tweets = await getLatestTweets(username, 5);

      for (const tweet of tweets) {
        // Check if we've already posted this tweet
        const { rows: existing } = await db.query(
          `SELECT id FROM tweet_cache WHERE tweet_id = $1`,
          [tweet.id]
        );

        if (existing.length > 0) continue;

        // Cache the tweet
        await db.query(
          `INSERT INTO tweet_cache (username, tweet_id) VALUES ($1, $2) ON CONFLICT (tweet_id) DO NOTHING`,
          [username, tweet.id]
        );

        // Get all guilds tracking this twitter account
        const { rows: trackers } = await db.query(
          `SELECT guild_id, channel_id FROM server_subscriptions
           WHERE subscription_type = 'twitter' AND target = $1`,
          [username]
        );

        for (const tracker of trackers) {
          try {
            const channel = await client.channels.fetch(tracker.channel_id) as TextChannel;
            if (!channel) continue;

            const embed = new EmbedBuilder()
              .setTitle(`🐦 New Tweet from @${username}`)
              .setURL(tweet.url)
              .setDescription(tweet.text.length > 300 ? tweet.text.slice(0, 297) + '...' : tweet.text)
              .setColor(0x1da1f2)
              .setTimestamp(tweet.publishedAt);

            await channel.send({ embeds: [embed] });
          } catch (err) {
            console.error(`Failed to send tweet notification for ${username}:`, err);
          }
        }
      }

      // Add a small delay between usernames to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (err) {
    console.error('Error in checkTwitterUpdates:', err);
  }
}
