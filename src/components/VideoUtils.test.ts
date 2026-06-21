import { describe, it, expect } from 'vitest';
import { getYoutubeVideoId } from './VideoUtils';

describe('getYoutubeVideoId', () => {
  it('extracts id from youtube.com/watch', () => {
    expect(getYoutubeVideoId('https://www.youtube.com/watch?v=A3__ZbP5lsA')).toBe('A3__ZbP5lsA');
  });

  it('extracts id from youtube.com/watch with extra params', () => {
    expect(getYoutubeVideoId('https://www.youtube.com/watch?v=uwHY_HIMDEE&t=486s')).toBe('uwHY_HIMDEE');
  });

  it('extracts id from youtu.be', () => {
    expect(getYoutubeVideoId('https://youtu.be/A3__ZbP5lsA')).toBe('A3__ZbP5lsA');
  });

  it('extracts id from shorts URL', () => {
    expect(getYoutubeVideoId('https://www.youtube.com/shorts/abc123')).toBe('abc123');
  });

  it('extracts id from embed URL', () => {
    expect(getYoutubeVideoId('https://www.youtube.com/embed/xyz789')).toBe('xyz789');
  });

  it('returns null for invalid URLs', () => {
    expect(getYoutubeVideoId('not-a-url')).toBe(null);
  });

  it('returns null for non-youtube URLs', () => {
    expect(getYoutubeVideoId('https://vimeo.com/123')).toBe(null);
  });
});
