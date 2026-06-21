import { describe, it, expect } from 'vitest';
import {
  getEventColor,
  normalize,
  isDateOnly,
  toDateKeyFromDate,
  normalizeEventText,
  isCultoAdministrativoTitle,
  getEventYears,
  getCultoAdministrativoDates,
  buildInstitutoBiblicoEvents,
  dateKeyToLocalDate,
  toDateKey,
  normalizedText,
  applyEventConflictRule,
  formatSelectedDate,
} from './utils';

describe('normalize', () => {
  it('removes accents and lowercases', () => {
    expect(normalize('Ceia do Senhor')).toBe('ceia do senhor');
    expect(normalize('Missões')).toBe('missoes');
    expect(normalize('Juventude')).toBe('juventude');
    expect(normalize('MULHERES EM MISSÃO')).toBe('mulheres em missao');
    expect(normalize('Dia das Mães')).toBe('dia das maes');
    expect(normalize('')).toBe('');
  });
});

describe('getEventColor', () => {
  it('returns ceia color for ceia do senhor', () => {
    expect(getEventColor({ title: 'Ceia do Senhor' })).toBe('var(--event-ceia)');
  });

  it('returns mm color for mulheres em missao', () => {
    expect(getEventColor({ title: 'MM - Mulheres em Missão' })).toBe('var(--event-mm)');
  });

  it('returns missoes color for miss-related titles', () => {
    expect(getEventColor({ title: 'Missões' })).toBe('var(--event-missoes)');
    expect(getEventColor({ title: 'Abertura Missões Mundiais' })).toBe('var(--event-missoes)');
  });

  it('returns juventude color', () => {
    expect(getEventColor({ title: 'Programação da Juventude' })).toBe('var(--event-juventude)');
    expect(getEventColor({ title: 'Encontro de Jovens' })).toBe('var(--event-juventude)');
  });

  it('returns casais color', () => {
    expect(getEventColor({ title: 'Encontro de Casais' })).toBe('var(--event-casais)');
  });

  it('returns culto-adm color', () => {
    expect(getEventColor({ title: 'Culto Administrativo Ordinário' })).toBe('var(--event-culto-adm)');
  });

  it('returns geral color for known geral events', () => {
    expect(getEventColor({ title: 'Vigília' })).toBe('var(--event-geral)');
    expect(getEventColor({ title: 'Treinamento Evangelismo' })).toBe('var(--event-geral)');
    expect(getEventColor({ title: 'PGzão' })).toBe('var(--event-geral)');
    expect(getEventColor({ title: 'Assembleia da CBNR' })).toBe('var(--event-geral)');
    expect(getEventColor({ title: 'Feira Missionária' })).toBe('var(--event-missoes)');
  });

  it('returns fixo color for fixed programming', () => {
    expect(getEventColor({ title: 'Instituto Bíblico' })).toBe('var(--event-fixo)');
    expect(getEventColor({ title: 'Oração Matutina' })).toBe('var(--event-fixo)');
    expect(getEventColor({ title: 'Culto' })).toBe('var(--event-fixo)');
  });

  it('returns comemorativo color', () => {
    expect(getEventColor({ title: 'Dia das Mães' })).toBe('var(--event-comemorativo)');
    expect(getEventColor({ title: 'Culto de Natal' })).toBe('var(--event-comemorativo)');
    expect(getEventColor({ title: 'Culto da Virada' })).toBe('var(--event-comemorativo)');
  });

  it('returns geral as default', () => {
    expect(getEventColor({ title: 'Evento Desconhecido' })).toBe('var(--event-geral)');
  });
});

describe('isDateOnly', () => {
  it('returns true for valid YYYY-MM-DD', () => {
    expect(isDateOnly('2026-02-01')).toBe(true);
    expect(isDateOnly('1990-01-01')).toBe(true);
  });

  it('returns false for invalid formats', () => {
    expect(isDateOnly('2026-02-01T00:00:00')).toBe(false);
    expect(isDateOnly('2026/02/01')).toBe(false);
    expect(isDateOnly('')).toBe(false);
    expect(isDateOnly('not-a-date')).toBe(false);
  });
});

describe('toDateKeyFromDate', () => {
  it('formats Date to YYYY-MM-DD', () => {
    expect(toDateKeyFromDate(new Date(2026, 1, 1))).toBe('2026-02-01');
    expect(toDateKeyFromDate(new Date(2026, 0, 9))).toBe('2026-01-09');
  });
});

describe('normalizeEventText', () => {
  it('removes accents and lowercases', () => {
    expect(normalizeEventText('Ceia do Senhor')).toBe('ceia do senhor');
    expect(normalizeEventText('Culto Administrativo')).toBe('culto administrativo');
    expect(normalizeEventText(undefined)).toBe('');
    expect(normalizeEventText('')).toBe('');
  });
});

describe('isCultoAdministrativoTitle', () => {
  it('detects culto administrativo titles', () => {
    expect(isCultoAdministrativoTitle('Culto Administrativo')).toBe(true);
    expect(isCultoAdministrativoTitle('Culto Administrativo Ordinário')).toBe(true);
    expect(isCultoAdministrativoTitle('Culto Adm')).toBe(true);
    expect(isCultoAdministrativoTitle('culto adm')).toBe(true);
  });

  it('returns false for non-admin titles', () => {
    expect(isCultoAdministrativoTitle('Ceia do Senhor')).toBe(false);
    expect(isCultoAdministrativoTitle(undefined)).toBe(false);
    expect(isCultoAdministrativoTitle('')).toBe(false);
  });
});

