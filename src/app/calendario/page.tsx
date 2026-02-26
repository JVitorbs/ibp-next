"use client";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Card } from '@/components/ui/card';
import EventInfoModal from './EventInfoModal';
import { getEventColor } from './utils';



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

const programacoesFixas = [
  { daysOfWeek: [0], title: 'Instituto Bíblico', startTime: '09:00' },
  { daysOfWeek: [0], title: 'Culto', startTime: '18:00' },
  { daysOfWeek: [6], title: 'Oração Matutina', startTime: '06:00' },
];

const allEvents = [...eventos, ...programacoesFixas].map(ev => ({
  ...ev,
  color: getEventColor(ev)
}));


import React, { useEffect, useState } from 'react';

const CalendarPage = () => {
      const [isClient, setIsClient] = useState(false);
      useEffect(() => {
        setIsClient(true);
      }, []);
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.log('CalendarPage renderizou no client');
    }
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line no-console
      console.log('Modal aberto para', selectedDate, selectedEvents);
    }
  }, [open, selectedDate, selectedEvents]);

  // Função para pegar todos eventos do dia considerando todos os tipos
  // Função para normalizar datas para 'YYYY-MM-DD'
  function normalizeDate(d: string | Date) {
    const dateObj = typeof d === 'string' ? new Date(d) : d;
    return dateObj.toISOString().slice(0, 10);
  }

  function getEventsOfDay(date: string) {
    const dayOfWeek = new Date(date).getDay();
    const normDate = normalizeDate(date);
    const result = allEvents.filter(ev => {
      // Evento de um dia específico
      if ('date' in ev && ev.date && normalizeDate(ev.date) === normDate) return true;
      // Evento de múltiplos dias
      if ('start' in ev && 'end' in ev && ev.start && ev.end) {
        const start = normalizeDate(ev.start);
        const end = normalizeDate(ev.end);
        if (normDate >= start && normDate <= end) return true;
      }
      // Evento recorrente por dia da semana
      if ('daysOfWeek' in ev && Array.isArray(ev.daysOfWeek) && ev.daysOfWeek.includes(dayOfWeek)) return true;
      return false;
    });
    // Log para depuração
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.log('Eventos encontrados para', normDate, result);
    }
    return result;
  }

  // Handler para clique em evento
  function handleEventClick(info: any) {
    const date = info.event.startStr;
    const events = getEventsOfDay(date);
    // eslint-disable-next-line no-console
    console.log('Eventos encontrados para', date, events);
    setSelectedDate(date);
    setSelectedEvents(events);
    setOpen(true);
  }

  // Handler para clique em dia vazio
  function handleDateClick(info: DateClickArg) {
    const date = info.dateStr;
    const events = getEventsOfDay(date);
    // eslint-disable-next-line no-console
    console.log('Eventos encontrados para', date, events);
    setSelectedDate(date);
    setSelectedEvents(events);
    setOpen(true);
  }

  return (
    <div className="flex flex-col gap-8 p-8 bg-primary/40">
      {isClient && (
        <>
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
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="pt-br"
                height={480}
                contentHeight={480}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: ''
                }}
                buttonText={{ today: 'Hoje' }}
                events={allEvents}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
              />
            </Card>
          </section>
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
                    events={allEvents}
                    initialDate={`2026-${String(i+1).padStart(2, '0')}-01`}
                    dayMaxEventRows={3}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                  />
                  <div className="text-center font-semibold mt-2">
                    {new Date(2026, i).toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default CalendarPage;
