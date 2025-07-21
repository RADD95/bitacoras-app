import express from 'express';
import Ficha from '../models/Ficha';
import { verifyToken } from '../middleware/auth';
import { io } from '../index';

const router = express.Router();

router.get('/', verifyToken, async (req: any, res) => {
  try {
    const fichas = await Ficha.find({
      $or: [{ lider_id: req.user.id }, { maestro_id: req.user.id }, { estudiantes: req.user.id }],
    }).populate('estudiantes');
    res.json(fichas);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener fichas' });
  }
});

router.get('/maestro', verifyToken, async (req: any, res) => {
  try {
    const fichas = await Ficha.find({ maestro_id: req.user.id }).populate('estudiantes');
    res.json(fichas);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener fichas' });
  }
});

router.get('/:id', verifyToken, async (req: any, res) => {
  try {
    const ficha = await Ficha.findById(req.params.id).populate('estudiantes');
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada' });
    res.json(ficha);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener ficha' });
  }
});

router.post('/', verifyToken, async (req: any, res) => {
  try {
    if (!['maestro', 'lider'].includes(req.user.rol)) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    const { nombre, descripcion, lider_id, maestro_id } = req.body;
    const ficha = new Ficha({ nombre, descripcion, lider_id, maestro_id, estudiantes: [], mensajes: [] });
    await ficha.save();
    io.emit('notificacion', `Nueva ficha creada: ${nombre}`);
    res.status(201).json(ficha);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear ficha' });
  }
});

router.post('/:id/mensaje', verifyToken, async (req: any, res) => {
  try {
    const { contenido, imagen_url } = req.body;
    const mensaje = { usuario_id: req.user.id, contenido, imagen_url, fecha: new Date() };
    const ficha = await Ficha.findByIdAndUpdate(
      req.params.id,
      { $push: { mensajes: mensaje } },
      { new: true }
    );
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada' });
    io.to(req.params.id).emit('mensaje', mensaje);
    res.json(mensaje);
  } catch (error) {
    res.status(400).json({ error: 'Error al enviar mensaje' });
  }
});

export default router;