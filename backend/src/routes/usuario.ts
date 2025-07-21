import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Usuario from '../models/Usuario';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/perfil';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/registro', async (req, res) => {
  try {
    const { nombre, cedula, correo, contrasena } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const usuario = new Usuario({
      nombre,
      cedula,
      correo,
      contrasena: hashedPassword,
      rol: 'estudiante',
    });
    await usuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { identificador, contrasena } = req.body;
    const usuario = await Usuario.findOne({
      $or: [{ correo: identificador }, { cedula: identificador }],
    });
    if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, 'secreto', { expiresIn: '1h' });
    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol, fotoPerfil: usuario.fotoPerfil } });
  } catch (error) {
    res.status(400).json({ error: 'Error al iniciar sesión' });
  }
});

router.get('/me', verifyToken, async (req: any, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id).select('id nombre rol fotoPerfil');
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ id: usuario._id, nombre: usuario.nombre, rol: usuario.rol, fotoPerfil: usuario.fotoPerfil });
  } catch (error) {
    res.status(400).json({ error: 'Error al obtener usuario' });
  }
});

router.put('/me', verifyToken, upload.single('fotoPerfil'), async (req: any, res) => {
  try {
    const { contrasena } = req.body;
    const updateData: any = {};
    if (contrasena) updateData.contrasena = await bcrypt.hash(contrasena, 10);
    if (req.file) updateData.fotoPerfil = `/uploads/perfil/${req.file.filename}`;
    const usuario = await Usuario.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('id nombre rol fotoPerfil');
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario' });
  }
});

export default router;