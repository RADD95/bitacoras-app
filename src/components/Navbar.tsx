import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <div className="text-[20px] font-bold">Bitácoras</div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link to="/configuracion" className="flex items-center gap-2">
                <img
                  src={
                    user.fotoPerfil
                      ? `http://localhost:3000${user.fotoPerfil}`
                      : "https://via.placeholder.com/32"
                  }
                  alt="Perfil"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hover:underline">
                  {user.nombre} ({user.rol})
                </span>
              </Link>
              <Link to="/fichas" className="hover:underline">
                Fichas
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/" className="hover:underline">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
