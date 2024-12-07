//historialAcademico.controller
import {
  getTodoHistorial_,
  postHistorial_,
  verificarEstudiante_,
  getHistorialPorRut_,
  getEstudiantesSinHistorial_,
  deleteHistorial_,
} from "../repository/historialAcademico.repository.js";


export async function getTodoHistorial(req, res) {
  try {
    const data = await getTodoHistorial_(); // Usa await para simplificar
    res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
}

export async function getHistorialPorRut(req, res) {
  const { rut } = req.params;
  try {
    const registros = await getHistorialPorRut_(rut); // Obtén los registros desde el repositorio+

    // Transformación de los datos al formato requerido
    const formattedData = registros.map((registro) => {
      return {
        codigo_IPC: registro.AsignaturasIPC.codigo_IPC,
        codigo_IPC_bruto:registro.codigo_IPC_bruto,
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

export async function postHistorial(req, res) {
  const { rut } = req.params; // El RUT del estudiante se obtiene desde los parámetros
  const historial = req.body; // El cuerpo contiene el historial académico a agregar

  try {
    // Validar si el estudiante existe usando la función en la URL proporcionada
    const estudianteExiste = await verificarEstudiante_(rut);
    if (!estudianteExiste) {
      return res.status(404).json({ status: false, error: "Estudiante no encontrado" });
    }

    // Llamar a la función del repositorio para agregar el historial
    const registros = await postHistorial_(rut, historial);

    return res.status(201).json({ status: true, data: registros });
  } catch (error) {
    console.error("Error al agregar el historial académico:", error);
    return res.status(400).json({ status: false, error: error.message });
  }
}

export async function getEstudiantesSinHistorial(req, res) {
  try {
    // Llama al repositorio para obtener los estudiantes sin historial
    const estudiantesSinHistorial = await getEstudiantesSinHistorial_();

    // Mapeamos los estudiantes para devolver solo los campos necesarios
    const estudiantesData = estudiantesSinHistorial.map(estudiante => ({
      rut: estudiante.rut,
      nombre: estudiante.nombre,  // Asumiendo que 'nombre' es el campo correcto
      ano: estudiante.ano,        // Asumiendo que 'ano' es el campo correcto
    }));

    // Responder con los datos procesados
    res.status(200).json({
      status: true,
      data: estudiantesData,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error.message,
    });
  }
}

export const deleteHistorial = async (req, res) => {
  const { rut } = req.params; // Obtener el RUT del parámetro de la URL

  try {
    // Llama al repositorio para eliminar los registros del historial académico
    const result = await deleteHistorial_(rut);

    if (result > 0) {
      return res.status(200).json({ message: "Historial académico eliminado exitosamente." });
    } else {
      return res.status(404).json({ message: "No se encontró historial académico para el estudiante con el RUT proporcionado." });
    }
  } catch (error) {
    console.error("Error al eliminar el historial académico:", error);
    return res.status(500).json({ message: "Hubo un error al eliminar el historial académico." });
  }
};