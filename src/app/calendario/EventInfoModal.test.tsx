import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EventInfoModal from './EventInfoModal';

describe('EventInfoModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <EventInfoModal open={false} onClose={() => {}} selectedDate={null} selectedEvents={[]} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders events when open', () => {
    render(
      <EventInfoModal
        open={true}
        onClose={() => {}}
        selectedDate="2026-02-01"
        selectedEvents={[{ title: 'Ceia do Senhor' }]}
      />
    );
    expect(screen.getByText('Programações do dia')).toBeTruthy();
    expect(screen.getByText('Ceia do Senhor')).toBeTruthy();
  });

  it('shows no events message when list is empty', () => {
    render(
      <EventInfoModal
        open={true}
        onClose={() => {}}
        selectedDate="2026-02-01"
        selectedEvents={[]}
      />
    );
    expect(screen.getByText('Nenhuma programação para este dia.')).toBeTruthy();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <EventInfoModal
        open={true}
        onClose={onClose}
        selectedDate="2026-02-01"
        selectedEvents={[{ title: 'Test' }]}
      />
    );
    const backdrop = document.querySelector('.fixed.inset-0 > .absolute.inset-0');
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows horario from extendedProps', () => {
    render(
      <EventInfoModal
        open={true}
        onClose={() => {}}
        selectedDate="2026-02-13"
        selectedEvents={[{
          title: 'Vigília',
          extendedProps: { horario: '19h às 00h' }
        }]}
      />
    );
    expect(screen.getByText('Horário: 19h às 00h')).toBeTruthy();
  });
});
