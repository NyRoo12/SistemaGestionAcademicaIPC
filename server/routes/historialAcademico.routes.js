import { Router } from "express";
import {
  getTodoHistorial,
  postHistorial,
  getEstudiantesSinHistorial,
  deleteHistorial,
  getHistorialPorRut,
} from "../controllers/historialAcademico.controller.js";

const router = Router();

// Rutas
router.get("/", getTodoHistorial);
router.get("/obtenerHistorial/:rut", getHistorialPorRut); //ObtenerHistorialPorRut
router.get("/estudiantesSinHistorial", getEstudiantesSinHistorial);
router.delete("/eliminarHistorial/:rut", deleteHistorial);
router.post("/agregarHistorial/:rut", postHistorial);

export default router;