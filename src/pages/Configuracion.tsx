import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Configuracion = () => {
  const { user } = useAuth();
  const [contrasena, setContrasena] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) =>
      api
        .put("/usuarios/me", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      alert("Datos actualizados");
      user!.fotoPerfil = data.fotoPerfil;
    },
    onError: () => alert("Error al actualizar datos"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (contrasena) formData.append("contrasena", contrasena);
    if (foto) formData.append("fotoPerfil", foto);
    updateMutation.mutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h2 className="text-[24px] font-bold mb-4">Configuración</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <img
            src={
              user?.fotoPerfil
                ? `http://localhost:3000${user.fotoPerfil}`
                : "https://via.placeholder.com/100"
            }
            alt="Perfil"
            className="w-24 h-24 rounded-full mb-2"
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2"
          />
        </div>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Nueva contraseña"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default Configuracion;
