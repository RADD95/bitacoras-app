import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('estudiante');

  const registroMutation = useMutation({
    mutationFn: (data: { nombre: string; cedula: string; correo: string; contrasena: string; rol: string }) =>
      api.post('/usuarios/registro', data).then((res) => res.data),
    onSuccess: () => {
      alert('Registro exitoso');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registroMutation.mutate({ nombre, cedula, correo, contrasena, rol });
  };

  return (
    <div className="max-w-[400px] mx-auto p-4">
      <h2 className="text-[24px] font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          placeholder="Cédula"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="estudiante">Estudiante</option>
          <option value="lider">Líder</option>
          <option value="maestro">Maestro</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;