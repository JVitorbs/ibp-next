import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

describe('HeroSection', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders welcome text', () => {
    render(<HeroSection />);
    expect(screen.getByText('Bem-vindo à Nossa Comunidade')).toBeTruthy();
  });

  it('renders logo', () => {
    render(<HeroSection />);
    const logo = screen.getByAltText('Logo Igreja Batista do Pirangi');
    expect(logo).toBeTruthy();
  });

  it('renders scroll down link', () => {
    const { container } = render(<HeroSection />);
    const links = container.querySelectorAll('a');
    const scrollLink = Array.from(links).find(l => l.getAttribute('href') === '/#sobre');
    expect(scrollLink).toBeTruthy();
  });
});
