import axios from 'axios';

let accessToken: string | null = null;
let tokenExpiry: number = 0;

const TOKEN_REFRESH_BUFFER_MS = 60_000;

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

export interface StreamInfo {
  username: string;
  title: string;
  game: string;
  viewerCount: number;
  thumbnailUrl: string;
  streamUrl: string;
  isLive: boolean;
}

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
