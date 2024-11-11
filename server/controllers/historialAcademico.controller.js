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
    const registros = await obtenerPorRut_(rut); // Obtén los registros desde el repositorio+

    // Transformación de los datos al formato requerido
    const formattedData = registros.map((registro) => {
      return {
        codigo_IPC: registro.AsignaturasIPC.codigo_IPC,
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