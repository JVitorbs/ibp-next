import { describe, it, expect } from 'vitest';
import { getInitials, getLinhaHorizontalWidth, getMemberKey } from './utils';

describe('getInitials', () => {
  it('returns initials for full name', () => {
    expect(getInitials('Pr. Diego Sousa')).toBe('PS');
    expect(getInitials('Ana Lúcia')).toBe('AL');
    expect(getInitials('João Vitor')).toBe('JV');
  });

  it('returns single letter for mononym', () => {
    expect(getInitials('Mary')).toBe('M');
    expect(getInitials('Elias')).toBe('E');
  });

  it('returns empty for empty string', () => {
    expect(getInitials('')).toBe('');
    expect(getInitials('   ')).toBe('');
  });

  it('handles names with extra spaces', () => {
    expect(getInitials('  Pr.   Diego   Sousa  ')).toBe('PS');
  });
});

describe('getLinhaHorizontalWidth', () => {
  it('returns min width for 1 item', () => {
    expect(getLinhaHorizontalWidth(1, 140, 420, 120)).toBe('140px');
  });

  it('adds step for each additional item', () => {
    expect(getLinhaHorizontalWidth(2, 140, 420, 120)).toBe('260px');
    expect(getLinhaHorizontalWidth(3, 140, 420, 120)).toBe('380px');
  });

  it('caps at max width', () => {
    expect(getLinhaHorizontalWidth(10, 140, 420, 120)).toBe('420px');
  });

  it('handles zero count as min', () => {
    expect(getLinhaHorizontalWidth(0, 140, 420, 120)).toBe('140px');
  });
});

describe('getMemberKey', () => {
  it('creates unique key from role and name', () => {
    const pessoa = { role: 'Presidente (Pastor Titular)', name: 'Pr. Diego Sousa' };
    expect(getMemberKey(pessoa)).toBe('Presidente (Pastor Titular)-Pr. Diego Sousa');
  });
});
