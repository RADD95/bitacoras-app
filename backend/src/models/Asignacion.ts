import mongoose, { Schema } from 'mongoose';

const asignacionSchema = new Schema({
  estudiante_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, required: true },
  ficha_id: { type: Schema.Types.ObjectId, ref: 'Ficha', required: true },
  activo: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Asignacion', asignacionSchema);