import Logs from '../models/logs.model.js';

// Repositorio para crear un log
export const crearLog = async (accion, descripcion, rut = null) => {
  try {
    const log = await Logs.create({ accion, descripcion, rut });
    return log;
  } catch (error) {
    console.error('Error al crear un log:', error);
    throw error;
  }
};

export const obtenerLogs = async () => {
  try {
    return await Logs.findAll();
  } catch (error) {
    console.error('Error al obtener los logs:', error);
    throw error;
  }
};
