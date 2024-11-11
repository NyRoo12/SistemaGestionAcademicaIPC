import { Router } from "express";
import {
  obtenerHistorial,
  obtenerHistorialPorRut,
  agregar,
  obtenerEstudiantesSinHistorial,
  eliminarHistorial,
} from "../controllers/historialAcademico.controller.js";

const router = Router();

// Rutas
router.get("/", obtenerHistorial);
router.get("/obtenerHistorial/:rut", obtenerHistorialPorRut); //ObtenerHistorialPorRut
router.get("/estudiantesSinHistorial", obtenerEstudiantesSinHistorial);
router.delete("/eliminarHistorial/:rut", eliminarHistorial);
router.post("/agregarHistorial/:rut", agregar);

export default router;