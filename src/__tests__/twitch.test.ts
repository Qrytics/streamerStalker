/**
 * Unit tests for src/services/twitch.ts
 *
 * Validates token caching, stream-status parsing, and offline-entry generation
 * without hitting the real Twitch API.  All HTTP calls are intercepted by Jest
 * module mocking of axios.
 */

import axios from 'axios';
import { getStreamStatus } from '../services/twitch';

// ── Mock axios so no real HTTP calls are made ───────────────────────────────
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// ── Helpers ─────────────────────────────────────────────────────────────────
const MOCK_TOKEN_RESPONSE = {
  data: {
    access_token: 'test-access-token',
    expires_in: 3600,
  },
};

const MOCK_STREAMS_RESPONSE = {
  data: {
    data: [
      {
        user_login: 'xqc',
        title: 'Grand Theft Auto V | !prime',
        game_name: 'Grand Theft Auto V',
        viewer_count: 95000,
        thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_xqc-{width}x{height}.jpg',
      },
    ],
  },
};

// ── Reset mocks between tests ───────────────────────────────────────────────
beforeEach(() => {
  jest.clearAllMocks();
  // Reset the cached token between tests so each test controls its own state
  jest.resetModules();
});

describe('getStreamStatus', () => {
  it('returns an empty Map when given an empty username list', async () => {
    const result = await getStreamStatus([]);
    expect(result.size).toBe(0);
    expect(mockedAxios.post).not.toHaveBeenCalled();
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('fetches a token and returns a live StreamInfo for an online streamer', async () => {
    mockedAxios.post.mockResolvedValueOnce(MOCK_TOKEN_RESPONSE);
    mockedAxios.get.mockResolvedValueOnce(MOCK_STREAMS_RESPONSE);

    const result = await getStreamStatus(['xqc']);

    // Token endpoint called once
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://id.twitch.tv/oauth2/token',
      null,
      expect.objectContaining({ params: expect.objectContaining({ grant_type: 'client_credentials' }) }),
    );

    // Helix streams endpoint called once
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.twitch.tv/helix/streams',
      expect.any(Object),
    );

    expect(result.size).toBe(1);
    const info = result.get('xqc');
    expect(info).toBeDefined();
    expect(info!.isLive).toBe(true);
    expect(info!.username).toBe('xqc');
    expect(info!.title).toBe('Grand Theft Auto V | !prime');
    expect(info!.game).toBe('Grand Theft Auto V');
    expect(info!.viewerCount).toBe(95000);
    // Thumbnail dimensions should have been substituted
    expect(info!.thumbnailUrl).toContain('320');
    expect(info!.thumbnailUrl).toContain('180');
    expect(info!.streamUrl).toBe('https://twitch.tv/xqc');
  });

  it('adds an offline entry for a username that is not in the Twitch API response', async () => {
    mockedAxios.post.mockResolvedValueOnce(MOCK_TOKEN_RESPONSE);
    // API returns no live streams for 'offline_streamer'
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });

    const result = await getStreamStatus(['offline_streamer']);

    expect(result.size).toBe(1);
    const info = result.get('offline_streamer');
    expect(info).toBeDefined();
    expect(info!.isLive).toBe(false);
    expect(info!.viewerCount).toBe(0);
  });

  it('returns both live and offline entries when querying multiple streamers', async () => {
    mockedAxios.post.mockResolvedValueOnce(MOCK_TOKEN_RESPONSE);
    mockedAxios.get.mockResolvedValueOnce(MOCK_STREAMS_RESPONSE); // only xqc is live

    const result = await getStreamStatus(['xqc', 'someofflineuser']);

    expect(result.size).toBe(2);
    expect(result.get('xqc')!.isLive).toBe(true);
    expect(result.get('someofflineuser')!.isLive).toBe(false);
  });

  it('propagates an error thrown by the streams endpoint', async () => {
    mockedAxios.post.mockResolvedValueOnce(MOCK_TOKEN_RESPONSE);
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(getStreamStatus(['xqc'])).rejects.toThrow('Network error');
  });
});
