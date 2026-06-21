import { describe, it, expect } from 'vitest';
import { clampZoom, clampPan, getTouchDistance, MIN_ZOOM, MAX_ZOOM } from './utils';

describe('clampZoom', () => {
  it('returns MIN_ZOOM for values below', () => {
    expect(clampZoom(0)).toBe(MIN_ZOOM);
    expect(clampZoom(-1)).toBe(MIN_ZOOM);
  });

  it('returns MAX_ZOOM for values above', () => {
    expect(clampZoom(5)).toBe(MAX_ZOOM);
    expect(clampZoom(10)).toBe(MAX_ZOOM);
  });

  it('returns value within range', () => {
    expect(clampZoom(1.5)).toBe(1.5);
    expect(clampZoom(2)).toBe(2);
    expect(clampZoom(2.5)).toBe(2.5);
  });

  it('handles boundary values', () => {
    expect(clampZoom(MIN_ZOOM)).toBe(MIN_ZOOM);
    expect(clampZoom(MAX_ZOOM)).toBe(MAX_ZOOM);
  });
});

describe('clampPan', () => {
  it('returns 0 when zoom is 1', () => {
    expect(clampPan(100, 1)).toBeCloseTo(0);
    expect(clampPan(-100, 1)).toBeCloseTo(0);
  });

  it('limits pan proportionally to zoom', () => {
    // zoom 2: limit = (2-1) * 180 = 180
    expect(clampPan(200, 2)).toBe(180);
    expect(clampPan(-200, 2)).toBe(-180);
    expect(clampPan(100, 2)).toBe(100);
  });

  it('handles higher zoom values', () => {
    // zoom 3: limit = (3-1) * 180 = 360
    expect(clampPan(500, 3)).toBe(360);
    expect(clampPan(200, 3)).toBe(200);
  });
});

describe('getTouchDistance', () => {
  it('calculates euclidean distance', () => {
    const t1 = { clientX: 0, clientY: 0 };
    const t2 = { clientX: 3, clientY: 4 };
    expect(getTouchDistance(t1, t2)).toBe(5);
  });

  it('returns 0 for same point', () => {
    const t = { clientX: 100, clientY: 200 };
    expect(getTouchDistance(t, t)).toBe(0);
  });
});
