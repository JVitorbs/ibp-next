"use client";
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import { Card } from '@/components/ui/card';
import EventInfoModal from './EventInfoModal';
import { getEventColor } from './utils';
import dynamic from "next/dynamic";
import React, { useEffect, useState, ReactNode, useMemo } from 'react';

type CalendarEvent = {
  title: string;
  color?: string;
  date?: string;
  start?: string;
  end?: string;
  daysOfWeek?: number[];
  startTime?: string;
  extendedProps?: {
    horario?: string;
  };
};

function isDateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function toDateKeyFromDate(dateObj: Date) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function normalizeEventText(text?: string) {
  return (text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function isCultoAdministrativoTitle(title?: string) {
  const normalized = normalizeEventText(title);
  return normalized.includes('culto administrativo') || /\bculto\s+adm\b/.test(normalized);
}

function getEventYears(events: CalendarEvent[]) {
  const years = new Set<number>();

  events.forEach((event) => {
    [event.date, event.start, event.end].forEach((value) => {
      if (!value || !isDateOnly(value)) return;
      years.add(Number(value.slice(0, 4)));
    });
  });

  if (years.size === 0) {
    years.add(new Date().getFullYear());
  }

  return Array.from(years).sort((a, b) => a - b);
}

function getCultoAdministrativoDates(events: CalendarEvent[]) {
  const blockedDates = new Set<string>();

  events.forEach((event) => {
    if (!isCultoAdministrativoTitle(event.title)) return;

    if (event.date && isDateOnly(event.date)) {
      blockedDates.add(event.date);
      return;
    }

    if (event.start && event.end && isDateOnly(event.start) && isDateOnly(event.end)) {
      const start = new Date(`${event.start}T00:00:00`);
      const end = new Date(`${event.end}T00:00:00`);

      for (const day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
        blockedDates.add(toDateKeyFromDate(day));
      }
      return;
    }

    if (event.start && isDateOnly(event.start)) {
      blockedDates.add(event.start);
    }
  });

  return blockedDates;
}

function buildInstitutoBiblicoEvents(years: number[], blockedDates: Set<string>): CalendarEvent[] {
  const instituteEvents: CalendarEvent[] = [];

  years.forEach((year) => {
    const firstSunday = new Date(year, 0, 1);
    while (firstSunday.getDay() !== 0) {
      firstSunday.setDate(firstSunday.getDate() + 1);
    }

    for (const day = new Date(firstSunday); day.getFullYear() === year; day.setDate(day.getDate() + 7)) {
      const dateKey = toDateKeyFromDate(day);
      if (blockedDates.has(dateKey)) continue;

      instituteEvents.push({
        title: 'Instituto Bíblico',
        date: dateKey,
      });
    }
  });

  return instituteEvents;
}

const eventos = [
  // Fevereiro
  { title: 'Ceia do Senhor', date: '2026-02-01' },
  { title: 'Retorno do Instituto', date: '2026-02-08' },
  { title: 'Vigília', date: '2026-02-13', extendedProps: { horario: '19h às 00h' } },
  { title: 'Encontro de Promotores de Missões', date: '2026-02-21' },
  { title: 'Culto Administrativo Ordinário', date: '2026-02-22' },
  { title: 'Treinamento Evangelismo', date: '2026-02-28', extendedProps: { horario: '15h às 18h' } },
  // Março
  { title: 'Abertura Missões Mundiais e Dia da Esposa do Pastor', date: '2026-03-01' },
  { title: 'Semana de Oração por Missões Mundiais', start: '2026-03-02', end: '2026-03-07' },
  { title: 'Evento - Dia das Mulheres (Intercâmbio)', date: '2026-03-14' },
  { title: 'Ceia do Senhor', date: '2026-03-15' },
  { title: 'Ação Evangelística – IBP na Praça', date: '2026-03-28' },
  { title: 'Encerramento da Campanha Missões Mundiais', date: '2026-03-29' },
  // Abril
  { title: 'Musical de Páscoa', date: '2026-04-04' },
  { title: 'Culto da Ressurreição + Ceia do Senhor', date: '2026-04-05', extendedProps: { horario: '08h' } },
  { title: 'Programação da Juventude', date: '2026-04-18' },
  { title: 'Culto Administrativo Ordinário', date: '2026-04-19' },
  { title: 'Proclamai Recife', start: '2026-04-18', end: '2026-04-21' },
  { title: 'Encontro de Casais', date: '2026-04-25' },
  { title: 'Assembleia da CBNR', date: '2026-04-30' },
  // Maio
  { title: 'Assembleia da CBNR', start: '2026-05-01', end: '2026-05-02' },
  { title: 'Ceia do Senhor', date: '2026-05-03' },
  { title: 'Evento – Dia das mães', date: '2026-05-09' },
  { title: 'Congresso da Família IBP', start: '2026-05-22', end: '2026-05-24' },
  { title: 'Acampamento de Promotores de Missões', start: '2026-05-29', end: '2026-05-31' },
  { title: 'Abertura de Missões Estaduais', date: '2026-05-31' },
  // Junho
  { title: 'Semana de Oração Missões Estaduais', start: '2026-06-01', end: '2026-06-06' },
  { title: 'Ceia do Senhor', date: '2026-06-07' },
  { title: 'Encontro de Casais – Jantar dos Namorados', date: '2026-06-13' },
  { title: 'Acampadentro Juventude', date: '2026-06-20' },
  { title: 'Culto Administrativo Ordinário', date: '2026-06-21' },
  { title: 'Encerramento da Campanha', date: '2026-06-28' },
  // Julho
  { title: 'Ceia do Senhor', date: '2026-07-05' },
  { title: 'PGzão', date: '2026-07-08' },
  { title: 'Programação da Juventude', date: '2026-07-18' },
  { title: 'Escola Bíblica de Férias – EBF', date: '2026-07-25' },
  // Agosto
  { title: 'Ceia do Senhor + Dia do Adolescente Batista', date: '2026-08-02' },
  { title: 'Assembleia da ABL', date: '2026-08-08' },
  { title: 'Café da Manhã – Dia dos Pais', date: '2026-08-09' },
  { title: 'Congresso da Juventude', start: '2026-08-14', end: '2026-08-15' },
  { title: 'Culto Administrativo Ordinário', date: '2026-08-23' },
  { title: 'Encontro de Casais', date: '2026-08-30' },
  // Setembro
  { title: 'Entrega de insumos sociais', date: '2026-09-05' },
  { title: 'Conferência de Aniversário da IBP', start: '2026-09-05', end: '2026-09-06' },
  { title: 'Ceia do Senhor', date: '2026-09-13' },
  { title: 'Abertura de Missões Nacionais', date: '2026-09-27' },
  { title: 'Semana de Oração por Missões Nacionais', start: '2026-09-28', end: '2026-10-02' },
  // Outubro
  { title: 'Ceia do Senhor', date: '2026-10-04' },
  { title: 'Evento – Juventude', date: '2026-10-10' },
  { title: 'Festa das Crianças', date: '2026-10-17' },
  { title: 'Culto Administrativo Ordinário', date: '2026-10-18' },
  { title: 'Chá de Lenços', date: '2026-10-24' },
  { title: 'Encerramento da Campanha de Missões', date: '2026-10-25' },
  { title: 'Vigília', date: '2026-10-30' },
  // Novembro
  { title: 'Ceia do Senhor', date: '2026-11-01' },
  { title: 'Encontro de Casais', date: '2026-11-07' },
  { title: 'Feira Missionária local', date: '2026-11-14' },
  { title: 'Estudo Bíblico dos Jovens', date: '2026-11-21' },
  { title: 'Dia de Ação de Graças – PGzão', date: '2026-11-26' },
  // Dezembro
  { title: 'Ceia do Senhor', date: '2026-12-06' },
  { title: 'Confraternização Jovens e Mulheres', date: '2026-12-12' },
  { title: 'Culto Administrativo Ordinário', date: '2026-12-20' },
  { title: 'Culto de Natal', date: '2026-12-25' },
  { title: 'Culto da Virada', date: '2026-12-31' },
];

const eventYears = getEventYears(eventos);
const cultoAdministrativoDates = getCultoAdministrativoDates(eventos);
const institutoBiblicoEvents = buildInstitutoBiblicoEvents(eventYears, cultoAdministrativoDates);

const programacoesFixas = [
  { daysOfWeek: [0], title: 'Culto', startTime: '18:00' },
  { daysOfWeek: [6], title: 'Oração Matutina', startTime: '06:00' },
  { daysOfWeek: [6], title: 'MM - Mulheres em Missão', startTime: '16:00' },
];

const allEvents: CalendarEvent[] = [...eventos, ...institutoBiblicoEvents, ...programacoesFixas].map(ev => ({
  ...ev,
  color: getEventColor(ev)
}));


// Carrega FullCalendar dinamicamente para evitar SSR
const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });

