import axios from 'axios';

/**
 * Cached OAuth2 access token for the Twitch Helix API.
 * Re-fetched automatically when expired.
 */
let accessToken: string | null = null;
/** Unix timestamp (ms) at which the current token expires (with a safety buffer). */
let tokenExpiry: number = 0;

/** Refresh the token this many milliseconds before it formally expires. */
const TOKEN_REFRESH_BUFFER_MS = 60_000;

/**
 * Returns a valid Twitch OAuth2 access token, fetching a new one via the
 * client-credentials flow when the cached token is absent or about to expire.
 *
 * @returns A valid Bearer token string.
 */
async function getAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    },
  });

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000 - TOKEN_REFRESH_BUFFER_MS;
  return accessToken!;
}

/** Shape of stream metadata returned for a single Twitch channel. */
export interface StreamInfo {
  username: string;
  title: string;
  game: string;
  viewerCount: number;
  thumbnailUrl: string;
  streamUrl: string;
  isLive: boolean;
}

/**
 * Queries the Twitch Helix `/streams` endpoint for all given usernames in a
 * single batched request and returns a Map keyed by lowercase username.
 *
 * Streamers not currently live receive an entry with `isLive: false` so
 * callers can detect the offline → live transition without a separate lookup.
 *
 * @param usernames - Lowercase Twitch login names to check.
 * @returns A Map from lowercase username → {@link StreamInfo}.
 */
export async function getStreamStatus(usernames: string[]): Promise<Map<string, StreamInfo>> {
  if (usernames.length === 0) return new Map();

  const token = await getAccessToken();
  const params = new URLSearchParams();
  usernames.forEach(u => params.append('user_login', u));

  const response = await axios.get('https://api.twitch.tv/helix/streams', {
    params,
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID!,
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = new Map<string, StreamInfo>();

  for (const stream of response.data.data) {
    result.set(stream.user_login.toLowerCase(), {
      username: stream.user_login,
      title: stream.title,
      game: stream.game_name,
      viewerCount: stream.viewer_count,
      thumbnailUrl: stream.thumbnail_url.replace('{width}', '320').replace('{height}', '180'),
      streamUrl: `https://twitch.tv/${stream.user_login}`,
      isLive: true,
    });
  }

  // Add offline entries for users not in the response
  for (const username of usernames) {
    if (!result.has(username.toLowerCase())) {
      result.set(username.toLowerCase(), {
        username,
        title: '',
        game: '',
        viewerCount: 0,
        thumbnailUrl: '',
        streamUrl: `https://twitch.tv/${username}`,
        isLive: false,
      });
    }
  }

  return result;
}
