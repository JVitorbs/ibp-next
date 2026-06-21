import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/dynamic', () => ({
  default: () => {
    return function MockFullCalendar(props: any) {
      return <div data-testid="fullcalendar">FullCalendar Mock</div>;
    };
  },
}));

describe('CalendarioPage', () => {
  beforeEach(() => {
    window.IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders calendar section titles', async () => {
    const CalendarioPage = (await import('./page')).default;
    render(<CalendarioPage />);
    expect(screen.getByText('Calendário - Mês Atual')).toBeTruthy();
    expect(screen.getByText('Panorama Geral dos Meses')).toBeTruthy();
  });

  it('renders color legend', async () => {
    const CalendarioPage = (await import('./page')).default;
    render(<CalendarioPage />);
    expect(screen.getByText('Ceia do Senhor')).toBeTruthy();
    expect(screen.getByText('Missões')).toBeTruthy();
    expect(screen.getByText('Juventude')).toBeTruthy();
  });
});
