import express from 'express';
import Notificacion from '../models/Notificacion';

const router = express.Router();

// Crear notificación
router.post('/', async (req, res) => {
  try {
    const { usuarioId, mensaje } = req.body;
    const notificacion = new Notificacion({ usuario_id: usuarioId, mensaje });
    await notificacion.save();
    res.status(201).json(notificacion);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear notificación' });
  }
});

export default router;