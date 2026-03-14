import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Pool } from 'pg';

const data = new SlashCommandBuilder()
  .setName('list')
  .setDescription('List all tracked streamers and accounts in this server');

async function execute(interaction: ChatInputCommandInteraction, db: Pool) {
  const guildId = interaction.guildId!;

  const [streamers, subscriptions] = await Promise.all([
    db.query(
      `SELECT platform, username, channel_id FROM tracked_streamers WHERE guild_id = $1 ORDER BY platform, username`,
      [guildId]
    ),
    db.query(
      `SELECT subscription_type, target, channel_id FROM server_subscriptions WHERE guild_id = $1 ORDER BY subscription_type, target`,
      [guildId]
    ),
  ]);

  const embed = new EmbedBuilder()
    .setTitle('📋 Tracked Items')
    .setColor(0x7289da)
    .setTimestamp();

  const twitchList = streamers.rows
    .filter(r => r.platform === 'twitch')
    .map(r => `• **${r.username}** (<#${r.channel_id}>)`)
    .join('\n') || 'None';

  const twitterList = subscriptions.rows
    .filter(r => r.subscription_type === 'twitter')
    .map(r => `• **@${r.target}** (<#${r.channel_id}>)`)
    .join('\n') || 'None';

  const vtuberList = subscriptions.rows
    .filter(r => r.subscription_type === 'vtuber')
    .map(r => `• **${r.target}** (<#${r.channel_id}>)`)
    .join('\n') || 'None';

  embed.addFields(
    { name: '🟣 Twitch Streamers', value: twitchList },
    { name: '🐦 Twitter Accounts', value: twitterList },
    { name: '🌸 Vtuber News', value: vtuberList },
  );

  await interaction.reply({ embeds: [embed] });
}

export default { data, execute };
