import mongoose from 'mongoose';

const bitacoraSchema = new mongoose.Schema({
  ficha_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ficha', required: true },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: String, required: true }, // Formato: YYYY-MM-DD
  archivo: { type: String },
});

export default mongoose.model('Bitacora', bitacoraSchema);