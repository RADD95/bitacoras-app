import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Fichas from './pages/Fichas';
import Chat from './pages/Chat';
import Calendario from './pages/Calendario';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/fichas" element={<Fichas />} />
          <Route path="/chat/:fichaId" element={<Chat fichaId="exampleFichaId" />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;