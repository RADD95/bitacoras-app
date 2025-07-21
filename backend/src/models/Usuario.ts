import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cedula: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rol: { type: String, enum: ['estudiante', 'maestro', 'lider'], default: 'estudiante' },
  fotoPerfil: { type: String },
});

export default mongoose.model('Usuario', usuarioSchema);