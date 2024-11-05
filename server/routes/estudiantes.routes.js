import { Router } from "express";
import {
  obtenerTodosEstudiantes,
  crearEstudiante,
  buscarEstudiantes,
  obtenerDetalleEstudiante,
} from "../controllers/estudiantes.controller.js";

const router = Router();


// Ruta para obtener todos los estudiantes
router.get("/todos", obtenerTodosEstudiantes);

// Ruta para crear un nuevo estudiante
router.post("/crear", crearEstudiante);

// Ruta para buscar estudiantes por nombre o RUT
router.get("/buscar", buscarEstudiantes);

// Ruta para obtener el detalle de un estudiante por RUT
router.get("/obtenerDetalle", obtenerDetalleEstudiante);

export default router;
