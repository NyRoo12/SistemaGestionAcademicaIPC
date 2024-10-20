const express = require("express");
const router = express.Router();
const estudiantesController = require("../controllers/estudiantesController");

// Ruta para obtener todos los estudiantes
router.get("/todos", estudiantesController.obtenerTodosEstudiantes);

// Ruta para crear un nuevo estudiante
router.post("/", estudiantesController.crearEstudiante);

// Ruta para buscar estudiantes por nombre o RUT
router.get("/buscar", estudiantesController.buscarEstudiantes);

// Ruta para obtener el detalle de un estudiante por RUT
router.get("/obtenerDetalle", estudiantesController.obtenerDetalleEstudiante);

module.exports = router;
