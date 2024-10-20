const express = require('express');
const router = express.Router();

const asignaturasIPCController = require('../controllers/asignaturasIpcController');

// Obtener todas las asignaturasIPC
router.get('/', asignaturasIPCController.obtenerAsignaturas);

module.exports = router;
