function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function getEventColor(event: { title: string }): string {
  const t = normalize(event.title);
  if (t.includes('ceia do senhor')) return 'var(--event-ceia)';
  if (t.includes('mulheres em missao') || t.startsWith('mm ') || t.includes('mm (')) return 'var(--event-mm)';
  if (t.includes('miss')) return 'var(--event-missoes)';
  if (t.includes('juventude') || t.includes('jovens')) return 'var(--event-juventude)';
  if (t.includes('casais')) return 'var(--event-casais)';
  if (t.includes('culto administrativo')) return 'var(--event-culto-adm)';
  if (t.includes('vigilia') || t.includes('treinamento') || t.includes('pgzao') || t.includes('assembleia') || t.includes('acao evangelistica') || t.includes('encontro de promotores') || t.includes('proclamai') || t.includes('feira') || t.includes('estudo biblico') || t.includes('cha de lencos')) return 'var(--event-geral)';
  if (t.includes('instituto biblico') || t.includes('oracao matutina') || t === 'culto') return 'var(--event-fixo)';
  if (t.includes('dia das maes') || t.includes('dia dos pais') || t.includes('criancas') || t.includes('natal') || t.includes('virada')) return 'var(--event-comemorativo)';
  return 'var(--event-geral)';
}

export { normalize };

export type CalendarEvent = {
  title: string;
  color?: string;
  date?: string;
  start?: string;
  end?: string;
  daysOfWeek?: number[];
  startTime?: string;
  extendedProps?: {
    horario?: string;
  };
};

export function isDateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function toDateKeyFromDate(dateObj: Date) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function normalizeEventText(text?: string) {
  return (text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function isCultoAdministrativoTitle(title?: string) {
  const normalized = normalizeEventText(title);
  return normalized.includes('culto administrativo') || /\bculto\s+adm\b/.test(normalized);
}

export function getEventYears(events: CalendarEvent[]) {
  const years = new Set<number>();

  events.forEach((event) => {
    [event.date, event.start, event.end].forEach((value) => {
      if (!value || !isDateOnly(value)) return;
      years.add(Number(value.slice(0, 4)));
    });
  });

  if (years.size === 0) {
    years.add(new Date().getFullYear());
  }

  return Array.from(years).sort((a, b) => a - b);
}

export function getCultoAdministrativoDates(events: CalendarEvent[]) {
  const blockedDates = new Set<string>();

  events.forEach((event) => {
    if (!isCultoAdministrativoTitle(event.title)) return;

    if (event.date && isDateOnly(event.date)) {
      blockedDates.add(event.date);
      return;
    }

    if (event.start && event.end && isDateOnly(event.start) && isDateOnly(event.end)) {
      const start = new Date(`${event.start}T00:00:00`);
      const end = new Date(`${event.end}T00:00:00`);

      for (const day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
        blockedDates.add(toDateKeyFromDate(day));
      }
      return;
    }

    if (event.start && isDateOnly(event.start)) {
      blockedDates.add(event.start);
    }
  });

  return blockedDates;
}

export function buildInstitutoBiblicoEvents(years: number[], blockedDates: Set<string>): CalendarEvent[] {
  const instituteEvents: CalendarEvent[] = [];

  years.forEach((year) => {
    const firstSunday = new Date(year, 0, 1);
    while (firstSunday.getDay() !== 0) {
      firstSunday.setDate(firstSunday.getDate() + 1);
    }

    for (const day = new Date(firstSunday); day.getFullYear() === year; day.setDate(day.getDate() + 7)) {
      const dateKey = toDateKeyFromDate(day);
      if (blockedDates.has(dateKey)) continue;

      instituteEvents.push({
        title: 'Instituto Bíblico',
        date: dateKey,
      });
    }
  });

  return instituteEvents;
}

export function dateKeyToLocalDate(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function toDateKey(value: string | Date) {
  if (typeof value === 'string' && isDateOnly(value)) {
    return value;
  }

  const dateObj = typeof value === 'string' ? new Date(value) : value;
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function normalizedText(text?: string) {
  return (text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function applyEventConflictRule(events: CalendarEvent[]) {
  const hasCultoAdministrativo = events.some((ev) =>
    normalizedText(ev.title).includes('culto administrativo')
  );

  if (!hasCultoAdministrativo) return events;

  return events.filter((ev) => !normalizedText(ev.title).includes('instituto biblico'));
}

export function formatSelectedDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);

  if (!year || !month || !day) return date;

  return new Date(year, month - 1, day).toLocaleDateString('pt-BR');
}
