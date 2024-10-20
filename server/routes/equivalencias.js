const express = require("express");
const router = express.Router();
const equivalenciasController = require("../controllers/equivalenciasController");

// Ruta para obtener equivalencias
router.get("/obtenerEquivalencias", equivalenciasController.obtenerEquivalencias);

module.exports = router;
