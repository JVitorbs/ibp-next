import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MissionSection from './MissionSection';

describe('MissionSection', () => {
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

  it('renders section title', () => {
    render(<MissionSection />);
    expect(screen.getByText('Nossa Missão')).toBeTruthy();
  });

  it('renders mission text', () => {
    render(<MissionSection />);
    expect(screen.getByText(/Alcançar pessoas/)).toBeTruthy();
  });

  it('renders vision and community cards', () => {
    render(<MissionSection />);
    expect(screen.getByText('Nossa Visão')).toBeTruthy();
    expect(screen.getByText('Comunidade')).toBeTruthy();
    expect(screen.getByText('Adoração')).toBeTruthy();
  });
});
