import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Chat from '../components/Chat';

const FichaDetalle = () => {
  const { fichaId } = useParams();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [bitacoraId, setBitacoraId] = useState('');

  const { data: ficha, isLoading: fichaLoading } = useQuery({
    queryKey: ['ficha', fichaId],
    queryFn: () => api.get(`/fichas/${fichaId}`).then((res) => res.data),
  });

  const { data: asignaciones, isLoading: asignacionesLoading } = useQuery({
    queryKey: ['asignaciones', fichaId],
    queryFn: () => api.get(`/asignaciones/ficha/${fichaId}`).then((res) => res.data),
  });

  const { data: bitacoras, isLoading: bitacorasLoading } = useQuery({
    queryKey: ['bitacoras', fichaId],
    queryFn: () => api.get(`/bitacoras/ficha/${fichaId}`).then((res) => res.data),
  });

  const bitacoraMutation = useMutation({
    mutationFn: (formData: FormData) =>
      api[bitacoraId ? 'put' : 'post'](`/bitacoras${bitacoraId ? `/${bitacoraId}` : ''}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => res.data),
    onSuccess: () => {
      alert(bitacoraId ? 'Bitácora actualizada' : 'Bitácora subida');
      setIsModalOpen(false);
      setTitulo('');
      setContenido('');
      setArchivo(null);
      setBitacoraId('');
    },
    onError: () => alert('Error al gestionar bitácora'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/bitacoras/${id}`).then((res) => res.data),
    onSuccess: () => {
      alert('Bitácora eliminada');
      setIsModalOpen(false);
    },
    onError: () => alert('Error al eliminar bitácora'),
  });

  const handleDateClick = (info: any) => {
    const today = new Date();
    const selected = new Date(info.dateStr);
    if (selected < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    const asignacion = asignaciones?.find((a: any) => a.fecha === info.dateStr);
    if (asignacion?.estudiante_id._id !== user?.id) return;
    const bitacora = bitacoras?.find((b: any) => b.fecha === info.dateStr);
    if (bitacora) {
      setBitacoraId(bitacora._id);
      setTitulo(bitacora.titulo);
      setContenido(bitacora.contenido);
    } else {
      setBitacoraId('');
      setTitulo('');
      setContenido('');
    }
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ficha_id', fichaId!);
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
    formData.append('fecha', selectedDate);
    if (archivo) formData.append('archivo', archivo);
    bitacoraMutation.mutate(formData);
  };

  const handleDelete = () => {
    if (bitacoraId) deleteMutation.mutate(bitacoraId);
  };

  if (fichaLoading || asignacionesLoading || bitacorasLoading) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  const getEventColor = (asignacion: any) => {
    const bitacora = bitacoras?.find((b: any) => b.fecha === asignacion.fecha);
    if (bitacora) return 'green';
    const today = new Date();
    const date = new Date(asignacion.fecha);
    if (date < today && !bitacora) return today.getMonth() === date.getMonth() ? 'yellow' : 'red';
    return 'white';
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h2 className="text-[24px] font-bold mb-4">{ficha?.nombre}</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h3 className="text-[18px] font-bold mb-2">Calendario</h3>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={asignaciones?.map((asignacion: any) => ({
              title: asignacion.estudiante_id.nombre,
              date: asignacion.fecha,
              backgroundColor: getEventColor(asignacion),
              borderColor: getEventColor(asignacion),
            }))}
            dateClick={handleDateClick}
            validRange={{ start: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }}
          />
        </div>
        <div>
          <h3 className="text-[18px] font-bold mb-2">Estudiantes</h3>
          <ul className="flex flex-col gap-2">
            {ficha?.estudiantes.map((estudiante: any) => (
              <li key={estudiante._id} className="p-2 border border-gray-300 rounded">
                {estudiante.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Chat />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-[400px] w-full">
            <h3 className="text-[20px] font-bold mb-4">
              {bitacoraId ? 'Editar Bitácora' : 'Subir Bitácora'}
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Contenido"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="file"
                onChange={(e) => e.target.files && setArchivo(e.target.files[0])}
                accept="image/*,application/pdf"
                className="w-full p-2"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  {bitacoraId ? 'Actualizar' : 'Subir'}
                </button>
                {bitacoraId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 p-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FichaDetalle;