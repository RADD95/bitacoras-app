import mongoose, { Schema } from 'mongoose';

const fichaSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  activa: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Ficha', fichaSchema);