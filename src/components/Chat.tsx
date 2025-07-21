import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const socket = io('http://localhost:3000');

const Chat = () => {
  const { fichaId } = useParams();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  useEffect(() => {
    socket.emit('join_ficha', fichaId);
    socket.on('mensaje', (msg) => {
      setMensajes((prev) => [...prev, msg]);
    });
    api.get(`/fichas/${fichaId}`).then((res) => {
      setMensajes(res.data.mensajes || []);
    });
    return () => {
      socket.off('mensaje');
    };
  }, [fichaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje && !imagen) return;
    const formData = new FormData();
    formData.append('contenido', mensaje);
    if (imagen) formData.append('imagen', imagen);
    try {
      const res = await api.post(`/fichas/${fichaId}/mensaje`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      socket.emit('mensaje', { fichaId, ...res.data });
      setMensaje('');
      setImagen(null);
    } catch (error) {
      alert('Error al enviar mensaje');
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
      >
        {isOpen ? 'Cerrar Chat' : 'Abrir Chat'}
      </button>
      {isOpen && (
        <div className="bg-white w-[300px] h-[400px] mt-2 rounded-lg shadow-lg flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {mensajes.map((msg, index) => (
              <div key={index} className="mb-2">
                <strong>{msg.usuario_id?.nombre || 'Usuario'}: </strong>
                {msg.contenido}
                {msg.imagen_url && <img src={`http://localhost:3000${msg.imagen_url}`} alt="Mensaje" className="w-[128px] mt-2" />}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300 flex flex-col gap-2">
            <input
              type="text"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe un mensaje"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="file"
              onChange={(e) => e.target.files && setImagen(e.target.files[0])}
              accept="image/*"
              className="w-full p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;