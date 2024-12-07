import { crearLog, obtenerLogs } from '../repository/logs.repository.js';
import Logs from '../models/logs.model.js';


// Controlador para obtener todos los logs
export const listarLogs = async (req, res) => {
  try {
    const logs = await obtenerLogs();
    res.json({
      mensaje: 'Logs obtenidos con éxito',
      datos: logs.map(log => ({
        id: log.id,
        accion: log.accion,
        Rut: log.rut,
        descripcion: log.descripcion,
        fecha: log.fecha,
      })),
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los logs',
      error: error.message,
    });
  }
};

// Controlador para vaciar la tabla de logs
export const vaciarLogs = async (req, res) => {
  try {
    await Logs.destroy({ where: {}, truncate: true }); // Elimina todos los registros
    res.json({
      mensaje: 'Tabla de logs vaciada con éxito',
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al vaciar la tabla de logs',
      error: error.message,
    });
  }
};