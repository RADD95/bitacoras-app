import mongoose from 'mongoose';

const asignacionSchema = new mongoose.Schema({
  ficha_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ficha', required: true },
  estudiante_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: String, required: true }, // Formato: YYYY-MM-DD
});

export default mongoose.model('Asignacion', asignacionSchema);