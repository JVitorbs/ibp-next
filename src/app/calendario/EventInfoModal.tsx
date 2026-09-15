import React, { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Card } from '@/components/ui/card';
import { getEventColor } from './utils';

interface EventInfoModalProps {
  open: boolean;
  onClose: () => void;
  selectedDate: string | null;
  selectedEvents: any[];
}

const EventInfoModal: React.FC<EventInfoModalProps> = ({ open, onClose, selectedDate, selectedEvents }) => {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const formatSelectedDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);

    if (!year || !month || !day) return date;

    return new Date(year, month - 1, day).toLocaleDateString('pt-BR');
  };

  return (
    <Dialog.Root open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          data-testid="calendar-modal-overlay"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none">
          <Card className="relative w-full max-w-md px-6 py-4 rounded-2xl shadow-2xl bg-background flex flex-col items-center">
            <Dialog.Close
              className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
              aria-label="Fechar"
            >
              <span aria-hidden="true">×</span>
            </Dialog.Close>
            <Dialog.Title className="w-full mt-2 text-center font-bold text-lg">
              Programações do dia
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Lista de programações da igreja na data selecionada.
            </Dialog.Description>
        <div className="text-center text-muted-foreground mb-2">
          {selectedDate && (
            <span>{formatSelectedDate(selectedDate)}</span>
          )}
        </div>
        <div className="pt-2 w-full">
          {selectedEvents.length > 0 ? (
            <ul className="space-y-2">
              {selectedEvents.map((ev, idx) => (
                <li key={idx} className="border-b pb-2 flex items-start gap-2">
                  {/* Dot/bar colorido igual ao calendário */}
                  <span
                    className="inline-block mt-1 w-3 h-3 rounded-full shrink-0"
                    style={{ background: getEventColor(ev) }}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{ev.title}</div>
                    {('extendedProps' in ev && ev.extendedProps?.horario) && (
                      <div className="text-sm text-muted-foreground">Horário: {ev.extendedProps.horario}</div>
                    )}
                    {('startTime' in ev && ev.startTime) && (
                      <div className="text-sm text-muted-foreground">Horário: {ev.startTime}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground">Nenhuma programação para este dia.</div>
          )}
        </div>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EventInfoModal;
