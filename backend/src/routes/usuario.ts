import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

const router = express.Router();

// Registro de usuario
router.post('/registro', async (req, res) => {
  try {
    const { nombre, cedula, correo, contrasena, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena || cedula, 10);
    const usuario = new Usuario({
      nombre,
      cedula,
      correo,
      contrasena: hashedPassword,
      rol,
      estado: contrasena ? 'activo' : 'pendiente',
    });
    await usuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { identificador, contrasena } = req.body; // Cambiamos 'correo' por 'identificador'
    const usuario = await Usuario.findOne({
      $or: [{ correo: identificador }, { cedula: identificador }],
    });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    if (!contrasena || typeof usuario.contrasena !== 'string') {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena as string);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, 'secreto', { expiresIn: '1h' });
    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    res.status(400).json({ error: 'Error al iniciar sesión' });
  }
});

export default router;