import cron from 'node-cron';
import { Client } from 'discord.js';
import { Pool } from 'pg';
import { checkTwitchStreams } from '../trackers/twitchTracker';
import { checkTwitterUpdates } from '../trackers/twitterTracker';
import { checkVtuberNews } from '../trackers/vtuberNews';

export function startJobs(client: Client, db: Pool): void {
  // Check Twitch streams every 60 seconds
  cron.schedule('* * * * *', async () => {
    await checkTwitchStreams(client, db);
  });

  // Check Twitter every 3 minutes
  cron.schedule('*/3 * * * *', async () => {
    await checkTwitterUpdates(client, db);
  });

  // Check vtuber news every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    await checkVtuberNews(client, db);
  });

  console.log('✅ Scheduler jobs started.');
}
