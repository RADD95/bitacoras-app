import express from 'express';
import Asignacion from '../models/Asignacion';
import Ficha from '../models/Ficha';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.get('/ficha/:fichaId', verifyToken, async (req, res) => {
  try {
    const asignaciones = await Asignacion.find({ ficha_id: req.params.fichaId }).populate('estudiante_id');
    res.json(asignaciones);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener asignaciones' });
  }
});

router.post('/', verifyToken, async (req: any, res) => {
  try {
    if (!['maestro', 'lider'].includes(req.user.rol)) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    const { ficha_id, estudiante_id, fecha } = req.body;
    const asignacion = new Asignacion({ ficha_id, estudiante_id, fecha });
    await asignacion.save();
    await Ficha.findByIdAndUpdate(ficha_id, { $addToSet: { estudiantes: estudiante_id } });
    res.status(201).json(asignacion);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear asignación' });
  }
});

export default router;