import { Router } from 'express';
import { saveConfig } from '../controllers/config.controller.js';

const router = Router();

// Ruta para listar todos los logs
router.post('/', saveConfig);


export default router;