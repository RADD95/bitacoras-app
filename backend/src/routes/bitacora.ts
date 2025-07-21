import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Bitacora from '../models/Bitacora';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/bitacoras';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/ficha/:fichaId', verifyToken, async (req, res) => {
  try {
    const bitacoras = await Bitacora.find({ ficha_id: req.params.fichaId }).populate('usuario_id');
    res.json(bitacoras);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener bitácoras' });
  }
});

router.post('/', verifyToken, upload.single('archivo'), async (req: any, res) => {
  try {
    const { ficha_id, titulo, contenido, fecha } = req.body;
    const bitacora = new Bitacora({
      ficha_id,
      usuario_id: req.user.id,
      titulo,
      contenido,
      fecha,
      archivo: req.file ? `/uploads/bitacoras/${req.file.filename}` : null,
    });
    await bitacora.save();
    res.status(201).json(bitacora);
  } catch (error) {
    res.status(400).json({ error: 'Error al subir bitácora' });
  }
});

router.put('/:id', verifyToken, upload.single('archivo'), async (req: any, res) => {
  try {
    const { titulo, contenido, fecha } = req.body;
    const updateData: any = { titulo, contenido, fecha };
    if (req.file) updateData.archivo = `/uploads/bitacoras/${req.file.filename}`;
    const bitacora = await Bitacora.findOneAndUpdate(
      { _id: req.params.id, usuario_id: req.user.id },
      updateData,
      { new: true }
    );
    if (!bitacora) return res.status(404).json({ error: 'Bitácora no encontrada o no autorizada' });
    res.json(bitacora);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar bitácora' });
  }
});

router.delete('/:id', verifyToken, async (req: any, res) => {
  try {
    const bitacora = await Bitacora.findOneAndDelete({ _id: req.params.id, usuario_id: req.user.id });
    if (!bitacora) return res.status(404).json({ error: 'Bitácora no encontrada o no autorizada' });
    res.json({ mensaje: 'Bitácora eliminada' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar bitácora' });
  }
});

export default router;