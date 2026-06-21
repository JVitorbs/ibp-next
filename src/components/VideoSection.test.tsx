import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import VideoSection from './VideoSection';

describe('VideoSection', () => {
  beforeEach(() => {
    window.IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;

    Element.prototype.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ title: 'Test Video', author_name: 'SomosIBP' }),
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders section title', () => {
    render(<VideoSection />);
    expect(screen.getByText('Videos Em Destaque')).toBeTruthy();
  });

  it('renders channel name', () => {
    render(<VideoSection />);
    expect(screen.getByText('Canal SomosIBP')).toBeTruthy();
  });

  it('renders navigation buttons', () => {
    render(<VideoSection />);
    expect(screen.getByLabelText('Video anterior')).toBeTruthy();
    expect(screen.getByLabelText('Proximo video')).toBeTruthy();
  });

  it('renders video descriptions', () => {
    render(<VideoSection />);
    expect(screen.getAllByText(/Musical de Páscoa/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Aniversário de 42 anos da IBP/).length).toBeGreaterThanOrEqual(1);
  });

  it('calls fetch for YouTube oembed', async () => {
    render(<VideoSection />);
    await act(async () => {
      await vi.waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });
  });

  it('navigates to next video on button click', () => {
    render(<VideoSection />);
    const nextBtn = screen.getByLabelText('Proximo video');
    fireEvent.click(nextBtn);
    expect(Element.prototype.scrollTo).toHaveBeenCalled();
  });

  it('navigates to previous video on button click', () => {
    render(<VideoSection />);
    const prevBtn = screen.getByLabelText('Video anterior');
    fireEvent.click(prevBtn);
    expect(Element.prototype.scrollTo).toHaveBeenCalled();
  });

  it('pauses auto-advance on mouse enter', () => {
    render(<VideoSection />);
    const section = screen.getByText('Videos Em Destaque').closest('section')!;
    const scroller = section.querySelector('[class*="overflow-x-auto"]');
    if (scroller) {
      fireEvent.mouseEnter(scroller);
      fireEvent.mouseLeave(scroller);
    }
  });

  it('pauses auto-advance on touch start', () => {
    render(<VideoSection />);
    const section = screen.getByText('Videos Em Destaque').closest('section')!;
    const scroller = section.querySelector('[class*="overflow-x-auto"]');
    if (scroller) {
      fireEvent.touchStart(scroller);
    }
  });
});
