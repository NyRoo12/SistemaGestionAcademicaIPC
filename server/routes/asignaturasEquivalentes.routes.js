import { Router } from "express";
import {
  getEquivalencias,
  getCarreras,
} from "../controllers/asignaturasEquivalentes.controller.js";

const router = Router();

// Ruta para obtener equivalencias
router.get("/obtenerEquivalencias", getEquivalencias);

router.get("/carreras", getCarreras);

export default router;
