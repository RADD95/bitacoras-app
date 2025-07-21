import express from 'express';
import Mensaje from '../models/Mensaje';
import { io } from '../index';
import upload from '../middleware/upload';

const router = express.Router();

// Enviar mensaje (texto o imagen)
router.post('/:fichaId', upload.single('imagen'), async (req, res) => {
  try {
    const { fichaId } = req.params;
    const { contenido, usuarioId } = req.body;
    const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const mensaje = new Mensaje({
      contenido,
      imagen_url: imagenUrl,
      usuario_id: usuarioId,
      ficha_id: fichaId,
    });
    await mensaje.save();
    io.to(fichaId).emit('mensaje', mensaje);
    res.status(201).json(mensaje);
  } catch (error) {
    res.status(400).json({ error: 'Error al enviar mensaje' });
  }
});

// Obtener mensajes de una ficha
router.get('/:fichaId', async (req, res) => {
  try {
    const { fichaId } = req.params;
    const mensajes = await Mensaje.find({ ficha_id: fichaId }).populate('usuario_id', 'nombre');
    res.json(mensajes);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener mensajes' });
  }
});

export default router;