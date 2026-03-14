import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Pool } from 'pg';

const data = new SlashCommandBuilder()
  .setName('track')
  .setDescription('Track a streamer, Twitter account, or vtuber')
  .addSubcommand(sub =>
    sub.setName('twitch')
      .setDescription('Track a Twitch streamer')
      .addStringOption(opt =>
        opt.setName('username').setDescription('Twitch username').setRequired(true)))
  .addSubcommand(sub =>
    sub.setName('twitter')
      .setDescription('Track a Twitter account')
      .addStringOption(opt =>
        opt.setName('username').setDescription('Twitter username').setRequired(true)))
  .addSubcommand(sub =>
    sub.setName('vtuber')
      .setDescription('Track vtuber news')
      .addStringOption(opt =>
        opt.setName('name').setDescription('Vtuber name').setRequired(true)));

async function execute(interaction: ChatInputCommandInteraction, db: Pool) {
  const sub = interaction.options.getSubcommand();
  const guildId = interaction.guildId!;
  const channelId = interaction.channelId;

  if (sub === 'twitch') {
    const username = interaction.options.getString('username', true).toLowerCase();
    try {
      await db.query(
        `INSERT INTO tracked_streamers (guild_id, channel_id, platform, username)
         VALUES ($1, $2, 'twitch', $3)
         ON CONFLICT (guild_id, platform, username) DO NOTHING`,
        [guildId, channelId, username]
      );
      await interaction.reply({ content: `✅ Now tracking Twitch streamer **${username}** in this channel.`, ephemeral: false });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ Failed to track streamer.', ephemeral: true });
    }
  } else if (sub === 'twitter') {
    const username = interaction.options.getString('username', true).toLowerCase();
    try {
      await db.query(
        `INSERT INTO server_subscriptions (guild_id, channel_id, subscription_type, target)
         VALUES ($1, $2, 'twitter', $3)
         ON CONFLICT (guild_id, subscription_type, target) DO NOTHING`,
        [guildId, channelId, username]
      );
      await interaction.reply({ content: `✅ Now tracking Twitter account **@${username}** in this channel.`, ephemeral: false });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ Failed to track Twitter account.', ephemeral: true });
    }
  } else if (sub === 'vtuber') {
    const name = interaction.options.getString('name', true).toLowerCase();
    try {
      await db.query(
        `INSERT INTO server_subscriptions (guild_id, channel_id, subscription_type, target)
         VALUES ($1, $2, 'vtuber', $3)
         ON CONFLICT (guild_id, subscription_type, target) DO NOTHING`,
        [guildId, channelId, name]
      );
      await interaction.reply({ content: `✅ Now tracking vtuber news for **${name}** in this channel.`, ephemeral: false });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ Failed to track vtuber news.', ephemeral: true });
    }
  }
}

export default { data, execute };
