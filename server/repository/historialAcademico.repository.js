import { AsignaturasIPC } from "../models/AsignaturasIPC.js";
import { HistorialAcademico } from "../models/HistorialAcademico.js";

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

export async function agregar_({
  rut_estudiante,
  codigo_IPC,
  nota,
  ano,
  semestre,
  estado,
}) {
  try {
    const estudiante = await Estudiante.findOne({ where: { rut: rut_estudiante } });
    if (!estudiante) {
      throw new Error("Estudiante no encontrado");
    }

    // Verificar si la asignatura IPC existe
    const asignatura = await AsignaturasIPC.findOne({ where: { codigo_IPC } });
    if (!asignatura) {
      throw new Error("Asignatura IPC no encontrada");
    }

    // Crear el nuevo registro de historial académico
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