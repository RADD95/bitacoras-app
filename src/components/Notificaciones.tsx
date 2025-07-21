import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3000');

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState<string[]>([]);

  useEffect(() => {
    socket.on('notificacion', (mensaje: string) => {
      setNotificaciones((prev) => [...prev, mensaje]);
    });
    return () => {
      socket.off('notificacion');
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 max-w-[300px] flex flex-col gap-2">
      {notificaciones.map((notif, index) => (
        <div key={index} className="bg-white p-2 rounded shadow border border-gray-300">
          {notif}
        </div>
      ))}
    </div>
  );
};

export default Notificaciones;