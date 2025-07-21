import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Fichas from './pages/Fichas';
import FichaDetalle from './pages/FichaDetalle';
import Configuracion from './pages/Configuracion';
import Navbar from './components/Navbar';
import Notificaciones from './components/Notificaciones';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Notificaciones />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fichas" element={<Fichas />} />
            <Route path="/ficha/:fichaId" element={<FichaDetalle />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;