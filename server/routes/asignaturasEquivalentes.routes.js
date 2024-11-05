import { Router } from "express";
import {
  getEquivalencias,
} from "../controllers/asignaturasEquivalentes.controller.js";

const router = Router();

// Ruta para obtener equivalencias
router.get("/obtenerEquivalencias", getEquivalencias);

export default router;
