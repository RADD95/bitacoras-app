import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [identificador, setIdentificador] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');

  const loginMutation = useMutation({
    mutationFn: (data: { identificador: string; contrasena: string }) =>
      api.post('/usuarios/login', data).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      window.location.href = '/fichas';
    },
    onError: () => alert('Error al iniciar sesión'),
  });

  const registroMutation = useMutation({
    mutationFn: (data: { nombre: string; cedula: string; correo: string; contrasena: string }) =>
      api.post('/usuarios/registro', data).then((res) => res.data),
    onSuccess: () => {
      alert('Registro exitoso');
      setIsLogin(true);
    },
    onError: () => alert('Error al registrarse'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({ identificador, contrasena });
    } else {
      registroMutation.mutate({ nombre, cedula, correo, contrasena });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-[400px] w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-[20px] font-bold ${isLogin ? 'text-blue-500' : 'text-gray-500'}`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-[20px] font-bold ${!isLogin ? 'text-blue-500' : 'text-gray-500'}`}
          >
            Registrarse
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isLogin ? (
            <>
              <input
                type="text"
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
            </>
          ) : (
            <>
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
            </>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;