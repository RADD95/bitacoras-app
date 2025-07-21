import mongoose, { Schema } from 'mongoose';

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  cedula: { type: String, unique: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String },
  foto_perfil_url: { type: String },
  rol: { type: String, enum: ['estudiante', 'lider', 'maestro'], required: true },
  ficha_id: { type: Schema.Types.ObjectId, ref: 'Ficha' },
  activo: { type: Boolean, default: true },
  estado: { type: String, enum: ['pendiente', 'activo'], default: 'pendiente' },
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);