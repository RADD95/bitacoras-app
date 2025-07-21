import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

const Calendario = () => {
  const { data: asignaciones, isLoading } = useQuery({
    queryKey: ['asignaciones'],
    queryFn: () => api.get('/asignaciones').then((res) => res.data),
  });

  if (isLoading) return <div className="text-center p-4">Cargando...</div>;

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h2 className="text-[24px] font-bold mb-4">Calendario</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={asignaciones?.map((asignacion: any) => ({
          title: `Asignación: ${asignacion.estudiante_id.nombre}`,
          date: asignacion.fecha,
        }))}
      />
    </div>
  );
};

export default Calendario;