Bitácoras
Aplicación web para gestionar bitácoras de estudiantes, con fichas, calendarios, y chat desplegable.
Tecnologías

Frontend: React, TypeScript, Vite, Tailwind CSS v4.0 (@tailwindcss/vite), React Query, React Router, FullCalendar, Socket.IO Client
Backend: Node.js, Express, MongoDB, Socket.IO, Multer
Otros: JWT para autenticación, bcrypt para contraseñas

Configuración del proyecto
Prerrequisitos

Node.js (v18 o superior)
MongoDB (local o en la nube)
Git

Instalación

Clona el repositorio:git clone <URL_DEL_REPOSITORIO>
cd bitacoras-app


Instala dependencias del frontend:npm install


Instala dependencias del backend:cd backend
npm install


Crea un archivo .env en backend:PORT=3000
MONGODB_URI=mongodb://localhost:27017/bitacoras
JWT_SECRET=secreto


Inicia MongoDB:mongod


Inicia el backend:cd backend
npm run dev


Inicia el frontend:cd ..
npm run dev



Configuración de Tailwind CSS v4.0
Tailwind CSS v4.0 está integrado con Vite usando @tailwindcss/vite:

Archivo src/index.css:@import "tailwindcss";


Archivo vite.config.ts:import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});



Estructura del proyecto
bitacoras-app/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── index.ts
│   ├── package.json
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
├── package.json
├── vite.config.ts
├── README.md

Uso

Abre http://localhost:5173/ para ver la página principal (login/registro).
Regístrate como estudiante o inicia sesión.
Navega a /fichas para ver tus fichas.
Accede a una ficha (/ficha/:fichaId) para ver el calendario, estudiantes, y chat desplegable.
Sube bitácoras en tus días asignados desde el calendario.
Configura tu perfil en /configuracion.

Notas

Solo estudiantes pueden registrarse desde la interfaz.
Usa Postman para probar endpoints (/api/usuarios, /api/fichas, etc.).
El chat es desplegable (tipo Facebook) y soporta mensajes e imágenes.
