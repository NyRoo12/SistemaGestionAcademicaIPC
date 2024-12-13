import { AsignaturasIPC } from "../models/AsignaturasIPC.js";
import { HistorialAcademico } from "../models/HistorialAcademico.js";
import { Estudiante } from "../models/Estudiantes.js";
import { Op, Sequelize } from "sequelize";

//-------------------------------------------------------------------------------------------------------

export async function getEstudiantesSinHistorial_() {
  return await Estudiante.findAll({
    where: Sequelize.literal(
      `NOT EXISTS (SELECT 1 FROM historialAcademico WHERE historialAcademico.rut_estudiante = Estudiante.rut)`
    ),
  });
}

// Función para obtener todos los registros de historial académico
export async function getTodoHistorial_() {
  try {
    const registros = await HistorialAcademico.findAll();
    return registros;
  } catch (error) {
    throw new Error("Error al obtener los registros: " + error.message);
  }
}

export async function verificarEstudiante_(rut) {
  try {
    const estudiante = await Estudiante.findOne({ where: { rut } });
    return !!estudiante; // Retorna true si existe, false si no
  } catch (error) {
    throw new Error("Error al verificar la existencia del estudiante.");
  }
}

export async function postHistorial_(rut, historial) {
  const registros = []; // Array para almacenar los registros creados

  try {
    for (const item of historial) {
      // Desestructuración de los campos necesarios
      const { Código, Nota, Año, Periodo, Estado } = item;

      // Verificar campos obligatorios
      if (!Código || !Nota || !Año || !Periodo || !Estado) {
        throw new Error("Faltan campos obligatorios en el historial académico.");
      }

      // Determinar estado del registro en base a la nota
      const estado = parseFloat(Nota) >= 4 ? 1 : 0;

      // Crear el nuevo registro
      const nuevoRegistro = await HistorialAcademico.create({
        rut_estudiante: rut,
        codigo_IPC_bruto: Código,
        nota: parseFloat(Nota),
        ano: parseInt(Año, 10),
        semestre: Periodo,
        estado,
      });

      registros.push(nuevoRegistro); // Agregar el registro al array
    }

    return registros; // Retornar los registros creados
  } catch (error) {
    throw new Error(`Error al agregar el historial académico: ${error.message}`);
  }
}

// Función para obtener el historial academico del estudiante mediante el rut

export async function getHistorialPorRut_(rut) {
  try {
    const registros = await HistorialAcademico.findAll({
      where: { rut_estudiante: rut },
      include: [
        {
          model: AsignaturasIPC,
          attributes: ["codigo_IPC", "nombre_IPC"],
        },
      ],
      attributes: ["codigo_IPC_bruto","nota", "ano", "semestre", "estado"],
    });
    return registros;
  } catch (error) {
    throw new Error("Error al obtener los registros: " + error.message);
  }
}

export async function deleteHistorial_(rut) {
  return await HistorialAcademico.destroy({
    where: {
      rut_estudiante: rut, // Filtrar por el RUT del estudiante
    },
  });
}