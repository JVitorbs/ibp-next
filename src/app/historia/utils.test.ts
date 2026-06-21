import { describe, it, expect } from 'vitest';
import { getEventColor, getEventIcon } from './utils';

describe('getEventColor', () => {
  it('returns foundation gradient', () => {
    expect(getEventColor('foundation')).toBe('from-blue-500 to-blue-600');
  });

  it('returns milestone gradient', () => {
    expect(getEventColor('milestone')).toBe('from-purple-500 to-purple-600');
  });

  it('returns reform gradient', () => {
    expect(getEventColor('reform')).toBe('from-green-500 to-green-600');
  });

  it('returns achievement gradient', () => {
    expect(getEventColor('achievement')).toBe('from-orange-500 to-orange-600');
  });

  it('returns default for unknown type', () => {
    expect(getEventColor('unknown')).toBe('from-gray-500 to-gray-600');
    expect(getEventColor('')).toBe('from-gray-500 to-gray-600');
  });
});

describe('getEventIcon', () => {
  it('returns foundation icon', () => {
    expect(getEventIcon('foundation')).toBe('🏛️');
  });

  it('returns milestone icon', () => {
    expect(getEventIcon('milestone')).toBe('⭐');
  });

  it('returns reform icon', () => {
    expect(getEventIcon('reform')).toBe('🔨');
  });

  it('returns achievement icon', () => {
    expect(getEventIcon('achievement')).toBe('🎯');
  });

  it('returns default for unknown type', () => {
    expect(getEventIcon('unknown')).toBe('📅');
  });
});
