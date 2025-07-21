import mongoose, { Schema } from 'mongoose';

const mensajeSchema = new Schema({
  ficha_id: { type: Schema.Types.ObjectId, ref: 'Ficha', required: true },
  usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  contenido: { type: String, required: true },
  archivo_url: { type: String },
}, { timestamps: true });

export default mongoose.model('Mensaje', mensajeSchema);