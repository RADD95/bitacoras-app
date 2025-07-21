import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import usuarioRoutes from './routes/usuario';
import fichaRoutes from './routes/ficha';
import asignacionRoutes from './routes/asignacion';
import bitacoraRoutes from './routes/bitacora';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173' },
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/fichas', fichaRoutes);
app.use('/api/asignaciones', asignacionRoutes);
app.use('/api/bitacoras', bitacoraRoutes);

io.on('connection', (socket) => {
  socket.on('join_ficha', (fichaId) => {
    socket.join(fichaId);
  });
  socket.on('mensaje', (msg) => {
    io.to(msg.fichaId).emit('mensaje', msg);
  });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bitacoras')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error MongoDB:', err));

server.listen(3000, () => console.log('Backend en http://localhost:3000'));
export { io };