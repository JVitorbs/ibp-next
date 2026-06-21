import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutSection from './AboutSection';

describe('AboutSection', () => {
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
    render(<AboutSection />);
    expect(screen.getByText('Sobre Nossa Igreja')).toBeTruthy();
  });

  it('renders history and welcome cards', () => {
    render(<AboutSection />);
    expect(screen.getByText('Nossa História')).toBeTruthy();
    expect(screen.getByText('Bem-vindo')).toBeTruthy();
  });

  it('renders value cards', () => {
    render(<AboutSection />);
    expect(screen.getByText('Amor e Compaixão')).toBeTruthy();
    expect(screen.getByText('Fidelidade à Palavra')).toBeTruthy();
    expect(screen.getByText('Comunidade')).toBeTruthy();
  });
});
