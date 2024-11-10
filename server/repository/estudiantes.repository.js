import { Estudiante } from "../models/Estudiantes.js";
import { Op } from "sequelize";

// Obtener todos los estudiantes
export async function getEstudiantes_() {
  try {
    const estudiantes = await Estudiante.findAll({
      attributes: ["nombre", "rut", "carreraDestino", "ano"],
      order: [["nombre", "DESC"]],
    });
    return estudiantes;
  } catch (error) {
    throw new Error("Error al obtener todos los estudiantes");
  }
}

// Eliminar estudiante por RUT
export async function eliminarEstudiante_(rut) {
  try {
    const estudiante = await Estudiante.findOne({
      where: { rut: rut },
    });

    if (!estudiante) {
      throw new Error("Estudiante no encontrado");
    }

    await Estudiante.destroy({
      where: { rut: rut },
    });

    return { message: "Estudiante eliminado con éxito" };
  } catch (error) {
    throw new Error("Error al eliminar el estudiante: " + error.message);
  }
}

// Crear un nuevo estudiante
export async function createEstudiante_(estudiante) {
  const { rut, nombre, ano, carreraDestino } = estudiante;
  try {
    const nuevoEstudiante = await Estudiante.create({
      nombre,
      rut,
      carreraDestino,
      ano,
    });
    return nuevoEstudiante;
  } catch (error) {
    console.error("Error al crear el estudiante:", error);
    throw new Error("Error al crear el estudiante");
  }
}

//Cargar lista de estudiantes
export async function cargaMasiva_(estudiantes) {
  try {
    // Modificar los estudiantes solo para carga masiva
    const estudiantesConCarreraNull = estudiantes.map((estudiante) => ({
      ...estudiante, // Mantiene los atributos existentes (rut, nombre, ano)
      carreraDestino: null, // Asigna carreraDestino como null
    }));

    // Usar createEstudiante_ con los estudiantes modificados
    const resultados = await Promise.all(
      estudiantesConCarreraNull.map((estudiante) =>
        createEstudiante_(estudiante)
      )
    );
    return resultados;
  } catch (error) {
    console.error("Error al realizar la carga masiva de estudiantes:", error);
    throw new Error("Error al realizar la carga masiva de estudiantes");
  }
}

// Buscar estudiantes por nombre o RUT
export async function getEstudiante_(query) {
  try {
    const searchValue = `${query}%`;
    console.log(searchValue);
    const estudiantes = await Estudiante.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: searchValue } },
          { rut: { [Op.like]: searchValue } },
        ],
      },
    });
    // console.log(estudiantes);
    return estudiantes;
  } catch (error) {
    console.log("Error al buscar estudiantes", error);
  }
}

// Obtener detalle de un estudiante por RUT
export async function getDetalle_(rut) {
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
