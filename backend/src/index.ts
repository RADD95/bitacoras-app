import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || '';

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/api', routes);

mongoose.connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('join_ficha', (fichaId) => {
    socket.join(fichaId);
    console.log(`Usuario ${socket.id} se unió a la ficha ${fichaId}`);
  });

  socket.on('mensaje', (data) => {
    const { fichaId, mensaje } = data;
    io.to(fichaId).emit('mensaje', mensaje);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('¡Backend de Bitácoras funcionando!');
});

httpServer.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});