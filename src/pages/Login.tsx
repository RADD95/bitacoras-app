import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';

const Login = () => {
  const [identificador, setIdentificador] = useState(''); // Cambiamos 'correo' por 'identificador'
  const [contrasena, setContrasena] = useState('');

  const loginMutation = useMutation({
    mutationFn: (data: { identificador: string; contrasena: string }) =>
      api.post('/usuarios/login', data).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      alert('Login exitoso');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ identificador, contrasena });
  };

  return (
    <div className="max-w-[400px] mx-auto p-4">
      <h2 className="text-[24px] font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text" // Cambiamos 'email' por 'text' para aceptar cédula o correo
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
          placeholder="Cédula o Correo"
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
      <p className="mt-4 text-center">
        ¿No tienes cuenta? <a href="/registro" className="text-blue-500 hover:underline">Regístrate</a>
      </p>
    </div>
  );
};

export default Login;