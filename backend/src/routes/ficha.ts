import express from 'express';
import Ficha from '../models/Ficha';
import { io } from '../index'; // Importar io desde index.ts

const router = express.Router();

// Crear ficha
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const ficha = new Ficha({ nombre, descripcion });
    await ficha.save();
    res.status(201).json(ficha);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear ficha' });
  }
});

// Obtener todas las fichas
router.get('/', async (req, res) => {
  try {
    const fichas = await Ficha.find();
    res.json(fichas);
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener fichas' });
  }
});

export default router;