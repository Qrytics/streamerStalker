/**
 * Unit tests for src/services/aiSummary.ts
 *
 * Validates lazy initialisation, graceful handling of a missing API key,
 * correct prompt construction, and error recovery — without making real
 * calls to the OpenAI API.
 */

import { summarizeNews } from '../services/aiSummary';

// ── Mock the openai module ───────────────────────────────────────────────────
const mockCreate = jest.fn();

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  }));
});

// ── Helpers ─────────────────────────────────────────────────────────────────

const SAMPLE_ARTICLES = [
  { title: 'Hoshimachi Suisei announces new album', source: 'Hololive Reddit' },
  { title: 'Ironmouse breaks SubathonRecord', source: 'VirtualYoutuber Reddit' },
  { title: 'Kizuna AI documentary releases on YouTube', source: 'VirtualYoutuber Reddit' },
];

// ── Tests ───────────────────────────────────────────────────────────────────

describe('summarizeNews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when OPENAI_API_KEY is not set', async () => {
    delete process.env.OPENAI_API_KEY;
    const result = await summarizeNews(SAMPLE_ARTICLES);
    expect(result).toBeNull();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('returns null when the article list is empty, even if a key is present', async () => {
    process.env.OPENAI_API_KEY = 'sk-test-key';
    const result = await summarizeNews([]);
    expect(result).toBeNull();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('calls the OpenAI API and returns the summary text on success', async () => {
    process.env.OPENAI_API_KEY = 'sk-test-key';

    mockCreate.mockResolvedValueOnce({
      choices: [
        { message: { content: 'Exciting vtuber news this week!' } },
      ],
    });

    const result = await summarizeNews(SAMPLE_ARTICLES);

    expect(result).toBe('Exciting vtuber news this week!');
    expect(mockCreate).toHaveBeenCalledTimes(1);

    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.model).toBe('gpt-3.5-turbo');
    expect(callArgs.messages).toHaveLength(2);
    // The user message should contain each article title
    const userContent: string = callArgs.messages[1].content;
    expect(userContent).toContain('Hoshimachi Suisei announces new album');
    expect(userContent).toContain('Ironmouse breaks SubathonRecord');
  });

  it('includes source labels in the prompt sent to OpenAI', async () => {
    process.env.OPENAI_API_KEY = 'sk-test-key';

    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: 'Summary here.' } }],
    });

    await summarizeNews(SAMPLE_ARTICLES);

    const userContent: string = mockCreate.mock.calls[0][0].messages[1].content;
    expect(userContent).toContain('[Hololive Reddit]');
    expect(userContent).toContain('[VirtualYoutuber Reddit]');
  });

  it('returns null and does not throw when the OpenAI API call fails', async () => {
    process.env.OPENAI_API_KEY = 'sk-test-key';
    mockCreate.mockRejectedValueOnce(new Error('API rate limit exceeded'));

    const result = await summarizeNews(SAMPLE_ARTICLES);
    expect(result).toBeNull();
  });

  it('returns null when the API response has no choices', async () => {
    process.env.OPENAI_API_KEY = 'sk-test-key';
    mockCreate.mockResolvedValueOnce({ choices: [] });

    const result = await summarizeNews(SAMPLE_ARTICLES);
    expect(result).toBeNull();
  });
});
