# streamerStalker — Project Survey Paper

**Project:** streamerStalker  
**Repository:** https://github.com/Qrytics/streamerStalker  
**Date:** March 2026  

---

## Abstract

streamerStalker is a Discord bot that aggregates real-time notifications from multiple content platforms — Twitch live streams, Twitter/X posts, and VTuber community news — into a single Discord server. This paper presents a thorough survey of the project across seven key evaluation themes: planning and current progress, modular architecture, design choices, prior art and innovation, solution description, final project scope, and resources and time estimates. Together these sections demonstrate that streamerStalker is a thoughtfully designed, modular, and practically useful tool for content-creator communities.

---

## 1. Planning and Current Progress

### 1.1 Project Schedule

The project was developed in a series of well-defined phases:

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Requirements gathering and technology selection | ✅ Complete |
| 2 | Database schema design and migration scripts | ✅ Complete |
| 3 | Twitch Helix API integration and live-notification tracker | ✅ Complete |
| 4 | Twitter/X RSS polling via Nitter and tweet-notification tracker | ✅ Complete |
| 5 | VTuber Reddit RSS news aggregator with optional AI summary | ✅ Complete |
| 6 | Discord slash command layer (`/track`, `/untrack`, `/list`) | ✅ Complete |
| 7 | Scheduler and cron-job orchestration | ✅ Complete |
| 8 | Docker Compose packaging for local development | ✅ Complete |
| 9 | Documentation and public release | ✅ Complete |
| 10 | Extended testing, bug hardening, and community feedback | 🔄 Ongoing |

### 1.2 Current Status

The project is in a **fully working prototype** state. All core features are operational end-to-end:

- Twitch live-stream notifications function correctly using the Twitch Helix API.
- Twitter/X update polling functions using publicly available Nitter RSS endpoints.
- VTuber news aggregation polls Reddit RSS feeds and optionally enriches each digest with a GPT-3.5-turbo AI summary.
- All three data sources are controlled through a unified Discord slash command interface.
- PostgreSQL persistence ensures that subscriptions survive bot restarts and that duplicate notifications are never sent.
- Docker Compose is provided so any developer can spin up a local Postgres 15 instance with a single command.

The codebase has been linted with ESLint, compiled with TypeScript strict mode, and manual end-to-end tests have been performed against live Discord servers. The remaining work is primarily additional automated tests, more notification format polish, and community-requested feature additions.

---

## 2. Modular Architecture

### 2.1 High-Level Module Map

streamerStalker is organized around a clear separation of concerns, with five top-level functional layers:

```
streamerStalker/
├── src/
│   ├── bot.ts              ← Entry point / orchestrator
│   ├── commands/           ← Discord slash command handlers
│   ├── scheduler/          ← Cron-job scheduling
│   ├── services/           ← External API adapters (pure I/O)
│   ├── trackers/           ← Business logic (DB + service + Discord output)
│   └── utils/              ← Shared utilities
└── migrations/             ← Database schema
```

### 2.2 Module Descriptions

#### 2.2.1 `src/bot.ts` — Entry Point / Orchestrator

**Responsibility:** Bootstrap the Discord client, connect to PostgreSQL, register slash commands via the Discord REST API, bind the `interactionCreate` event, and start the scheduler.

This module is intentionally thin: it wires together all other modules but contains no business logic of its own. Keeping orchestration separate from logic means the entry point can be replaced or mocked without touching any feature code.

#### 2.2.2 `src/commands/` — Discord Slash Command Handlers

**Responsibility:** Parse user input from Discord interactions and write subscription records to the database. Three commands are registered:

- **`track.ts`** — Inserts a new tracking subscription row into either `tracked_streamers` (Twitch) or `server_subscriptions` (Twitter/VTuber) using `ON CONFLICT DO NOTHING` to prevent duplicates.
- **`untrack.ts`** — Deletes the corresponding row and replies with feedback indicating whether the item was found.
- **`list.ts`** — Queries both tables for the current guild, formats results into a Discord `EmbedBuilder`, and replies.

Each command module exports a `{ data, execute }` object matching the `Command` interface in `bot.ts`. This makes the command system trivially extensible — adding a new command requires only creating a new file and registering it in `bot.ts`.

