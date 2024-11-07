import { Estudiante } from "../models/Estudiantes.js";
import { Op } from 'sequelize';

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

// Crear un nuevo estudiante
export async function createEstudiante_(estudiante) {
  const { nombre, rut, carreraDestino } = estudiante
  try {
    const nuevoEstudiante = await Estudiante.create({
      nombre,
      rut,
      carreraDestino,
    });
    return nuevoEstudiante;
  } catch (error) {
    throw new Error("Error al crear el estudiante");
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
          { rut: { [Op.like]: searchValue } }
        ]        
      }
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