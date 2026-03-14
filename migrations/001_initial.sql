CREATE TABLE IF NOT EXISTS tracked_streamers (
  id SERIAL PRIMARY KEY,
  guild_id VARCHAR(32) NOT NULL,
  channel_id VARCHAR(32) NOT NULL,
  platform VARCHAR(20) NOT NULL,
  username VARCHAR(100) NOT NULL,
  last_live_status BOOLEAN DEFAULT FALSE,
  last_checked TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(guild_id, platform, username)
);

CREATE TABLE IF NOT EXISTS tweet_cache (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  tweet_id VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news_articles (
  id SERIAL PRIMARY KEY,
  source VARCHAR(100) NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS server_subscriptions (
  id SERIAL PRIMARY KEY,
  guild_id VARCHAR(32) NOT NULL,
  channel_id VARCHAR(32) NOT NULL,
  subscription_type VARCHAR(20) NOT NULL,
  target VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(guild_id, subscription_type, target)
);
