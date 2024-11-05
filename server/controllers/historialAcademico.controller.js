import { HistorialAcademico } from "../models/HistorialAcademico.js";
import {
  obtenerTodo_,
  agregar_,
  obtenerPorRut_,
} from "../repository/historialAcademico.repository.js";

export async function obtenerHistorial(req, res) {
  try {
    const data = await obtenerTodo_(); // Usa await para simplificar
    res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
}

export async function obtenerHistorialPorRut(req, res) {
  const { rut } = req.params;
  try {
    const msg = await obtenerPorRut_(rut); // Usa await para simplificar
    res.status(200).json({ status: true, msg: msg });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
}

export async function agregar(req, res) {
  const { rut_estudiante, codigo_IPC, nota, ano, semestre, estado } = req.body; // Extrae datos del cuerpo de la solicitud
  try {
    const nuevoHistorialAcademico = await agregar_({
      rut_estudiante,
      codigo_IPC,
      nota,
      ano,
      semestre,
      estado,
    });
    res.status(201).json({ status: true, data: nuevoHistorialAcademico }); // Responde con el nuevo registro
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
}