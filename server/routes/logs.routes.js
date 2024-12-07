import { Router } from 'express';
import { listarLogs, vaciarLogs } from '../controllers/logs.controller.js';

const router = Router();

// Ruta para listar todos los logs
router.get('/', listarLogs);
router.delete('/vaciar', vaciarLogs);


export default router;
