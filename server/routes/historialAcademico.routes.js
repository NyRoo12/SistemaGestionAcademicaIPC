import { Router } from "express";
import {
  obtenerHistorial,
  obtenerHistorialPorRut,
  agregar,
  obtenerEstudiantesSinHistorial,
} from "../controllers/historialAcademico.controller.js";

const router = Router();

// Rutas
router.get("/", obtenerHistorial);
router.get("/obtenerHistorial/:rut", obtenerHistorialPorRut); //ObtenerHistorialPorRut
router.get("/estudiantesSinHistorial", obtenerEstudiantesSinHistorial);
router.post("/agregarHistorial/:rut", agregar);

export default router;