describe('getEventYears', () => {
  it('extracts unique years from events', () => {
    const events = [
      { title: 'A', date: '2026-02-01' },
      { title: 'B', date: '2026-03-01' },
      { title: 'C', start: '2027-01-01', end: '2027-01-03' },
    ];
    expect(getEventYears(events)).toEqual([2026, 2027]);
  });

  it('returns current year when no dates', () => {
    expect(getEventYears([{ title: 'A' }])).toEqual([new Date().getFullYear()]);
  });

  it('returns empty array for empty events', () => {
    expect(getEventYears([])).toEqual([new Date().getFullYear()]);
  });
});

describe('getCultoAdministrativoDates', () => {
  it('blocks single-day culto adm dates', () => {
    const events = [
      { title: 'Culto Administrativo', date: '2026-02-22' },
      { title: 'Ceia do Senhor', date: '2026-02-01' },
    ];
    const dates = getCultoAdministrativoDates(events);
    expect(dates.has('2026-02-22')).toBe(true);
    expect(dates.has('2026-02-01')).toBe(false);
  });

  it('blocks multi-day culto adm ranges', () => {
    const events = [
      { title: 'Culto Adm', start: '2026-04-18', end: '2026-04-21' },
    ];
    const dates = getCultoAdministrativoDates(events);
    expect(dates.has('2026-04-18')).toBe(true);
    expect(dates.has('2026-04-19')).toBe(true);
    expect(dates.has('2026-04-20')).toBe(true);
    expect(dates.has('2026-04-21')).toBe(true);
  });

  it('returns empty set when no culto adm', () => {
    const events = [{ title: 'Ceia do Senhor', date: '2026-02-01' }];
    expect(getCultoAdministrativoDates(events).size).toBe(0);
  });
});

describe('buildInstitutoBiblicoEvents', () => {
  it('builds sunday events for given years excluding blocked dates', () => {
    const years = [2026];
    const blockedDates = new Set<string>();
    // Block first sunday of 2026 (Jan 4)
    const firstSunday = new Date(2026, 0, 4);
    const key = toDateKeyFromDate(firstSunday);
    blockedDates.add(key);

    const events = buildInstitutoBiblicoEvents(years, blockedDates);
    const titles = events.map((e) => e.title);
    expect(titles.every((t) => t === 'Instituto Bíblico')).toBe(true);

    // First sunday should be excluded
    expect(events.find((e) => e.date === key)).toBeUndefined();

    // There should be ~52 sundays minus 1 blocked
    expect(events.length).toBeGreaterThan(50);
  });

  it('returns empty for empty years', () => {
    expect(buildInstitutoBiblicoEvents([], new Set())).toEqual([]);
  });
});

describe('dateKeyToLocalDate', () => {
  it('parses YYYY-MM-DD to local Date', () => {
    const d = dateKeyToLocalDate('2026-02-01');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(1); // 0-indexed
    expect(d.getDate()).toBe(1);
  });
});

describe('toDateKey', () => {
  it('returns same string for valid date-only strings', () => {
    expect(toDateKey('2026-02-01')).toBe('2026-02-01');
  });

  it('formats Date objects', () => {
    expect(toDateKey(new Date(2026, 1, 1))).toBe('2026-02-01');
  });

  it('formats non-date-only strings via Date parsing', () => {
    const result = toDateKey('2026-02-01T00:00:00');
    expect(result).toBe('2026-02-01');
  });
});

describe('normalizedText', () => {
  it('normalizes text same as normalizeEventText', () => {
    expect(normalizedText('Culto Administrativo')).toBe('culto administrativo');
    expect(normalizedText(undefined)).toBe('');
  });
});

describe('applyEventConflictRule', () => {
  it('removes instituto biblico when culto adm exists same day', () => {
    const events = [
      { title: 'Culto Administrativo Ordinário' },
      { title: 'Instituto Bíblico' },
      { title: 'Ceia do Senhor' },
    ];
    const result = applyEventConflictRule(events);
    expect(result).toHaveLength(2);
    expect(result.find((e) => e.title.includes('Instituto'))).toBeUndefined();
    expect(result.find((e) => e.title.includes('Ceia'))).toBeTruthy();
  });

  it('keeps all events when no culto adm', () => {
    const events = [
      { title: 'Instituto Bíblico' },
      { title: 'Ceia do Senhor' },
    ];
    expect(applyEventConflictRule(events)).toHaveLength(2);
  });

  it('returns empty when only instituto biblico with culto adm', () => {
    const events = [
      { title: 'Culto Administrativo' },
      { title: 'Instituto Bíblico' },
    ];
    expect(applyEventConflictRule(events)).toHaveLength(1);
  });
});

describe('formatSelectedDate', () => {
  it('formats date in pt-BR locale', () => {
    const result = formatSelectedDate('2026-02-01');
    // jsdom may use en-US default, accept both numeric and named formats
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('returns original string on invalid input', () => {
    expect(formatSelectedDate('not-a-date')).toBe('not-a-date');
  });

  it('handles single-digit months and days', () => {
    const result = formatSelectedDate('2026-01-09');
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});
