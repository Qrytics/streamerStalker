import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { Pool } from 'pg';
import { getStreamStatus } from '../services/twitch';

/**
 * Polls the Twitch Helix API for all tracked streamers and sends a Discord
 * embed notification to the appropriate channel whenever a streamer
 * transitions from **offline → live**.
 *
 * Already-live streamers (repeated polling) do not trigger a duplicate
 * notification; the `last_live_status` column in `tracked_streamers` tracks
 * the previous known state.
 *
 * @param client - Authenticated discord.js `Client` instance used to fetch channels.
 * @param db     - PostgreSQL connection pool for tracking state reads/writes.
 */
export async function checkTwitchStreams(client: Client, db: Pool): Promise<void> {
  try {
    // Get all tracked Twitch streamers
    const { rows } = await db.query(
      `SELECT DISTINCT username FROM tracked_streamers WHERE platform = 'twitch'`
    );

    if (rows.length === 0) return;

    const usernames = rows.map((r: { username: string }) => r.username);
    const streamStatuses = await getStreamStatus(usernames);

    for (const [username, streamInfo] of streamStatuses) {
      // Get all guilds tracking this streamer
      const { rows: trackers } = await db.query(
        `SELECT guild_id, channel_id, last_live_status FROM tracked_streamers
         WHERE platform = 'twitch' AND username = $1`,
        [username]
      );

      for (const tracker of trackers) {
        const wasLive = tracker.last_live_status;
        const isLive = streamInfo.isLive;

        // Update status
        await db.query(
          `UPDATE tracked_streamers SET last_live_status = $1, last_checked = NOW()
           WHERE platform = 'twitch' AND username = $2 AND guild_id = $3`,
          [isLive, username, tracker.guild_id]
        );

        // Only notify when going from offline → online
        if (!wasLive && isLive) {
          try {
            const channel = await client.channels.fetch(tracker.channel_id) as TextChannel;
            if (!channel) continue;

            const embed = new EmbedBuilder()
              .setTitle(`🔴 ${streamInfo.username} is LIVE!`)
              .setURL(streamInfo.streamUrl)
              .setDescription(`**${streamInfo.title}**`)
              .addFields(
                { name: '🎮 Game', value: streamInfo.game || 'Unknown', inline: true },
                { name: '👀 Viewers', value: streamInfo.viewerCount.toLocaleString(), inline: true },
              )
              .setImage(streamInfo.thumbnailUrl)
              .setColor(0x9146ff)
              .setTimestamp();

            await channel.send({ embeds: [embed] });
          } catch (err) {
            console.error(`Failed to send Twitch notification for ${username}:`, err);
          }
        }
      }
    }
  } catch (err) {
    console.error('Error in checkTwitchStreams:', err);
  }
}
