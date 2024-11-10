import { HistorialAcademico } from "../models/HistorialAcademico.js"
import { AsignaturasIPC } from "../models/AsignaturasIPC.js"
import { AsignaturasEquivalentes } from "../models/AsignaturasEquivalentes.js"
import { Sequelize } from "sequelize";

// Obtener el historial académico del estudiante
export async function getHistorial_(rut){
  try {
    const historial = await HistorialAcademico.findAll({
      attributes: ['codigo_IPC'],
      include: [{
        model: AsignaturasIPC,
        attributes: ['nombre_IPC'],
        required: true // Asegura que solo se devuelvan los registros que tienen asignaturas
      }],
      where: { rut_estudiante: rut }
    });

    return historial;
  } catch (error) {
    console.error("Error al obtener el historial académico:", error);
    throw error; // Lanza el error para ser manejado en el controlador
  }
};

// Obtener equivalencias de las asignaturas en la carrera de destino
export async function getEquivalencias_(rut){
  try {
    const equivalencias = await AsignaturasIPC.findAll({
      attributes: ['codigo_IPC', 'nombre_IPC'],
      include: [{
        model: AsignaturasEquivalentes,
        attributes: ['codigo_destino', 'nombre', 'carrera'],
        where: {
          carrera: sequelize.literal(`(SELECT e.carreraDestino FROM estudiante e WHERE e.rut = '${rut}')`)
        },
        required: true // Asegura que solo se devuelvan los registros que tienen asignaturas de destino
      }],
      where: {
        codigo_IPC: {
          [Op.in]: sequelize.literal(`(SELECT ha.codigo_IPC FROM historialAcademico ha WHERE ha.rut_estudiante = '${rut}')`)
        }
      }
    });

    return equivalencias;
  } catch (error) {
    console.error("Error al obtener equivalencias:", error);
    throw error; // Lanza el error para ser manejado en el controlador
  }
};

export async function getCarreras_(){
  try {
    const carreras = await AsignaturasEquivalentes.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('carrera')), 'carrera']
      ],
      raw: true,
    });
    return carreras; // Devuelve un array con las carreras únicas
  } catch (error) {
    console.error('Error al obtener las carreras únicas:', error);
    throw error;
  }
};
