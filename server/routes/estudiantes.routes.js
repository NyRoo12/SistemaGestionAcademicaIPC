import { Router } from "express";
import {
  getEstudiantes,
  createEstudiante,
  getEstudiante,
  getDetalle,
} from "../controllers/estudiantes.controller.js";

const router = Router();

// Ruta para obtener todos los estudiantes
router.get("/", getEstudiantes);

// Ruta para crear un nuevo estudiante
router.post("/crear", createEstudiante);

// Ruta para buscar estudiantes por nombre o RUT
router.get("/buscar", getEstudiante);

// Ruta para obtener el detalle de un estudiante por RUT
router.get("/obtenerDetalle", getDetalle);

export default router;
