import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
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

  it('renders contact section title', () => {
    render(<ContactSection />);
    expect(screen.getByText('Informações de Contato')).toBeTruthy();
  });

  it('renders address card', () => {
    render(<ContactSection />);
    expect(screen.getByText('Endereço')).toBeTruthy();
  });

  it('renders schedule card', () => {
    render(<ContactSection />);
    expect(screen.getByText('Programações Gerais')).toBeTruthy();
  });
});