#### 2.2.3 `src/scheduler/jobs.ts` — Cron-Job Orchestration

**Responsibility:** Define and start the three recurring polling jobs using `node-cron`.

| Job | Interval | Tracker Called |
|-----|----------|----------------|
| Twitch live-stream check | Every 1 minute | `checkTwitchStreams` |
| Twitter update check | Every 3 minutes | `checkTwitterUpdates` |
| VTuber news check | Every 30 minutes | `checkVtuberNews` |

The scheduler module has no knowledge of how polling works internally. It simply owns the schedule and delegates to the tracker layer. This means changing a polling interval or adding a new data source requires editing only this single file.

#### 2.2.4 `src/services/` — External API Adapters

These modules are pure input/output adapters that hide all external API details behind a clean TypeScript interface. They contain no database access and no Discord logic.

- **`twitch.ts`** — Manages Twitch OAuth2 client-credentials token lifecycle (refresh with a 60-second buffer) and calls the Twitch Helix `/streams` endpoint. Returns a `Map<username, StreamInfo>` that includes live status, title, game, viewer count, thumbnail URL, and stream URL. Offline entries are synthesized for any username not returned by the API.

- **`twitter.ts`** — Fetches the Nitter RSS feed for a given username from a list of fallback Nitter instances. Parses the XML using regex to extract tweet ID, text, URL, and publication timestamp. Returns an array of `Tweet` objects. Falls back gracefully through alternative Nitter instances if any are unreachable.

- **`aiSummary.ts`** — Wraps the OpenAI Chat Completions API using `gpt-3.5-turbo`. Accepts a list of article titles and sources, constructs a concise summarization prompt, and returns a 2–3 sentence plain-text summary. Returns `null` if the `OPENAI_API_KEY` environment variable is absent, making the feature fully optional.

#### 2.2.5 `src/trackers/` — Business Logic Layer

Trackers sit between the scheduler (orchestration) and the services (I/O). They are responsible for:

1. Querying the database for subscriptions.
2. Calling the appropriate service to get fresh data.
3. Comparing new data against cached/persisted state.
4. Writing updated state back to the database.
5. Sending Discord embed notifications via the bot client.

- **`twitchTracker.ts`** — Fetches all uniquely tracked Twitch usernames from the DB, calls `getStreamStatus`, and for each guild subscription checks whether the live status changed from `false → true`. Sends a live-notification embed only on that transition, preventing repeated pings.

- **`twitterTracker.ts`** — Fetches all tracked Twitter accounts, calls `getLatestTweets` for each, checks against the `tweet_cache` table, stores new tweet IDs, and sends a tweet embed per guild subscription. A 1-second inter-account delay prevents rapid-fire requests to Nitter.

- **`vtuberNews.ts`** — Fetches RSS from both Reddit sources, stores new articles in `news_articles`, optionally calls `summarizeNews`, then for each subscriber guild filters articles to those mentioning the guild's tracked VTuber names and sends a combined news embed.

#### 2.2.6 `src/utils/html.ts` — Shared Utilities

