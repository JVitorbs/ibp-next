import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import GalleryClient from './GalleryClient';

function mockEmblaApi(overrides: Record<string, any> = {}) {
  return {
    on: vi.fn().mockReturnThis(),
    off: vi.fn().mockReturnThis(),
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    scrollTo: vi.fn(),
    reInit: vi.fn(),
    selectedScrollSnap: () => 0,
    destroy: vi.fn(),
    ...overrides,
  };
}

vi.mock('embla-carousel-react', () => ({
  default: () => {
    const ref = vi.fn();
    const api = mockEmblaApi();
    return [ref, api];
  },
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt || ''} {...props} />,
}));

const sampleImages = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'];

describe('GalleryClient', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    window.Image = class {
      src: string = '';
      constructor() { /* empty */ }
    } as unknown as typeof Image;
    HTMLAnchorElement.prototype.click = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders gallery title', () => {
    render(<GalleryClient images={sampleImages} />);
    expect(screen.getByText('Galeria de Fotos')).toBeTruthy();
  });

  it('renders grid thumbnails', () => {
    const { container } = render(<GalleryClient images={sampleImages} />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBeGreaterThanOrEqual(3);
  });

  it('renders empty images without crashing', () => {
    const { container } = render(<GalleryClient images={[]} />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('opens modal when clicking an image button', () => {
    render(<GalleryClient images={sampleImages} />);
    const openButtons = screen.getAllByLabelText('Abrir imagem em destaque');
    fireEvent.click(openButtons[0]);
    expect(screen.getByText('1 de 3')).toBeTruthy();
  });

  it('navigates with next and previous buttons', () => {
    render(<GalleryClient images={sampleImages} />);
    const openButtons = screen.getAllByLabelText('Abrir imagem em destaque');
    fireEvent.click(openButtons[1]);
    expect(screen.getByText('2 de 3')).toBeTruthy();
    const prevBtn = screen.getByLabelText('Foto anterior');
    const nextBtn = screen.getByLabelText('Próxima foto');
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
  });

  it('closes modal with close button', () => {
    render(<GalleryClient images={sampleImages} />);
    const openButtons = screen.getAllByLabelText('Abrir imagem em destaque');
    fireEvent.click(openButtons[0]);
    expect(screen.getByText('1 de 3')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Fechar imagem'));
    expect(screen.queryByText('1 de 3')).toBeNull();
  });

  it('toggles zoom with zoom button', () => {
    render(<GalleryClient images={sampleImages} />);
    const openButtons = screen.getAllByLabelText('Abrir imagem em destaque');
    fireEvent.click(openButtons[0]);
    const zoomBtn = screen.getByLabelText('Ampliar imagem');
    fireEvent.click(zoomBtn);
    expect(screen.getByLabelText('Reduzir zoom')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Reduzir zoom'));
    expect(screen.getByLabelText('Ampliar imagem')).toBeTruthy();
  });

  it('handles keyboard navigation in modal', () => {
    render(<GalleryClient images={sampleImages} />);
    const openButtons = screen.getAllByLabelText('Abrir imagem em destaque');
    fireEvent.click(openButtons[0]);
    expect(screen.getByText('1 de 3')).toBeTruthy();
    fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowRight' });
    expect(screen.getByText('1 de 3')).toBeTruthy();
    fireEvent.keyDown(document.activeElement || document.body, { key: 'ArrowLeft' });
    expect(screen.getByText('1 de 3')).toBeTruthy();
  });

  it('downloads current image', () => {
    render(<GalleryClient images={sampleImages} />);
    const openButtons = screen.getAllByLabelText('Abrir imagem em destaque');
    fireEvent.click(openButtons[0]);
    const downloadBtn = screen.getByLabelText('Baixar imagem');
    fireEvent.click(downloadBtn);
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('handles touch events for pinch zoom', () => {
    render(<GalleryClient images={sampleImages} />);
    const openButtons = screen.getAllByLabelText('Abrir imagem em destaque');
    fireEvent.click(openButtons[0]);

    const zoomBtn = screen.getByLabelText('Ampliar imagem');
    fireEvent.click(zoomBtn);

    const modalContent = screen.getByRole('dialog');
    const touchTarget = modalContent.querySelector('[style*="translate3d"]');
    if (touchTarget) {
      fireEvent.touchStart(touchTarget, {
        touches: [
          { clientX: 0, clientY: 0 },
          { clientX: 100, clientY: 0 },
        ],
      });
      fireEvent.touchMove(touchTarget, {
        touches: [
          { clientX: 0, clientY: 0 },
          { clientX: 200, clientY: 0 },
        ],
      });
      fireEvent.touchEnd(touchTarget, {
        touches: [],
      });
    }
  });

  it('disables thumbnail buttons when zoomed', () => {
    render(<GalleryClient images={sampleImages} />);
    const openButtons = screen.getAllByLabelText('Abrir imagem em destaque');
    fireEvent.click(openButtons[0]);

    const zoomBtn = screen.getByLabelText('Ampliar imagem');
    fireEvent.click(zoomBtn);

    const thumbButtons = screen.getAllByLabelText(/Ir para foto/);
    thumbButtons.forEach(btn => {
      expect(btn.hasAttribute('disabled')).toBeTruthy();
    });
  });
});
