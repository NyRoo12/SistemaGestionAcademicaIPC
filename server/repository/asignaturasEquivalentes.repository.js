import { Sequelize, Op } from 'sequelize';
import { AsignaturasIPC } from '../models/AsignaturasIPC.js';
import { AsignaturasEquivalentes } from '../models/AsignaturasEquivalentes.js';
import { HistorialAcademico } from '../models/HistorialAcademico.js';
import { Estudiante } from '../models/Estudiantes.js';

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

export async function getEquivalencias_(rut) {
  try {
    // Primero, obtenemos la carrera del estudiante con el rut proporcionado
    const carreraDestino = await Estudiante.findOne({
      attributes: ['carreraDestino'],
      where: { rut: rut }
    });

    // Luego, obtenemos las asignaturas del historial académico
    const historial = await HistorialAcademico.findAll({
      attributes: ['codigo_IPC'],
      where: { rut_estudiante: rut }
    });

    // Ahora, buscamos las equivalencias de asignaturas
    const equivalencias = await AsignaturasIPC.findAll({
      include: [{
        model: AsignaturasEquivalentes,
        attributes: ['codigo_destino', 'nombre', 'carrera'],
        where: {
          codigo_IPC: { [Op.in]: historial.map((record) => record.codigo_IPC) },
          carrera: carreraDestino ? carreraDestino.carreraDestino : null
        }
      }],
      where: {
        codigo_IPC: { [Op.in]: historial.map((record) => record.codigo_IPC) },
      }
    });

    return equivalencias;
  } catch (error) {
    console.error("Error al obtener equivalencias:", error);
    throw error;
  }
}


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