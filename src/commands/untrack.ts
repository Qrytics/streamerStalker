import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Pool } from 'pg';

const data = new SlashCommandBuilder()
  .setName('untrack')
  .setDescription('Stop tracking a streamer, Twitter account, or vtuber')
  .addSubcommand(sub =>
    sub.setName('twitch')
      .setDescription('Stop tracking a Twitch streamer')
      .addStringOption(opt =>
        opt.setName('username').setDescription('Twitch username').setRequired(true)))
  .addSubcommand(sub =>
    sub.setName('twitter')
      .setDescription('Stop tracking a Twitter account')
      .addStringOption(opt =>
        opt.setName('username').setDescription('Twitter username').setRequired(true)))
  .addSubcommand(sub =>
    sub.setName('vtuber')
      .setDescription('Stop tracking vtuber news')
      .addStringOption(opt =>
        opt.setName('name').setDescription('Vtuber name').setRequired(true)));

async function execute(interaction: ChatInputCommandInteraction, db: Pool) {
  const sub = interaction.options.getSubcommand();
  const guildId = interaction.guildId!;

  if (sub === 'twitch') {
    const username = interaction.options.getString('username', true).toLowerCase();
    const result = await db.query(
      `DELETE FROM tracked_streamers WHERE guild_id = $1 AND platform = 'twitch' AND username = $2`,
      [guildId, username]
    );
    if ((result.rowCount ?? 0) > 0) {
      await interaction.reply({ content: `✅ Stopped tracking Twitch streamer **${username}**.` });
    } else {
      await interaction.reply({ content: `⚠️ **${username}** was not being tracked.`, ephemeral: true });
    }
  } else if (sub === 'twitter') {
    const username = interaction.options.getString('username', true).toLowerCase();
    const result = await db.query(
      `DELETE FROM server_subscriptions WHERE guild_id = $1 AND subscription_type = 'twitter' AND target = $2`,
      [guildId, username]
    );
    if ((result.rowCount ?? 0) > 0) {
      await interaction.reply({ content: `✅ Stopped tracking Twitter account **@${username}**.` });
    } else {
      await interaction.reply({ content: `⚠️ **@${username}** was not being tracked.`, ephemeral: true });
    }
  } else if (sub === 'vtuber') {
    const name = interaction.options.getString('name', true).toLowerCase();
    const result = await db.query(
      `DELETE FROM server_subscriptions WHERE guild_id = $1 AND subscription_type = 'vtuber' AND target = $2`,
      [guildId, name]
    );
    if ((result.rowCount ?? 0) > 0) {
      await interaction.reply({ content: `✅ Stopped tracking vtuber news for **${name}**.` });
    } else {
      await interaction.reply({ content: `⚠️ **${name}** was not being tracked.`, ephemeral: true });
    }
  }
}

export default { data, execute };
