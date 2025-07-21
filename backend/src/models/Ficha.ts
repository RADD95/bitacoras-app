import mongoose from 'mongoose';

const fichaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  lider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  maestro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  estudiantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  mensajes: [{
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    contenido: { type: String, required: true },
    imagen_url: { type: String },
    fecha: { type: Date, default: Date.now },
  }],
});

export default mongoose.model('Ficha', fichaSchema);