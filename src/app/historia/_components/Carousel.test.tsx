import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Carousel } from './Carousel';

vi.mock('embla-carousel-react', () => ({
  default: () => {
    const ref = vi.fn();
    const api = {
      on: vi.fn().mockReturnThis(),
      off: vi.fn().mockReturnThis(),
      scrollNext: vi.fn(),
      scrollPrev: vi.fn(),
      scrollTo: vi.fn(),
      reInit: vi.fn(),
      selectedScrollSnap: () => 0,
      destroy: vi.fn(),
    };
    return [ref, api];
  },
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt || ''} {...props} />,
}));

describe('Carousel', () => {
  const defaultProps = {
    images: ['/img1.jpg', '/img2.jpg', '/img3.jpg'],
    alt: 'historia',
    fallbackBg: 'from-amber-200 to-amber-400',
    fallbackIcon: '📷',
  };

  beforeEach(() => {
    window.Image = class {
      src: string = '';
      constructor() { /* empty */ }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all images', () => {
    const { container } = render(<Carousel {...defaultProps} />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(3);
  });

  it('renders navigation buttons for multiple images', () => {
    render(<Carousel {...defaultProps} />);
    expect(screen.getByLabelText('Imagem anterior')).toBeTruthy();
    expect(screen.getByLabelText('Próxima imagem')).toBeTruthy();
  });

  it('renders dot indicators for multiple images', () => {
    render(<Carousel {...defaultProps} />);
    const dots = screen.getAllByRole('button').filter(b => b.getAttribute('aria-label')?.startsWith('Ir para imagem'));
    expect(dots.length).toBe(3);
  });

  it('does not render navigation for single image', () => {
    render(<Carousel {...defaultProps} images={['/only.jpg']} />);
    expect(screen.queryByLabelText('Imagem anterior')).toBeNull();
    expect(screen.queryByLabelText('Próxima imagem')).toBeNull();
  });

  it('calls scrollNext when next button clicked', () => {
    render(<Carousel {...defaultProps} />);
    const nextBtn = screen.getByLabelText('Próxima imagem');
    fireEvent.click(nextBtn);
  });

  it('calls scrollPrev when previous button clicked', () => {
    render(<Carousel {...defaultProps} />);
    const prevBtn = screen.getByLabelText('Imagem anterior');
    fireEvent.click(prevBtn);
  });

  it('shows fallback on image error', () => {
    const { container } = render(<Carousel {...defaultProps} />);
    const imgs = container.querySelectorAll('img');
    if (imgs[0]) {
      fireEvent.error(imgs[0]);
    }
  });
});
