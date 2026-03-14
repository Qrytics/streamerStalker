# streamerStalker 🎮📡

**streamerStalker** is a Discord bot that tracks Twitch streamers, Twitter/X accounts, and vtuber news — all from inside your Discord server. It polls for live-stream status, new tweets, and community news on a schedule, and posts rich embed notifications to whatever channels you configure. An optional OpenAI integration can generate a brief AI-written summary of vtuber news updates.

---

## Table of Contents

1. [Overview](#overview)
2. [How It Works](#how-it-works)
3. [Tech Stack](#tech-stack)
4. [Features](#features)
5. [Bot Commands](#bot-commands)
6. [Project Structure](#project-structure)
7. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Discord Bot Setup](#discord-bot-setup)
   - [Twitch API Setup](#twitch-api-setup)
   - [Configuration](#configuration)
   - [Database Setup](#database-setup)
   - [Running the Bot](#running-the-bot)
8. [Architecture Deep-Dive](#architecture-deep-dive)
   - [Scheduler](#scheduler)
   - [Twitch Tracker](#twitch-tracker)
   - [Twitter Tracker](#twitter-tracker)
   - [Vtuber News Tracker](#vtuber-news-tracker)
   - [AI Summary](#ai-summary)
   - [Database Schema](#database-schema)
9. [Deployment](#deployment)
10. [Contributing](#contributing)

---

## Overview

streamerStalker keeps your community in sync without requiring anyone to leave Discord. Add a Twitch streamer once with a slash command, and every time they go live your server gets a notification embed with stream title, game, viewer count, and thumbnail. Add a Twitter/X account and get a post every time they tweet. Subscribe to vtuber news and get aggregated headlines from Reddit with an optional GPT summary.

```
/track twitch xqc  ──►  Polls Twitch API every 60s  ──►  🔴 xQc is LIVE! embed
/track twitter xqc ──►  Polls Nitter RSS every 3min ──►  🐦 New Tweet from @xQc embed
/track vtuber gura ──►  Polls Reddit RSS every 30min ──►  📰 Vtuber News Update embed
```

- **All tracking is per-server and per-channel.** Each guild manages its own subscriptions independently.
- **No raw messages are ever sent to the LLM.** The AI Summary feature only receives article titles and source names.
- **Twitter polling uses Nitter**, an open-source Twitter front-end that provides RSS feeds — no official Twitter API key required.

---

## How It Works

1. **Command** — A server member runs a slash command such as `/track twitch <username>`. The bot writes a row to the PostgreSQL database recording the guild ID, channel ID, platform, and target username.

2. **Scheduler** — Three `node-cron` jobs run on separate intervals in the background:
   - **Every 1 minute** — Check all tracked Twitch streamers via the Twitch Helix API. If a streamer transitions from offline → live, send a notification embed to the registered channel.
   - **Every 3 minutes** — Fetch the latest tweets for all tracked Twitter accounts via Nitter RSS. De-duplicate against a `tweet_cache` table, then post any new tweets.
   - **Every 30 minutes** — Fetch new posts from the r/VirtualYoutubers and r/Hololive Reddit RSS feeds. Filter by tracked vtuber names, de-duplicate against `news_articles`, optionally generate an AI summary via OpenAI, and post an embed.

3. **Notification** — The bot fetches the Discord channel object by its stored ID, builds a rich `EmbedBuilder` card, and calls `channel.send()`.

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Bot framework | [discord.js](https://discord.js.org/) v14 |
| Language | TypeScript 5 / Node.js 18+ |
| Database | [PostgreSQL](https://www.postgresql.org/) 15 (via [`pg`](https://node-postgres.com/)) |
| Scheduler | [node-cron](https://github.com/node-cron/node-cron) |
| HTTP client | [axios](https://axios-http.com/) |
| Twitch data | [Twitch Helix API](https://dev.twitch.tv/docs/api/) |
| Twitter data | [Nitter](https://github.com/zedeus/nitter) RSS feeds (no official API key needed) |
| Vtuber news | Reddit RSS feeds (r/VirtualYoutubers, r/Hololive) |
| AI summaries | [OpenAI API](https://platform.openai.com/) — `gpt-3.5-turbo` (optional) |
| Config | [dotenv](https://github.com/motdotla/dotenv) |
| Container | [Docker Compose](https://docs.docker.com/compose/) (for Postgres) |

---

## Features

### ✅ Twitch Live Notifications
- Polls the Twitch Helix API every minute.
- Sends a notification only when a streamer transitions **offline → live** (no repeated pings).
- Embed includes: stream title, game/category, live viewer count, and stream thumbnail.

### ✅ Twitter/X Updates
- Polls Nitter RSS endpoints every 3 minutes — no official Twitter API key required.
- Falls back through multiple Nitter instances if the first is unavailable.
- De-duplicates using a `tweet_cache` table so the same tweet is never posted twice.

### ✅ Vtuber News Aggregation
- Scrapes Reddit RSS feeds for r/VirtualYoutubers and r/Hololive every 30 minutes.
- Filters articles to only those mentioning vtubers you are actively tracking.
- De-duplicates by URL so each article is posted at most once.
- Optionally attaches an AI-written summary (2–3 sentences) via OpenAI.

### ✅ Per-Guild Isolation
- Every guild has its own subscriptions and notification channels.
- Removing a tracked item in one server has no effect on any other server.

### ✅ Slash Commands
- Uses Discord's native slash command system (`discord.js` REST registration on startup).
- All commands are registered globally (available in every server the bot is in).

---

## Bot Commands

| Command | Description | Who can use |
|---------|-------------|-------------|
| `/track twitch <username>` | Start tracking a Twitch streamer in the current channel | Everyone |
| `/track twitter <username>` | Start tracking a Twitter/X account in the current channel | Everyone |
| `/track vtuber <name>` | Start tracking vtuber news for a specific name in the current channel | Everyone |
| `/untrack twitch <username>` | Stop tracking a Twitch streamer | Everyone |
| `/untrack twitter <username>` | Stop tracking a Twitter/X account | Everyone |
| `/untrack vtuber <name>` | Stop tracking vtuber news for a specific name | Everyone |
| `/list` | List all tracked streamers and accounts in this server | Everyone |

### Examples

```
/track twitch xqc          → Notifies in current channel when xQc goes live
/track twitter elonmusk    → Posts new tweets from @elonmusk in current channel
/track vtuber gura         → Posts Hololive/VTuber news mentioning "gura" in current channel
/untrack twitch xqc        → Stops live notifications for xQc
/list                      → Shows all tracked items across Twitch, Twitter, and Vtubers
```

---

## Project Structure

```
streamerStalker/
├── src/
│   ├── bot.ts                    # Entry point — Discord client, DB pool, slash command registration
│   ├── commands/
│   │   ├── track.ts              # /track subcommands (twitch, twitter, vtuber)
│   │   ├── untrack.ts            # /untrack subcommands
│   │   └── list.ts               # /list command
│   ├── scheduler/
│   │   └── jobs.ts               # node-cron job definitions and intervals
│   ├── services/
│   │   ├── twitch.ts             # Twitch OAuth token management + Helix API calls
│   │   ├── twitter.ts            # Nitter RSS fetching and tweet parsing
│   │   └── aiSummary.ts          # OpenAI gpt-3.5-turbo wrapper for news summaries
│   ├── trackers/
│   │   ├── twitchTracker.ts      # Queries DB, calls Twitch service, sends live embeds
│   │   ├── twitterTracker.ts     # Queries DB, calls Twitter service, sends tweet embeds
│   │   └── vtuberNews.ts         # Fetches Reddit RSS, filters by vtuber name, sends news embeds
│   └── utils/
│       └── html.ts               # Decodes HTML entities in RSS/XML content
├── migrations/
│   └── 001_initial.sql           # PostgreSQL schema (4 tables)
├── docker-compose.yml            # Spins up a Postgres 15 container for local dev
├── package.json                  # NPM scripts and dependencies
├── tsconfig.json                 # TypeScript compiler config
├── .env.example                  # Template for all required environment variables
└── README.md                     # This file
```

---

## Getting Started

### Prerequisites

- **Node.js 18** or later (LTS recommended)
- **npm** 9+ (comes bundled with Node.js)
- **Docker** and **Docker Compose** — to run the bundled PostgreSQL container. Alternatively, provide your own Postgres 15 instance.
- A **Discord application** with a bot user (instructions below)
- A **Twitch application** (Client ID + Secret) for stream status polling (instructions below)
- An **OpenAI API key** (optional, only needed for AI-powered vtuber news summaries)

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Qrytics/streamerStalker.git
cd streamerStalker

# 2. Install dependencies
npm install

# 3. Copy the environment variable template
cp .env.example .env
```

---

### Discord Bot Setup

Follow these steps exactly to create a Discord application, get a bot token, and invite the bot to your server.

#### Step 1 — Create an Application

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications) and click **New Application**.
2. Give it a name (e.g. `streamerStalker`) and click **Create**.

#### Step 2 — Create a Bot User and Copy Your Token

1. In the left sidebar, click **Bot**.
2. Click **Reset Token** (you may need to confirm with your 2FA code).
3. Click **Copy** immediately — the token is shown **only once**. Paste it into `DISCORD_TOKEN` in your `.env` file.

   > ⚠️ **Treat your bot token like a password.** Anyone who has it can control your bot. Never commit it, share it, or paste it in a public channel.
   >
   > If you ever expose the token, return to the **Bot** page and click **Reset Token** to invalidate it immediately.

#### Step 3 — Copy Your Application (Client) ID

1. In the left sidebar, click **General Information**.
2. Copy the **Application ID** field.
3. Paste it into `DISCORD_CLIENT_ID` in your `.env` file.

   > This ID is used by the bot at startup to register slash commands via the Discord REST API. It is **not** a secret — it's safe to share — but it must match the bot you are running.

#### Step 4 — Enable Privileged Gateway Intents

Still on the **Bot** page, scroll to **Privileged Gateway Intents**.

| Intent | Status | Why |
|--------|--------|-----|
| **Presence Intent** | ❌ Not needed | The bot does not read member presence |
| **Server Members Intent** | ❌ Not needed | The bot does not enumerate members |
| **Message Content Intent** | ❌ Not needed | The bot uses slash commands only, not message reading |

No privileged intents need to be enabled for this bot. The bot only uses the `Guilds` and `GuildMessages` intents, both of which are non-privileged.

#### Step 5 — Set Bot Permissions

The bot needs a minimal set of permissions to function. Do **not** grant Administrator — it is not required.

**Minimum required permissions:**

| Permission | Why |
|------------|-----|
| ✅ Send Messages | Post notification embeds and command responses |
| ✅ Embed Links | Send rich embed cards with stream/tweet info |
| ✅ View Channels | See text channels to send messages into them |
| ✅ Read Message History | Required by some Discord.js internals for channel resolution |

Everything else (Manage Server, Kick Members, Ban Members, Administrator, etc.) is **not needed** and should remain unchecked.

#### Step 6 — Generate an Invite URL and Add the Bot to Your Server

1. In the left sidebar, click **OAuth2**, then **URL Generator**.
2. Under **Scopes**, check **both**:
   - `bot`
   - `applications.commands`

   > ⚠️ **You must select `applications.commands`** — without it, slash commands (`/track`, `/untrack`, `/list`) will not appear in any server you invite the bot to.

3. Under **Bot Permissions**, check the permissions listed in Step 5.
4. Copy the **Generated URL** at the bottom of the page and open it in your browser to invite the bot to your server.

---

### Twitch API Setup

The bot uses the [Twitch Helix API](https://dev.twitch.tv/docs/api/) to check whether tracked streamers are currently live. This requires a Twitch application.

#### Step 1 — Create a Twitch Application

1. Go to [dev.twitch.tv/console/apps](https://dev.twitch.tv/console/apps) and log in with your Twitch account.
2. Click **Register Your Application**.
3. Fill in the form:
   - **Name**: anything you like (e.g. `streamerStalker`)
   - **OAuth Redirect URLs**: `http://localhost` (this bot uses Client Credentials flow, not OAuth user login, so the redirect URL is just a placeholder)
   - **Category**: Chat Bot (or any relevant category)
4. Click **Create**.

#### Step 2 — Copy Your Client ID and Secret

1. After creation, click **Manage** on your application.
2. Copy the **Client ID** and paste it into `TWITCH_CLIENT_ID` in your `.env` file.
3. Click **New Secret**, confirm, and copy the secret immediately. Paste it into `TWITCH_CLIENT_SECRET` in your `.env` file.

   > ⚠️ The Client Secret is shown only once. Store it securely. If you lose it, click **New Secret** again to generate a fresh one (the old one becomes invalid immediately).

   > The bot uses the **Client Credentials** OAuth flow — it authenticates as the application itself, not as any Twitch user. This is sufficient to read public stream data via the Helix API. No user authorization or consent is required.

---

### Configuration

Open the `.env` file you created during installation and fill in all values:

```dotenv
# ── Discord ────────────────────────────────────────────────────────────────
DISCORD_TOKEN=your_discord_bot_token          # from Bot → Reset Token
DISCORD_CLIENT_ID=your_discord_client_id      # from General Information → Application ID

# ── Twitch ─────────────────────────────────────────────────────────────────
TWITCH_CLIENT_ID=your_twitch_client_id        # from dev.twitch.tv/console/apps
TWITCH_CLIENT_SECRET=your_twitch_client_secret

# ── OpenAI (optional) ──────────────────────────────────────────────────────
OPENAI_API_KEY=your_openai_api_key            # leave blank to disable AI summaries

# ── PostgreSQL ─────────────────────────────────────────────────────────────
POSTGRES_HOST=localhost                        # 'localhost' when using docker-compose
POSTGRES_PORT=5432
POSTGRES_USER=stalker
POSTGRES_PASSWORD=stalker_pass
POSTGRES_DB=streamerstalker
```

**Variable reference:**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DISCORD_TOKEN` | ✅ | — | Bot token from the Developer Portal |
| `DISCORD_CLIENT_ID` | ✅ | — | Application ID used to register slash commands |
| `TWITCH_CLIENT_ID` | ✅ | — | Twitch application Client ID |
| `TWITCH_CLIENT_SECRET` | ✅ | — | Twitch application Client Secret |
| `OPENAI_API_KEY` | — | *(none)* | OpenAI API key — omit or leave blank to skip AI summaries |
| `POSTGRES_HOST` | — | `localhost` | Hostname of your PostgreSQL server |
| `POSTGRES_PORT` | — | `5432` | Port of your PostgreSQL server |
| `POSTGRES_USER` | — | `stalker` | PostgreSQL username |
| `POSTGRES_PASSWORD` | — | `stalker_pass` | PostgreSQL password |
| `POSTGRES_DB` | — | `streamerstalker` | PostgreSQL database name |

> ⚠️ **Never commit your `.env` file.** It is listed in `.gitignore`.

---

### Database Setup

The bot uses PostgreSQL. The easiest way to get a local Postgres instance running is with the included Docker Compose file.

#### Option A — Docker Compose (recommended for local dev)

```bash
# Start Postgres in the background. Docker will automatically run
# migrations/001_initial.sql on first boot to create all tables.
docker compose up -d
```

To verify it started correctly:

```bash
docker compose ps
# You should see the 'postgres' service with status 'Up'
```

To stop it later:

```bash
docker compose down         # stops the container but keeps data
docker compose down -v      # stops and deletes all data (fresh start)
```

#### Option B — Existing Postgres instance

If you already have a Postgres server, create the database and user manually, then run the migration:

```bash
# Create the database (run as a superuser, e.g. 'postgres')
psql -U postgres -c "CREATE USER stalker WITH PASSWORD 'stalker_pass';"
psql -U postgres -c "CREATE DATABASE streamerstalker OWNER stalker;"

# Apply the schema
psql -U stalker -d streamerstalker -f migrations/001_initial.sql
```

Update `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` in your `.env` to match your instance.

---

### Running the Bot

#### Development mode (TypeScript, with hot-ish reload via ts-node)

```bash
npm run dev
```

This runs `src/bot.ts` directly through `ts-node`. On startup you will see:

```
Logged in as streamerStalker#1234
Slash commands registered.
✅ Scheduler jobs started.
```

> **Slash commands are registered globally** the first time the bot starts. Global command registration can take up to **1 hour** to propagate to all servers. This is a Discord limitation. If commands don't appear immediately, wait a few minutes and try again.

#### Production mode (compiled JavaScript)

```bash
# Compile TypeScript to JavaScript
npm run build

# Run the compiled output
npm start
```

This produces a `dist/` directory and runs `dist/bot.js` with plain `node`.

---

## Architecture Deep-Dive

### Scheduler

`src/scheduler/jobs.ts` registers three `node-cron` tasks when `startJobs()` is called at bot startup. All jobs run independently and any error in one job is caught locally so it does not crash the other jobs or the bot process.

| Job | Cron expression | Interval |
|-----|----------------|----------|
| `checkTwitchStreams` | `* * * * *` | Every 1 minute |
| `checkTwitterUpdates` | `*/3 * * * *` | Every 3 minutes |
| `checkVtuberNews` | `*/30 * * * *` | Every 30 minutes |

---

### Twitch Tracker

**`src/services/twitch.ts`** — Handles Twitch API authentication and data fetching:
- Uses **Client Credentials OAuth** flow. The access token is cached in memory and refreshed automatically 60 seconds before it expires.
- `getStreamStatus(usernames)` batches all tracked usernames into a single `GET /helix/streams` request (up to 100 usernames per call). Returns a `Map<username, StreamInfo>` including offline entries so the tracker can detect going-offline accurately.

**`src/trackers/twitchTracker.ts`** — The polling logic:
1. Queries `tracked_streamers` for all distinct tracked Twitch usernames.
2. Calls `getStreamStatus()` for the entire list.
3. For each username, queries which guilds are tracking it and what the last recorded live status was.
4. If `last_live_status` was `false` (offline) and the current status is `true` (live), it sends a notification embed and updates `last_live_status` to `true` in the database.
5. If a streamer is offline, updates `last_live_status` to `false` so the next go-live triggers a new notification.

This **offline → online** edge-detection ensures you only get one notification when a stream starts, not one every minute for the entire duration.

---

### Twitter Tracker

**`src/services/twitter.ts`** — Fetches tweets via Nitter RSS:
- Tries each URL in `NITTER_INSTANCES` in order. If an instance times out or returns an error, it silently falls through to the next.
- Parses `<item>` blocks from the RSS XML using regex (no external XML parser dependency).
- Extracts the numeric tweet ID from the `<link>` tag, falling back to `<guid>`, to build a canonical `twitter.com/…/status/<id>` URL.
- Decodes HTML entities in tweet text using `src/utils/html.ts`.

**`src/trackers/twitterTracker.ts`** — The polling logic:
1. Queries `server_subscriptions` for all distinct Twitter targets.
2. For each username, calls `getLatestTweets(username, 5)` to fetch up to 5 recent tweets.
3. Checks `tweet_cache` to see if the tweet ID has already been posted.
4. If new: inserts the tweet ID into `tweet_cache`, then posts an embed to all guilds tracking that username.
5. A 1-second delay is inserted between usernames to reduce the chance of hitting Nitter rate limits.

---

### Vtuber News Tracker

**`src/trackers/vtuberNews.ts`** — Aggregates and distributes news:
1. Fetches RSS from each source in `NEWS_SOURCES` (r/VirtualYoutubers and r/Hololive).
2. Parses `<item>` elements for title, link, and publish date.
3. Checks each article URL against the `news_articles` table. New articles are inserted.
4. Calls `summarizeNews()` (optional AI summary) with up to 5 new article titles.
5. Queries all guilds with a `vtuber` subscription and their tracked vtuber names.
6. For each subscriber, filters the new articles to only those whose titles contain at least one tracked name.
7. Sends a single embed listing up to 5 relevant articles with the optional AI summary appended as a field.

---

### AI Summary

**`src/services/aiSummary.ts`** — Optional OpenAI integration:
- Only activates if `OPENAI_API_KEY` is set. If the key is missing, `summarizeNews()` returns `null` and the news embed is posted without a summary field.
- Sends article titles (not URLs or full content) to `gpt-3.5-turbo` with a system prompt asking for a 2–3 sentence vtuber news summary.
- The OpenAI call is wrapped in a try/catch. On error, it returns `null` so news posting continues unaffected.

---

### Database Schema

Four tables are defined in `migrations/001_initial.sql`:

**`tracked_streamers`** — Twitch tracking subscriptions
| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | |
| `guild_id` | VARCHAR(32) | Discord server ID |
| `channel_id` | VARCHAR(32) | Discord channel to post into |
| `platform` | VARCHAR(20) | Always `'twitch'` currently |
| `username` | VARCHAR(100) | Lowercased Twitch username |
| `last_live_status` | BOOLEAN | `false` by default; updated each poll cycle |
| `last_checked` | TIMESTAMP | Updated each poll cycle |
| `created_at` | TIMESTAMP | |
| UNIQUE | `(guild_id, platform, username)` | One entry per streamer per guild |

**`tweet_cache`** — Prevents duplicate tweet notifications
| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | |
| `username` | VARCHAR(100) | Twitter handle |
| `tweet_id` | VARCHAR(50) UNIQUE | Numeric tweet ID |
| `created_at` | TIMESTAMP | |

**`news_articles`** — Prevents duplicate vtuber news posts
| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | |
| `source` | VARCHAR(100) | RSS feed name |
| `title` | TEXT | Article headline |
| `url` | TEXT UNIQUE | Article URL (de-duplication key) |
| `published_at` | TIMESTAMP | |
| `created_at` | TIMESTAMP | |

**`server_subscriptions`** — Twitter and vtuber tracking subscriptions
| Column | Type | Notes |
|--------|------|-------|
| `id` | SERIAL PK | |
| `guild_id` | VARCHAR(32) | Discord server ID |
| `channel_id` | VARCHAR(32) | Discord channel to post into |
| `subscription_type` | VARCHAR(20) | `'twitter'` or `'vtuber'` |
| `target` | VARCHAR(100) | Lowercased username or vtuber name |
| `created_at` | TIMESTAMP | |
| UNIQUE | `(guild_id, subscription_type, target)` | One entry per target per guild |

---

## Deployment

### Using Docker Compose (full stack)

You can run both Postgres and the bot together. Add a `bot` service to `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-stalker}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-stalker_pass}
      POSTGRES_DB: ${POSTGRES_DB:-streamerstalker}
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./migrations/001_initial.sql:/docker-entrypoint-initdb.d/001_initial.sql

  bot:
    build: .
    restart: always
    env_file: .env
    depends_on:
      - postgres
    environment:
      POSTGRES_HOST: postgres   # use the Docker service name, not 'localhost'

volumes:
  pgdata:
```

Add a `Dockerfile` at the project root:

```dockerfile
FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build
CMD ["node", "dist/bot.js"]
```

```bash
docker compose up -d --build
```

### Using a Process Manager (Linux VPS)

```bash
# Install pm2 globally
npm install -g pm2

# Build first
npm run build

# Start with pm2
pm2 start dist/bot.js --name streamer-stalker

# Auto-start on reboot
pm2 startup
pm2 save
```

### Using systemd

```ini
# /etc/systemd/system/streamerstalker.service
[Unit]
Description=streamerStalker Discord Bot
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/streamerStalker
EnvironmentFile=/opt/streamerStalker/.env
ExecStart=/usr/bin/node /opt/streamerStalker/dist/bot.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable streamerstalker
sudo systemctl start streamerstalker
sudo systemctl status streamerstalker
```

---

## Contributing

Pull requests are welcome!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Make your changes and build: `npm run build`.
4. Lint your code: `npm run lint`.
5. Commit and open a Pull Request.