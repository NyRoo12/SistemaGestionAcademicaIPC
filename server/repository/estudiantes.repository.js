import Estudiante from "../models/Estudiantes.js";

// Obtener todos los estudiantes
export async function obtenerTodos_() {
  try {
    const estudiantes = await Estudiante.findAll();
    return estudiantes;
  } catch (error) {
    throw new Error("Error al obtener todos los estudiantes");
  }
}

// Crear un nuevo estudiante
export async function crearEstudiante_(estudiante) {
  try {
    const nuevoEstudiante = await Estudiante.create({
      nombre: estudiante.nombre,
      rut: estudiante.rut,
      carreraDestino: estudiante.carreraDestino,
    });
    return nuevoEstudiante;
  } catch (error) {
    throw new Error("Error al crear el estudiante");
  }
}

// Buscar estudiantes por nombre o RUT
export async function buscar_(query) {
  try {
    const searchValue = `%${query}%`;
    const estudiantes = await Estudiante.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: searchValue } },
          { rut: { [Op.like]: searchValue } },
        ],
      },
    });
    return estudiantes;
  } catch (error) {
    throw new Error("Error al buscar estudiantes");
  }
}

// Obtener detalle de un estudiante por RUT
export async function obtenerDetalle_(rut) {
  try {
    const estudiante = await Estudiante.findOne({
      where: { rut: rut },
      attributes: ["nombre", "rut", "carreraDestino"], // Selecciona columnas especÃ­ficas
    });
    return estudiante;
  } catch (error) {
    throw new Error("Error al obtener el detalle del estudiante");
  }
}