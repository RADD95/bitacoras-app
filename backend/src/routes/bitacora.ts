import express from 'express';
import Bitacora from '../models/Bitacora';
import upload from '../middleware/upload';

const router = express.Router();

// Subir bitácora
router.post('/:fichaId', upload.single('archivo'), async (req, res) => {
  try {
    const { fichaId } = req.params;
    const { estudianteId, fecha } = req.body;
    const archivoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const bitacora = new Bitacora({
      estudiante_original_id: estudianteId,
      estudiante_subida_id: estudianteId,
      ficha_id: fichaId,
      fecha,
      archivo_url: archivoUrl,
    });
    await bitacora.save();
    res.status(201).json(bitacora);
  } catch (error) {
    res.status(400).json({ error: 'Error al subir bitácora' });
  }
});

export default router;