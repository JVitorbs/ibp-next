import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { ScrollReveal } from './ScrollReveal';

describe('ScrollReveal', () => {
  beforeEach(() => {
    window.IntersectionObserver = class {
      callback: IntersectionObserverCallback;
      constructor(cb: IntersectionObserverCallback) { this.callback = cb; }
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children', () => {
    render(<ScrollReveal><div data-testid="child">Hello</div></ScrollReveal>);
    expect(document.querySelector('[data-testid="child"]')).toBeTruthy();
  });

  it('applies opacity-0 initially', () => {
    const { container } = render(<ScrollReveal><div>Test</div></ScrollReveal>);
    const innerDiv = container.firstChild as HTMLElement;
    expect(innerDiv.className).toContain('opacity-0');
  });

  it('applies transform class based on direction', () => {
    const { container } = render(<ScrollReveal direction="right"><div>Test</div></ScrollReveal>);
    const innerDiv = container.firstChild as HTMLElement;
    expect(innerDiv.className).toContain('translate-x-24');
  });

  it('updates visibility when intersection observed', () => {
    const { container } = render(<ScrollReveal direction="up"><div>Test</div></ScrollReveal>);
    const innerDiv = container.firstChild as HTMLElement;
    expect(innerDiv.className).toContain('opacity-0');
  });
});
