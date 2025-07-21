import express from 'express';
import usuarioRoutes from './usuario';
import fichaRoutes from './ficha';
import bitacoraRoutes from './bitacora';
import mensajeRoutes from './mensaje';
import notificacionRoutes from './notificacion';
import asignacionRoutes from './asignacion';

const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/fichas', fichaRoutes);
router.use('/bitacoras', bitacoraRoutes);
router.use('/mensajes', mensajeRoutes);
router.use('/notificaciones', notificacionRoutes);
router.use('/asignaciones', asignacionRoutes);

export default router;