import express from 'express';
import Asignacion from '../models/Asignacion';

const router = express.Router();

// Crear asignación
router.post('/', async (req, res) => {
  try {
    const { estudianteId, fichaId, fecha } = req.body;
    const asignacion = new Asignacion({ estudiante_id: estudianteId, ficha_id: fichaId, fecha });
    await asignacion.save();
    res.status(201).json(asignacion);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear asignación' });
  }
});

export default router;