// Componente local para revelar apenas ao carregar
function CalendarReveal({ children, direction = "left", delay = 0 }: { children: ReactNode; direction?: "left" | "right" | "up" | "down"; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  const getTransformClass = () => {
    if (isVisible) return "";
    switch (direction) {
      case "left": return "-translate-x-24";
      case "right": return "translate-x-24";
      case "up": return "translate-y-24";
      case "down": return "-translate-y-24";
      default: return "";
    }
  };
  return (
    <div
      className={`${getTransformClass()} ${isVisible ? "opacity-100" : "opacity-0"} duration-700 transition-all`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

const CalendarPage = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  // Memoiza eventos para evitar recomputação
  const memoAllEvents = useMemo(() => allEvents, []);

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  function isDateOnly(value: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  function dateKeyToLocalDate(dateKey: string) {
    const [year, month, day] = dateKey.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function toDateKey(value: string | Date) {
    if (typeof value === 'string' && isDateOnly(value)) {
      return value;
    }

    const dateObj = typeof value === 'string' ? new Date(value) : value;
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function normalizedText(text?: string) {
    return (text ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function applyEventConflictRule(events: CalendarEvent[]) {
    const hasCultoAdministrativo = events.some((ev) =>
      normalizedText(ev.title).includes('culto administrativo')
    );

    if (!hasCultoAdministrativo) return events;

    return events.filter((ev) => !normalizedText(ev.title).includes('instituto biblico'));
  }

  function getEventsOfDay(date: string) {
    const selected = dateKeyToLocalDate(date);
    const dayOfWeek = selected.getDay();
    const dateKey = toDateKey(selected);
    const result = memoAllEvents.filter((ev) => {
      // Evento de um dia específico
      if (ev.date && toDateKey(ev.date) === dateKey) return true;
      // Evento de múltiplos dias
      if (ev.start && ev.end) {
        const start = toDateKey(ev.start);
        const end = toDateKey(ev.end);
        if (dateKey >= start && dateKey <= end) return true;
      }
      // Evento recorrente por dia da semana
      if (Array.isArray(ev.daysOfWeek) && ev.daysOfWeek.includes(dayOfWeek)) return true;
      return false;
    });
    return applyEventConflictRule(result);
  }

  function openDayEvents(dateInput: string | Date) {
    const date = toDateKey(dateInput);
    const events = getEventsOfDay(date);
    setSelectedDate(date);
    setSelectedEvents(events);
    setOpen(true);
  }

  // Handler para clique em evento
  function handleEventClick(info: EventClickArg) {
    if (!info.event.start) return;
    openDayEvents(info.event.start);
  }

  // Handler para clique em dia vazio
  function handleDateClick(info: DateClickArg) {
    openDayEvents(info.date);
  }

  return (
    <div className="flex flex-col gap-8 p-8 bg-primary/30">
      {isClient && (
        <>
          <CalendarReveal direction="up">
            {/* Modal/Card central customizado */}
            <EventInfoModal
              open={open}
              onClose={() => setOpen(false)}
              selectedDate={selectedDate}
              selectedEvents={selectedEvents}
            />
            {/* Mês atual */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Calendário - Mês Atual</h2>
              <Card className="rounded-3xl border p-4 min-h-130 shadow-2xl">
                <style>{`
                  .fc-header-toolbar {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    gap: 0.5rem;
                  }
                  .fc-toolbar-chunk {
                    display: flex;
                    align-items: center;
                  }
                  .fc-toolbar-chunk:first-child {
                    flex: 1 1 0%;
                    justify-content: flex-start;
                  }
                  .fc-toolbar-chunk:last-child {
                    flex: 1 1 0%;
                    justify-content: flex-end;
                  }
                  .fc-toolbar-title {
                    width: 100%;
                    text-align: right !important;
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 0;
                    display: block;
                  }
                `}</style>
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  locale="pt-br"
                  height={480}
                  contentHeight={480}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: '',
                    right: 'title'
                  }}
                  buttonText={{ today: 'Hoje' }}
                  events={memoAllEvents}
                  eventClick={handleEventClick}
                  dateClick={handleDateClick}
                  dayCellClassNames={(arg) => (
                    selectedDate && toDateKey(arg.date) === selectedDate
                      ? ['ibp-selected-day']
                      : []
                  )}
                />
              </Card>
            </section>
          </CalendarReveal>
          <CalendarReveal direction="up" delay={200}>
            {/* Legenda de cores */}
            <div className="flex flex-wrap gap-4 items-center justify-center my-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: 'var(--event-ceia)' }} />
                <span className="text-sm">Ceia do Senhor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: 'var(--event-missoes)' }} />
                <span className="text-sm">Missões</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: 'var(--event-mm)' }} />
                <span className="text-sm">MM - Mulheres em Missão</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: 'var(--event-juventude)' }} />
                <span className="text-sm">Juventude</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: 'var(--event-casais)' }} />
                <span className="text-sm">Casais</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: 'var(--event-culto-adm)' }} />
                <span className="text-sm">Culto Administrativo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: 'var(--event-fixo)' }} />
                <span className="text-sm">Programação Fixa</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: 'var(--event-comemorativo)' }} />
                <span className="text-sm">Comemorativo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: 'var(--event-geral)' }} />
                <span className="text-sm">Geral/Outros</span>
              </div>
            </div>
          </CalendarReveal>
          <CalendarReveal direction="up" delay={400}>
            {/* Panorama geral */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Panorama Geral dos Meses</h2>
              <div id="calendar-panorama" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                  <Card key={i} className="rounded-3xl border p-4 shadow-2xl">
                    <FullCalendar
                      plugins={[dayGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      locale="pt-br"
                      height={350}
                      headerToolbar={false}
                      events={memoAllEvents}
                      initialDate={`2026-${String(i+1).padStart(2, '0')}-01`}
                      dayMaxEventRows={3}
                      eventClick={handleEventClick}
                      dateClick={handleDateClick}
                      dayCellClassNames={(arg) => (
                        selectedDate && toDateKey(arg.date) === selectedDate
                          ? ['ibp-selected-day']
                          : []
                      )}
                    />
                    <div className="text-center font-semibold mt-2">
                      {new Date(2026, i).toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </CalendarReveal>
        </>
      )}
    </div>
  );
};

export default CalendarPage;
