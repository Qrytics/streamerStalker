# Changelog

All notable changes to **streamerStalker** are documented here.  
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- MIT `LICENSE` file
- `SECURITY.md` covering API-key and data-storage risks
- `CHANGELOG.md` (this file) for development history and credits
- GitHub Actions CI workflow (lint → build → test on every push and pull request)
- GitHub Actions Pages deployment workflow (auto-publishes `docs/` to GitHub Pages on `main` pushes)
- Landing page (`docs/index.html`) for GitHub Pages
- Jest + ts-jest test infrastructure with unit tests for `twitch`, `twitter`, and `aiSummary` services
- JSDoc comments on all public service and tracker functions

---

## [1.0.0] — 2024-12-01

### Added
- **Phase 1 – Project Bootstrap**  
  Repository created; TypeScript + Node.js project scaffolded with `discord.js` v14, `pg`, `node-cron`, `axios`, and `dotenv`.

- **Phase 2 – Database Schema**  
  PostgreSQL schema with four tables: `tracked_streamers`, `server_subscriptions`, `tweet_cache`, `news_articles`.  
  `docker-compose.yml` added for zero-config local Postgres.

- **Phase 3 – Twitch Integration**  
  `src/services/twitch.ts` — OAuth2 client-credentials flow; cached access token with 60 s refresh buffer.  
  `src/trackers/twitchTracker.ts` — offline → live transition detection; Discord embed with title, game, viewer count, and thumbnail.

- **Phase 4 – Twitter/X Integration**  
  `src/services/twitter.ts` — Nitter RSS polling across multiple fallback instances; no official API key required.  
  `src/trackers/twitterTracker.ts` — de-duplication via `tweet_cache`; per-guild channel routing.

- **Phase 5 – Vtuber News Aggregation**  
  `src/trackers/vtuberNews.ts` — Reddit RSS scraping for r/VirtualYoutubers and r/Hololive; article-level de-duplication; per-guild vtuber name filtering.

- **Phase 6 – OpenAI AI Summary**  
  `src/services/aiSummary.ts` — Optional `gpt-3.5-turbo` digest of up to 5 new articles; lazy-initialised client; privacy-safe (titles only).

- **Phase 7 – Slash Commands**  
  `/track`, `/untrack`, `/list` Discord application commands registered globally via REST on bot startup.

- **Phase 8 – Scheduler**  
  `src/scheduler/jobs.ts` — Three `node-cron` jobs: Twitch every 60 s, Twitter every 3 min, news every 30 min.

- **Phase 9 – Documentation**  
  `README.md` — Comprehensive user, sysadmin, and developer guide (25 KB).  
  `doc/project-survey-paper.md` — Academic-style design rationale and prior-art analysis.

- **Phase 10 – Hardening**  
  HTML entity decoder (`src/utils/html.ts`) using single-pass regex.  
  Multi-instance Nitter fallback for resilience.  
  Per-tracker error boundaries so one failure does not crash the scheduler.

---

## Credits

| Contributor | Role |
|-------------|------|
| **Qrytics** | Project lead, architecture, Twitch & Twitter integrations |
| **Team** | Vtuber news tracker, AI summary, database schema, deployment |

### Third-Party Acknowledgements

- [discord.js](https://discord.js.org/) — Discord bot framework  
- [Nitter](https://github.com/zedeus/nitter) — Privacy-respecting Twitter front-end used for RSS feeds  
- [node-cron](https://github.com/node-cron/node-cron) — Cron-style scheduler for Node.js  
- [OpenAI](https://platform.openai.com/) — AI summary generation  
- [PostgreSQL](https://www.postgresql.org/) — Persistent storage  

---

[Unreleased]: https://github.com/Qrytics/streamerStalker/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Qrytics/streamerStalker/releases/tag/v1.0.0
