import { AsignaturasIPC } from "../models/AsignaturasIPC.js";

//-------------------------------------------------------------------------------------------------------

// Función para obtener todos los registros de historial académico
export async function obtenerTodo_() {
  try {
    const registros = await HistorialAcademico.findAll();
    return registros;
  } catch (error) {
    throw new Error("Error al obtener los registros: " + error.message);
  }
}

// Función para agregar un nuevo registro al historial académico
export async function agregar_({
  rut_estudiante,
  codigo_IPC,
  nota,
  ano,
  semestre,
  estado,
}) {
  try {
    const nuevoRegistro = await HistorialAcademico.create({
      rut_estudiante,
      codigo_IPC,
      nota,
      ano,
      semestre,
      estado,
    });
    return nuevoRegistro;
  } catch (error) {
    throw new Error("Error al agregar el registro: " + error.message);
  }
}

// Función para obtener el historial academico del estudiante mediante el rut

export async function obtenerPorRut_(rut) {
  try {
    const registros = await HistorialAcademico.findAll({
      where: { rut_estudiante: rut },
      include: [
        {
          model: AsignaturasIPC,
          attributes: ["codigo_IPC", "nombre_IPC"],
        },
      ],
      attributes: ["nota", "ano", "semestre", "estado"],
    });
    return registros;
  } catch (error) {
    throw new Error("Error al obtener los registros: " + error.message);
  }
}