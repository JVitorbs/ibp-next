import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('Footer', () => {
  it('renders footer links', () => {
    render(<Footer />);
    expect(screen.getByText('Início')).toBeTruthy();
    expect(screen.getByText('Sobre')).toBeTruthy();
    expect(screen.getByText('Missão')).toBeTruthy();
    expect(screen.getAllByText('Contato').length).toBeGreaterThanOrEqual(1);
  });

  it('renders branding section', () => {
    render(<Footer />);
    expect(screen.getAllByText(/Igreja Batista do Pirangi/).length).toBeGreaterThanOrEqual(1);
  });
});
