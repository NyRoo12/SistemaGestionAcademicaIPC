import { Router } from "express";
import {
  obtenerHistorial,
  obtenerHistorialPorRut,
  agregar,
} from "../controllers/historialAcademico.controller.js";

const router = Router();

// Rutas
router.get("/", obtenerHistorial);
router.get("/obtenerHistorial/:rut", obtenerHistorialPorRut);
router.post("/", agregar);

export default router;