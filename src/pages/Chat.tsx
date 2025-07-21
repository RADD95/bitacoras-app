import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

const socket = io('http://localhost:3000');

const Chat = ({ fichaId }: { fichaId: string }) => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<any[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['mensajes', fichaId],
    queryFn: () => api.get(`/mensajes/${fichaId}`).then((res) => res.data),
  });

  useEffect(() => {
    socket.emit('join_ficha', fichaId);
    socket.on('mensaje', (msg) => {
      setMensajes((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('mensaje');
    };
  }, [fichaId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('mensaje', { fichaId, mensaje });
    setMensaje('');
  };

  if (isLoading) return <div className="text-center p-4">Cargando...</div>;

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h2 className="text-[24px] font-bold mb-4">Chat</h2>
      <div className="h-[400px] overflow-y-auto border border-gray-300 p-4 mb-4 rounded">
        {mensajes.concat(data || []).map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.usuario_id?.nombre || 'Usuario'}: </strong>
            {msg.contenido}
            {msg.imagen_url && <img src={`http://localhost:3000${msg.imagen_url}`} alt="Mensaje" className="w-[128px]" />}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chat;