import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { Pool } from 'pg';
import { startJobs } from './scheduler/jobs';
import trackCommand from './commands/track';
import untrackCommand from './commands/untrack';
import listCommand from './commands/list';

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

export const db = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  user: process.env.POSTGRES_USER || 'stalker',
  password: process.env.POSTGRES_PASSWORD || 'stalker_pass',
  database: process.env.POSTGRES_DB || 'streamerstalker',
});

const commands = new Collection<string, any>();
commands.set(trackCommand.data.name, trackCommand);
commands.set(untrackCommand.data.name, untrackCommand);
commands.set(listCommand.data.name, listCommand);

client.once('ready', async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
  const commandData = [trackCommand.data.toJSON(), untrackCommand.data.toJSON(), listCommand.data.toJSON()];

  try {
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      { body: commandData },
    );
    console.log('Slash commands registered.');
  } catch (err) {
    console.error('Failed to register commands:', err);
  }

  startJobs(client, db);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction, db);
  } catch (err) {
    console.error(err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'An error occurred.', ephemeral: true });
    } else {
      await interaction.reply({ content: 'An error occurred.', ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
