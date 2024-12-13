import { User } from "../models/User.js";

export async function getUserPassword_() {
  try {
    const users = await User.findAll({
      attributes: ['hashed_password'], // Solo selecciona el atributo hashed_password
      limit: 1 // Limita el resultado a 1
    });
    console.log("Resultado de la búsqueda:", users);
    return users; // Retorna el resultado
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error; // Lanza el error para manejarlo más arriba en la cadena
  }
}