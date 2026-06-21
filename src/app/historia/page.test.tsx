import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Historia from './page';

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

vi.mock('./_components/Carousel', () => ({
  Carousel: ({ images, alt }: any) => <div data-testid="carousel">{alt}</div>,
}));

describe('Historia', () => {
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

  it('renders page title', () => {
    render(<Historia />);
    expect(screen.getByText('Nossa História')).toBeTruthy();
  });

  it('renders timeline events', () => {
    render(<Historia />);
    expect(screen.getByText('Crescimento e Consolidação')).toBeTruthy();
    expect(screen.getByText('Início da Expansão')).toBeTruthy();
    expect(screen.getByText('30 Anos de História')).toBeTruthy();
  });

  it('renders event years', () => {
    render(<Historia />);
    expect(screen.getByText('1990')).toBeTruthy();
    expect(screen.getByText('2011')).toBeTruthy();
    expect(screen.getByText('2026')).toBeTruthy();
  });

  it('renders carousel for multi-image events', () => {
    render(<Historia />);
    const carousels = screen.getAllByTestId('carousel');
    expect(carousels.length).toBeGreaterThan(0);
  });
});
