import './index.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Bienvenido a Bitácoras</h1>
      <div className="space-x-4">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={() => alert('Crear nueva ficha')}
        >
          Crear Ficha
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          onClick={() => alert('Ir al formulario de registro')}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default App;