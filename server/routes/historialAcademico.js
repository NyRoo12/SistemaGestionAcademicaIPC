const express = require("express");
const router = express.Router();
const historialAcademicoController = require("../controllers/historialAcademicoController");

// Rutas para el historial académico
router.get("/", historialAcademicoController.obtenerHistorial);
router.post("/", historialAcademicoController.agregarRegistro);
router.get("/obtenerHistorial", historialAcademicoController.obtenerHistorialPorRut);

module.exports = router;