**Responsibility:** Decode HTML entities (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`) found in RSS/XML content. Uses a single-pass regex replacement to avoid any risk of double-unescaping.

#### 2.2.7 `migrations/001_initial.sql` — Database Schema

Four tables define the persistence layer:

| Table | Purpose |
|-------|---------|
| `tracked_streamers` | Twitch subscriptions per guild/channel |
| `tweet_cache` | Deduplication cache for posted tweets |
| `news_articles` | Deduplication cache for posted VTuber news articles |
| `server_subscriptions` | Twitter and VTuber subscriptions per guild/channel |

Unique constraints (`UNIQUE(guild_id, platform, username)` etc.) ensure the application layer can safely use `ON CONFLICT DO NOTHING` rather than manually checking for duplicates.

### 2.3 Modularity Benefits

The layered architecture provides several concrete benefits:

- **Testability:** Each service can be unit-tested in isolation by mocking its HTTP client. Each tracker can be tested by mocking both the service and the database pool.
- **Replaceability:** If Twitter changes its RSS structure, only `twitter.ts` needs to change. If a different scheduling library is preferred, only `jobs.ts` changes.
- **Scalability:** Adding a new platform (e.g., YouTube live-stream polling) means adding one service file, one tracker file, updating the scheduler, and optionally adding a new command subcommand — all other modules remain untouched.

---

## 3. Design Choices

### 3.1 Programming Language — TypeScript over JavaScript

**Why TypeScript?**  
TypeScript was chosen over plain JavaScript for three reasons:

1. **Type safety at the API boundary.** The `StreamInfo` and `Tweet` interfaces make it immediately clear what shape of data each service returns, preventing entire classes of runtime errors (e.g., accessing a non-existent property on an API response object).
2. **Tooling.** TypeScript provides excellent IDE autocomplete and inline documentation, which materially speeds up development when working with large third-party libraries like `discord.js` and `pg` that provide detailed type definitions.
3. **Maintainability.** TypeScript enforces contracts between modules via the `Command` interface in `bot.ts`, ensuring that any new command module will be caught at compile time if it is missing the required `data` or `execute` fields.

Python was briefly considered because of its rich ecosystem of Discord libraries (e.g., `discord.py`). It was ruled out because the Node.js ecosystem offers superior real-time event-loop performance for a bot that maintains a persistent WebSocket connection and runs multiple background cron jobs concurrently.

### 3.2 Runtime — Node.js

Node.js was chosen because:
- `discord.js`, the gold-standard Discord bot library, is a Node.js library.
- Node's single-threaded, non-blocking I/O model is well-suited to a workload that is almost entirely I/O-bound (API calls, database queries, Discord WebSocket events).
- npm's ecosystem provides first-class packages for every integration needed: `pg`, `node-cron`, `axios`, `openai`, `dotenv`.

### 3.3 Database — PostgreSQL over SQLite or in-memory storage

PostgreSQL was selected over lighter alternatives:

- **SQLite** would work for single-instance deployments but lacks `ON CONFLICT DO NOTHING` syntax in older versions, has weaker type guarantees, and becomes a bottleneck if the bot is ever scaled horizontally.
- **In-memory storage** (plain JavaScript objects) would be fast but does not survive process restarts, meaning all subscriptions would be lost every time the bot is updated or crashes.
- **PostgreSQL** provides ACID guarantees, excellent `node-postgres` (`pg`) support, and the full suite of constraint features (`UNIQUE`, `SERIAL`, `TIMESTAMP DEFAULT NOW()`) that the schema relies on.

### 3.4 HTTP Client — Axios

Axios was selected over the native Node.js `https` module and `node-fetch` because:
- It provides a clean promise-based API with concise configuration for headers and query parameters.
- It handles request timeouts (used in RSS fetching) with a simple `timeout` option.
- It automatically parses JSON responses and throws on non-2xx status codes by default.
- It is a widely adopted, well-maintained library with excellent TypeScript types.

### 3.5 Scheduler — node-cron

`node-cron` was selected over `setInterval` and over more complex task-queue solutions (e.g., Bull, Agenda) because:
- The polling jobs have simple, fixed intervals with no inter-job dependencies.
- Cron syntax is well-understood and makes intervals immediately readable.
- The library is lightweight with zero external process dependencies (unlike Bull, which requires Redis).

### 3.6 Twitter Data — Nitter RSS instead of the Official Twitter API

The official Twitter/X API v2 free tier was deemed unsuitable because:
- Free-tier access is read-only and limited to 500,000 tweet reads per month — insufficient for polling multiple accounts every 3 minutes (figures as of late 2024; verify against the current [Twitter API pricing page](https://developer.twitter.com/en/portal/products) as these limits are subject to change).
- Paid access (Basic tier) costs $100/month as of late 2024, creating an unreasonable barrier for a free, open-source bot.

Nitter provides public RSS feeds of any Twitter user's timeline without authentication. The bot falls back through a list of known Nitter instances, making it resilient to any single instance going offline. The trade-off is that Nitter instance availability is not guaranteed long-term, which is documented as a known limitation.

### 3.7 Docker Compose for Local Development

Docker Compose is provided to eliminate the "works on my machine" problem. Running `docker-compose up -d` starts a Postgres 15 container with the correct credentials pre-configured, allowing any contributor to start developing immediately without installing or configuring a local database server.

---

## 4. Prior Art and Innovation

### 4.1 Existing Solutions Considered

A thorough survey of existing solutions was performed before beginning development:

#### 4.1.1 Generic Discord Notification Bots

- **Streamcord** — A popular Twitch-to-Discord notification bot. It supports Twitch live notifications but has no Twitter or VTuber news features. It requires inviting a third-party bot (privacy concern) and offers no self-hosted option.
- **MonitoRSS** — A general-purpose RSS-to-Discord bot. It can be configured to post Reddit RSS feeds. However, it is purely RSS-driven with no platform-specific integrations: it cannot leverage the Twitch Helix API's structured data (viewer count, game, thumbnail) that makes live-stream notifications especially useful. Configuration is complex, requiring per-feed channel mappings.
- **TweetShift / tweetcord** — Bots that post Twitter/X updates to Discord. Most have been deprecated or neutered since the 2023 Twitter API pricing changes. They also offer no Twitch or VTuber integration.

#### 4.1.2 Self-Hosted Projects

Several open-source Discord bots exist for individual platform notifications:
- `discord-twitch-bot` (GitHub) — Twitch-only notifications using webhooks. Single-platform, no RSS or AI features.
- Various Reddit RSS Discord scripts — Single-purpose, require separate instances per server, lack per-guild subscription management.

#### 4.1.3 All-in-One Monitoring Platforms

- **Zapier / Make (formerly Integromat)** — No-code automation tools that can connect Twitch, Twitter, and Discord. These require paid subscriptions for polling intervals shorter than 15 minutes, lack real-time Discord embed formatting, and are hosted services with no self-hosting option.
- **n8n** — An open-source workflow automation tool. Could theoretically replicate the bot's functionality but requires significant workflow configuration, is not purpose-built for Discord, and its complexity is ill-suited to community members who simply want a Discord slash command.

### 4.2 How streamerStalker Improves Upon Prior Art

| Feature | Streamcord | MonitoRSS | TweetShift | streamerStalker |
|---------|-----------|-----------|------------|-----------------|
| Twitch live notifications | ✅ | ⚠️ (RSS only) | ❌ | ✅ (Helix API, rich embeds) |
| Twitter/X updates | ❌ | ⚠️ (RSS only) | ✅ (deprecated) | ✅ (Nitter RSS, no API key) |
| VTuber news | ❌ | ⚠️ (manual config) | ❌ | ✅ (automated, filtered) |
| AI news summary | ❌ | ❌ | ❌ | ✅ (optional OpenAI) |
| Self-hostable | ❌ | ✅ | ❌ | ✅ |
| Per-guild isolation | ✅ | ✅ | ✅ | ✅ |
| Unified slash command UI | ⚠️ | ❌ | ⚠️ | ✅ |
| No Twitter API key needed | N/A | N/A | ❌ | ✅ |

Key innovations relative to prior art:

1. **Multi-platform unification.** No existing self-hosted bot unifies Twitch, Twitter, and VTuber community news under a single Discord slash command interface. Users previously needed to install and configure three separate bots.

2. **Nitter-based Twitter polling.** By using Nitter RSS instead of the paid Twitter API, streamerStalker makes Twitter tracking free and accessible to anyone running a self-hosted instance, something none of the commercial alternatives achieve post-2023.

3. **VTuber-name filtering.** Rather than blindly posting all Reddit posts from r/Hololive, the bot filters by names each guild is actively tracking. This prevents notification spam and ensures communities only see content relevant to their interests.

4. **Integrated AI summarization.** The optional GPT-3.5-turbo news summary gives communities a quick digest of the day's VTuber news in 2–3 sentences, a feature absent from every prior solution.

5. **Privacy-conscious design.** No raw message content or user data is ever sent to the AI model — only article titles and source names. This is an explicit design decision that differentiates the project from solutions that pass full message histories to LLMs.

---

## 5. Solution Description

### 5.1 What the Project Tries to Achieve

streamerStalker solves the problem of content-creator communities needing to monitor multiple platforms to stay updated on their favorite streamers and VTubers. It centralizes real-time notifications from Twitch, Twitter/X, and community news feeds into a Discord server, eliminating the need for community members to check multiple websites or install browser extensions.

### 5.2 How It Achieves This

The bot operates on three core mechanisms:

1. **Subscription management** via Discord slash commands (`/track`, `/untrack`, `/list`) that persist guild-specific subscriptions to a PostgreSQL database.
2. **Scheduled polling** via `node-cron` jobs that query the database for active subscriptions and fetch fresh data from external sources on configurable intervals.
3. **Rich notification delivery** via Discord's `EmbedBuilder` API, posting formatted cards with platform-specific data (thumbnails, viewer counts, AI summaries) to the subscribed guild channels.

### 5.3 Summary in Four Sentences

streamerStalker is a self-hosted Discord bot that tracks Twitch live streams, Twitter/X posts, and VTuber community news on behalf of any Discord server. Server administrators use three slash commands to tell the bot which content creators to monitor and in which channel to post notifications. A background scheduler continuously polls the Twitch Helix API, Nitter RSS feeds, and Reddit RSS feeds, then sends richly formatted embed cards to Discord whenever new content is detected. An optional OpenAI integration can also generate a brief AI-written summary of the latest VTuber news headlines, giving communities a concise daily digest.

---

## 6. Final Project Scope

### 6.1 Elevator Pitch (3 sentences)

streamerStalker is a single Discord bot that replaces three separate notification tools — Twitch alerts, Twitter monitors, and news scrapers — with one unified slash command interface. It keeps fan communities informed in real time without requiring any member to leave Discord or manually check external platforms. With optional AI-powered news summaries and full self-hosting support, it empowers community managers to build richer, more connected spaces around the creators they follow.

### 6.2 Comprehensive Problem Description (6 sentences)

Modern content creators are active across many platforms simultaneously: they stream on Twitch, tweet reactions on Twitter/X, and generate community discussion on Reddit and fan forums. Discord has become the dominant community hub for these audiences, but Discord itself has no built-in mechanism to surface activity from external platforms. Community managers currently solve this through a patchwork of separate bots — a Twitch notification bot, a Twitter-to-Discord relay, a Reddit RSS poster — each with its own configuration interface, permission model, and failure mode, creating significant administrative overhead. The problem is compounded by the collapse of free Twitter API access in 2023, which deprecated most existing Twitter-to-Discord integrations and left communities without a straightforward, cost-free alternative. VTuber communities face an additional layer of complexity: their fan bases typically track dozens of talents simultaneously, and un-filtered Reddit news feeds produce unmanageable volumes of posts, most of which are irrelevant to any given server's interests. Finally, even for communities that successfully configure multiple bots, the user experience is fragmented — different commands, different embed formats, and no cohesive view of "what is my server currently tracking" — making it difficult to onboard new community members to the notification setup.

### 6.3 Edge Cases and Practical Challenges Addressed

- **Duplicate notifications.** The `tweet_cache` and `news_articles` tables prevent the same tweet or news article from ever being posted twice, even if the bot restarts mid-cycle.
- **Streamer going live mid-check.** The `last_live_status` column in `tracked_streamers` ensures notifications are only sent on the offline→live transition, not on every polling cycle while a streamer is live.
- **Nitter instance failure.** The Twitter service falls back through a list of Nitter instances, so temporary downtime of any single mirror does not break Twitter tracking.
- **No OpenAI key configured.** The AI summary feature is entirely optional and gracefully returns `null` when the environment variable is absent, without affecting any other functionality.
- **Multiple guilds tracking the same streamer.** The schema records subscriptions per guild, so one guild's tracking decisions are completely independent of another's. The tracker fetches all unique usernames in a single Twitch API call to avoid redundant requests.
- **HTML entities in RSS content.** Article titles and tweet text fetched from RSS feeds frequently contain HTML entities. The `utils/html.ts` module decodes these before displaying them in Discord embeds, preventing garbled text like `&amp;` appearing in notifications.

---

## 7. Resources and Time Estimates

### 7.1 Development Time Invested

| Component | Estimated Time |
|-----------|---------------|
| Requirements analysis and technology selection | 2 hours |
| Database schema design | 1 hour |
| Discord bot bootstrap and slash command registration | 2 hours |
| Twitch Helix API integration (`services/twitch.ts`) | 3 hours |
| Twitch tracker and live-notification logic (`trackers/twitchTracker.ts`) | 2 hours |
| Twitter Nitter RSS integration (`services/twitter.ts`) | 3 hours |
| Twitter tracker (`trackers/twitterTracker.ts`) | 1.5 hours |
| VTuber news RSS fetching and filtering (`trackers/vtuberNews.ts`) | 3 hours |
| OpenAI integration (`services/aiSummary.ts`) | 1 hour |
| Scheduler setup (`scheduler/jobs.ts`) | 0.5 hours |
| Utility functions and HTML entity decoding | 0.5 hours |
| Docker Compose and environment configuration | 1 hour |
| Documentation (README, this paper) | 4 hours |
| Manual end-to-end testing | 3 hours |
| **Total** | **~27.5 hours** |

### 7.2 External Resource Requirements

| Resource | Cost | Notes |
|----------|------|-------|
| Discord bot token | Free | Requires a Discord developer account |
| Twitch Client ID + Secret | Free | Requires a Twitch developer account |
| OpenAI API key | Optional / Pay-per-use | ~$0.002 per news summary (gpt-3.5-turbo) — negligible at typical usage |
| PostgreSQL instance | Free (self-hosted) or ~$5–15/month (managed) | Docker Compose provided for local dev |
| Node.js hosting | Free tier available (Railway, Render, Fly.io) | ~256 MB RAM, minimal CPU |
| Nitter RSS access | Free | Public mirrors; no API key required |
| Reddit RSS access | Free | Public endpoint; no authentication required |

### 7.3 Time Estimate for a Production-Ready, Bug-Free Release

To reach a fully hardened, production-ready state (automated test suite, rate-limit handling, monitoring, CI/CD), the following additional work is estimated:

| Work Item | Estimate |
|-----------|---------|
| Unit test suite (mocked services and DB) | 6 hours |
| Integration tests with a test Discord server | 4 hours |
| Rate-limit handling for Twitch API (429 responses) | 2 hours |
| Retry logic with exponential backoff for all external HTTP calls | 3 hours |
| Observability: structured logging (e.g., Winston) and uptime monitoring | 3 hours |
| GitHub Actions CI pipeline (lint + build + test on PR) | 2 hours |
| Admin permission guard on `/track` and `/untrack` commands | 1.5 hours |
| `/status` command showing bot health, scheduler uptime, and last-check times | 2 hours |
| Multi-region failover for Nitter instances (larger curated list) | 1 hour |
| **Total additional** | **~24.5 hours** |

**Overall estimate to production-ready state:** approximately 50 person-hours from initial concept to hardened release.

### 7.4 Infrastructure Scalability

The current architecture comfortably supports hundreds of Discord guilds on a single Node.js process. Each Twitch polling cycle batches all usernames into one API call; Twitter and VTuber polling are guild-independent. If the bot scaled to thousands of guilds, horizontal scaling would require:

- Sharding the Discord client (built into `discord.js` via `ShardingManager`).
- Moving cron jobs into a separate worker process or a distributed task queue (e.g., Bull + Redis) to avoid duplicate polling across shards.
- Scaling PostgreSQL connections via PgBouncer.

None of these changes require architectural redesign — the current modular structure makes each adaptation a localized change.

---

## Conclusion

streamerStalker successfully unifies Twitch, Twitter/X, and VTuber community news monitoring under a single, self-hosted Discord bot with a clean slash command interface. The project demonstrates thoughtful planning through its phased development schedule and clear module boundaries, innovative design through its free-of-cost Twitter integration and AI-powered news digests, and an awareness of prior art through deliberate feature differentiation from existing bots. The estimated 27.5 hours of development work have produced a fully functional prototype, with approximately 24.5 additional hours of effort required to reach a fully hardened, production-grade release. The modular architecture ensures that future enhancements — new platforms, improved AI features, or horizontal scaling — can be made with minimal disruption to the existing codebase.
