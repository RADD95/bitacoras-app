import mongoose, { Schema } from 'mongoose';

const bitacoraSchema = new Schema({
  estudiante_original_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  estudiante_subida_id: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  fecha: { type: Date, required: true },
  archivo_url: { type: String },
  motivo_reasignacion: { type: String },
}, { timestamps: true });

export default mongoose.model('Bitacora', bitacoraSchema);