import './index.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Bienvenido a Bitácoras</h1>
      <button
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        onClick={() => alert('Crear nueva ficha')}
      >
        Crear Ficha
      </button>
    </div>
  );
}

export default App;