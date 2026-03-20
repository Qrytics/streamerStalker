# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please open a GitHub issue with the
**security** label, or email the maintainers directly. Do **not** include
sensitive credential details in public issues.

---

## Known Security Considerations

### 1. API Keys and Credentials

streamerStalker requires several secrets to operate (Discord bot token, Twitch
OAuth credentials, OpenAI API key, and PostgreSQL credentials). These are
loaded exclusively from environment variables via **dotenv** and are never
hard-coded in source files.

**Risks and mitigations:**

| Risk | Mitigation |
|------|-----------|
| `.env` file committed to version control | `.env` is listed in `.gitignore`; only `.env.example` (no real values) is committed |
| Leaked bot token grants full bot control | Rotate the token immediately via the [Discord Developer Portal](https://discord.com/developers/applications) if exposed |
| Leaked Twitch credentials allow API abuse | Revoke and regenerate via the [Twitch Developer Console](https://dev.twitch.tv/console) |
| Leaked OpenAI key incurs billing charges | Rotate via the [OpenAI platform](https://platform.openai.com/api-keys) and set usage limits |
| PostgreSQL password exposed | Rotate the password and restart the database container; restrict `pg_hba.conf` to localhost only |

**Best practices:**
- Store production secrets in your hosting platform's secret manager (e.g., AWS Secrets Manager, Heroku Config Vars, Railway Variables).
- Never log or print environment variables to console output.
- Restrict the Discord bot token scope to only the required OAuth2 scopes and Gateway intents.

---

### 2. Data Stored in the Database

The bot stores the following user-identifiable data in PostgreSQL:

| Table | Data stored | Purpose |
|-------|-------------|---------|
| `tracked_streamers` | Discord guild ID, channel ID, Twitch username | Notify on stream events |
| `server_subscriptions` | Discord guild ID, channel ID, Twitter/vtuber username | Notify on new content |
| `tweet_cache` | Nitter-derived tweet IDs | De-duplication |
| `news_articles` | Reddit article URLs and titles | De-duplication |

**Guild IDs and channel IDs are Discord snowflakes** — they identify servers and
channels, not individual users. No Discord user IDs or usernames are ever
stored.

**Mitigations:**
- Use PostgreSQL authentication and restrict database access to the bot process only.
- Run the database behind a firewall or within a private Docker network; do not expose port 5432 to the public internet.
- The `docker-compose.yml` binds PostgreSQL to `localhost` by default.

---

### 3. Third-Party RSS Polling (Nitter / Reddit)

The bot fetches public RSS feeds from Nitter instances and Reddit. No
authentication tokens are sent; however:

- Nitter instances may become unavailable or return unexpected content.
  The bot falls back through multiple instances automatically.
- Reddit RSS responses are parsed with a hand-written regex — malformed XML
  cannot execute arbitrary code but could produce garbled output.

---

### 4. AI Summary Feature (OpenAI)

When the `OPENAI_API_KEY` environment variable is set, the bot sends article
**titles and source names only** to the OpenAI API. Raw Discord messages,
usernames, guild names, and channel content are **never** transmitted.

---

### 5. Dependency Security

Run `npm audit` regularly to check for vulnerabilities in third-party packages.
The CI pipeline runs `npm audit --audit-level=high` on every push to flag
high-severity issues automatically.
