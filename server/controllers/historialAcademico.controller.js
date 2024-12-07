//historialAcademico.controller

import { HistorialAcademico } from "../models/HistorialAcademico.js";
import { Estudiante } from "../models/Estudiantes.js";
import { Op, Sequelize } from "sequelize";
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
    const registros = await obtenerPorRut_(rut); // Obtén los registros desde el repositorio+

    // Transformación de los datos al formato requerido
    const formattedData = registros.map((registro) => {
      return {
        codigo_IPC: registro.AsignaturasIPC.codigo_IPC,
        codigo_IPC_bruto: registro.codigo_IPC_bruto,
        nombre_IPC: registro.AsignaturasIPC.nombre_IPC,
        nota: registro.nota.toFixed(1), // Aseguramos que sea un string con un decimal
        semestre: registro.semestre === '1' ? 'Diurno' : 'Vespertino', // Ejemplo de mapeo de régimen
        Nivel: "1", // Puedes ajustar esto según tus datos
        ano: registro.ano.toString(),
        semestre: registro.semestre,
        Créditos: "10", // Ejemplo de valor fijo o puedes ajustarlo según tus datos
        HrsPresenciales: "40", // Ejemplo de valor fijo o ajustado
        estado: parseFloat(registro.nota) >= 4 ? 1 : 0,
      };
    });

    res.status(200).json(formattedData); // Enviar solo el arreglo de datos formateado
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
}

export async function agregar(req, res) {
  const { rut } = req.params; // El rut se obtiene desde los parámetros de la URL
  const historial = req.body; // Se espera un arreglo con los registros del historial académico

  try {
    // Validar si el estudiante existe
    const estudiante = await Estudiante.findOne({ where: { rut } });
    if (!estudiante) {
      return res.status(400).json({ status: false, error: "Estudiante no encontrado" });
    }

    // Array para almacenar los registros agregados
    const registros = [];
    for (const item of historial) {
      // Asegurarse de que los campos necesarios estén presentes en el objeto
      const { Código, Nombre, Nota, Régimen, Nivel, Año, Periodo, Créditos, HrsPresenciales, Estado } = item;

      // Verificar que los valores sean válidos
      if (!Código || !Nota || !Año || !Periodo || !Estado) {
        return res.status(400).json({ status: false, error: "Faltan campos obligatorios en el historial académico" });
      }

      const estado = parseFloat(Nota) >= 4 ? 1 : 0;

      // Crear un nuevo registro para cada asignatura en el historial
      const nuevoRegistro = await HistorialAcademico.create({
        rut_estudiante: rut,
        codigo_IPC_bruto: Código, // Ahora usamos `Codigo` para `codigo_IPC_bruto`
        nota: parseFloat(Nota),
        ano: parseInt(Año, 10),
        semestre: Periodo,
        estado,
      });      
      registros.push(nuevoRegistro);
    }

    // Responder con los registros agregados
    res.status(201).json({ status: true, data: registros });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
}

export async function obtenerEstudiantesSinHistorial(req, res) {
  try {
    // Buscamos los estudiantes sin historial académico
    const estudiantesSinHistorial = await Estudiante.findAll({
      where: Sequelize.literal(`NOT EXISTS (SELECT 1 FROM HistorialAcademico WHERE HistorialAcademico.rut_estudiante = Estudiante.rut)`),
    });

    // Mapeamos los estudiantes para devolver solo el rut, nombre y año
    const estudiantesData = estudiantesSinHistorial.map(estudiante => ({
      rut: estudiante.rut,
      nombre: estudiante.nombre,  // Asumiendo que 'nombre' es el campo correcto para el nombre
      ano: estudiante.ano,        // Asumiendo que 'ano' es el campo correcto para el año
    }));

    // Enviar la respuesta con los datos
    res.status(200).json({
      status: true,
      data: estudiantesData,  // El resultado contiene los campos rut, nombre y ano
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error.message,
    });
  }
}

export const eliminarHistorial = async (req, res) => {
  const { rut } = req.params; // Obtener el RUT del parámetro de la URL

  try {
    // Eliminar todos los registros del historial académico del estudiante con el RUT especificado
    const result = await HistorialAcademico.destroy({
      where: {
        rut_estudiante: rut, // Filtrar por el RUT del estudiante
      },
    });

    if (result > 0) { // Si se han eliminado registros
      return res.status(200).json({ message: "Historial académico eliminado exitosamente." });
    } else {
      return res.status(404).json({ message: "No se encontró historial académico para el estudiante con el RUT proporcionado." });
    }
  } catch (error) {
    console.error("Error al eliminar el historial académico:", error);
    return res.status(500).json({ message: "Hubo un error al eliminar el historial académico." });
  }
};
