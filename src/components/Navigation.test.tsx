import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('Navigation', () => {
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

  it('renders logo image', () => {
    render(<Navigation />);
    const logo = screen.getByAltText('Logo Igreja Batista do Pirangi');
    expect(logo).toBeTruthy();
  });

  it('renders all navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('História')).toBeTruthy();
    expect(screen.getByText('Diretoria')).toBeTruthy();
    expect(screen.getByText('Instituto Bíblico')).toBeTruthy();
    expect(screen.getByText('Pequenos Grupos')).toBeTruthy();
    expect(screen.getByText('Galeria')).toBeTruthy();
    expect(screen.getByText('Contato')).toBeTruthy();
    expect(screen.getByText('Calendário')).toBeTruthy();
  });

  it('renders mobile menu trigger button', () => {
    render(<Navigation />);
    // SheetTrigger renders a button with the hamburger icon inside nav
    const mobileNav = screen.getByText('História').closest('.md\:flex');
    // Desktop nav should be visible; mobile trigger should exist
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
