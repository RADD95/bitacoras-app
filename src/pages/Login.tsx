import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const loginMutation = useMutation({
    mutationFn: (data: { correo: string; contrasena: string }) =>
      api.post('/usuarios/login', data).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      alert('Login exitoso');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ correo, contrasena });
  };

  return (
    <div className="max-w-[400px] mx-auto p-4">
      <h2 className="text-[24px] font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;