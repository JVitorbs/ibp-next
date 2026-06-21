import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContribuaSection from './ContribuaSection';

describe('ContribuaSection', () => {
  beforeEach(() => {
    window.IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;

    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all contribution cards', () => {
    render(<ContribuaSection />);
    expect(screen.getByText('Dízimos e Ofertas')).toBeTruthy();
    expect(screen.getByText('Missões')).toBeTruthy();
    expect(screen.getByText('Reforma')).toBeTruthy();
  });

  it('renders PIX keys', () => {
    render(<ContribuaSection />);
    expect(screen.getByText('41007436000190')).toBeTruthy();
    expect(screen.getByText('missoesibprn@gmail.com')).toBeTruthy();
    expect(screen.getByText('somosibp@gmail.com')).toBeTruthy();
  });

  it('shows Copiado after clicking copy button', async () => {
    render(<ContribuaSection />);

    const copyButtons = screen.getAllByText('Copiar');
    fireEvent.click(copyButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Copiado')).toBeTruthy();
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('41007436000190');
  });
});
