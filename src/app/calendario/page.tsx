"use client";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { Card } from '@/components/ui/card';

const CalendarPage = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Mês atual */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Calendário - Mês Atual</h2>
        <Card className="rounded border p-4 min-h-[400px]">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale="pt-br"
            height={400}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: ''
            }}
          />
        </Card>
      </section>
      {/* Panorama geral */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Panorama Geral dos Meses</h2>
        <div id="calendar-panorama" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded border p-4">
            <FullCalendar
              plugins={[multiMonthPlugin]}
              initialView="multiMonthYear"
              locale="pt-br"
              height={350}
              headerToolbar={false}
              views={{
                multiMonthYear: {
                  multiMonthMinWidth: 200,
                  multiMonthMaxColumns: 4,
                  multiMonthMaxRows: 1,
                },
              }}
            />
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CalendarPage;
