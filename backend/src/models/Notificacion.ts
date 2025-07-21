import mongoose, { Schema } from 'mongoose';

const notificacionSchema = new Schema({
  usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  mensaje: { type: String, required: true },
  leida: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Notificacion', notificacionSchema);