import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Fichas = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [liderId, setLiderId] = useState('');
  const [maestroId, setMaestroId] = useState('');

  const { data: fichas, isLoading } = useQuery({
    queryKey: ['fichas', user?.rol],
    queryFn: () =>
      api.get(user?.rol === 'maestro' ? '/fichas/maestro' : '/fichas').then((res) => res.data),
  });

  const fichaMutation = useMutation({
    mutationFn: (data: { nombre: string; descripcion: string; lider_id: string; maestro_id: string }) =>
      api.post('/fichas', data).then((res) => res.data),
    onSuccess: (data) => {
      alert('Ficha creada');
      setIsModalOpen(false);
      setNombre('');
      setDescripcion('');
      setLiderId('');
      setMaestroId('');
      navigate(`/ficha/${data._id}`);
    },
    onError: () => alert('Error al crear ficha'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fichaMutation.mutate({ nombre, descripcion, lider_id: liderId, maestro_id: maestroId });
  };

  if (isLoading) return <div className="text-center p-4">Cargando...</div>;

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h2 className="text-[24px] font-bold mb-4">Fichas</h2>
      {user?.rol === 'maestro' && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Crear Ficha
        </button>
      )}
      <ul className="flex flex-col gap-2">
        {fichas?.map((ficha: any) => (
          <li key={ficha._id} className="p-2 border border-gray-300 rounded">
            <Link to={`/ficha/${ficha._id}`} className="hover:underline">
              {ficha.nombre} - {ficha.descripcion}
            </Link>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-[400px] w-full">
            <h3 className="text-[20px] font-bold mb-4">Crear Ficha</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={liderId}
                onChange={(e) => setLiderId(e.target.value)}
                placeholder="ID del líder"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={maestroId}
                onChange={(e) => setMaestroId(e.target.value)}
                placeholder="ID del maestro"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Crear
                </button>
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

export default Fichas;