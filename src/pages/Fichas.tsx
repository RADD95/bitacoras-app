import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

const Fichas = () => {
  const { data: fichas, isLoading } = useQuery({
    queryKey: ['fichas'],
    queryFn: () => api.get('/fichas').then((res) => res.data),
  });

  if (isLoading) return <div className="text-center p-4">Cargando...</div>;

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h2 className="text-[24px] font-bold mb-4">Fichas</h2>
      <ul className="flex flex-col gap-2">
        {fichas?.map((ficha: any) => (
          <li key={ficha._id} className="p-2 border border-gray-300 rounded">
            {ficha.nombre} - {ficha.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fichas;