//estudiantes.controller.js

import {
  getEstudiantes_,
  createEstudiante_,
  getEstudiante_,
  getDetalle_,
  cargaMasiva_,
  eliminarEstudiante_,
  cargaCarreraDestino_,
} from "../repository/estudiantes.repository.js";

import { Estudiante } from "../models/Estudiantes.js";

export async function getEstudiantes(req, res) {
  getEstudiantes_().then(
    (data) => {
      res.json(data);
      // res.status(200).json({status : true, data : data})
    },
    (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

//eliminar estudiante
export async function eliminarEstudiante(req, res) {
  const { query: rut } = req.query;

  if (!rut) {
    return res
      .status(400)
      .json({ error: "El RUT es necesario para la eliminación" });
  }

  eliminarEstudiante_(rut).then(
    (data) => {
      res.status(200).json(data); // Enviamos el mensaje de éxito
    },
    (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

export async function createEstudiante(req, res) {
  const { nombre, rut, carreraDestino, ano } = req.body;
  const estudiante = {
    nombre,
    rut,
    carreraDestino,
    ano,
  };

  createEstudiante_(estudiante).then(
    (data) => {
      res.status(500).send(err);
    },
    (error) => {
      res.status(201).send("Estudiante creado con éxito");
    }
  );
}

export async function cargaMasiva(req, res) {
  // Se espera que los estudiantes sean enviados en el cuerpo de la solicitud (req.body)
  const estudiantes = req.body;

  try {
    // Llamamos a la función cargaMasiva que ya tiene la lógica para manejar la carga masiva de estudiantes
    const resultados = await cargaMasiva_(estudiantes);

    // Si la carga es exitosa, devolvemos los resultados
    res.status(201).send({
      message: "Estudiantes cargados con éxito",
      estudiantes: resultados, // Opcionalmente, podemos devolver los estudiantes creados
    });
  } catch (error) {
    console.error("Error en la carga masiva de estudiantes:", error);
    // En caso de error, respondemos con un mensaje de error
    res.status(500).send({
      message: "Error al cargar los estudiantes",
      error: error.message,
    });
  }
}

export async function getEstudiante(req, res) {
  const { query } = req.query;

  getEstudiante_(query).then(
    (data) => {
      res.json(data);
      // res.status(200).json({status : true, data : data})
    },
    (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

export async function getDetalle(req, res) {
  const { query: rut } = req.query;

  if (!rut) {
    return res
      .status(400)
      .json({ error: "El RUT es necesario para la búsqueda" });
  }

  getDetalle_(rut).then(
    (data) => {
      res.json(data);
      // res.status(200).json({status : true, data : data})
    },
    (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

// Definir la función cargarCarreraDestino
export const cargarCarreraDestino = async (req, res) => {
  const { rut } = req.params;
  const { carreraDestino } = req.body;

  try {
    const estudiante = await Estudiante.findOne({ where: { rut } });

    if (!estudiante) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    estudiante.carreraDestino = carreraDestino;
    await estudiante.save();

    res.status(200).json({ message: "Carrera destino actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la carrera destino:", error); // Mostrar el error completo
    res.status(500).json({
      message: "Hubo un error al actualizar la carrera destino",
      error: error.message,  // Añadir el mensaje de error
      stack: error.stack,    // Mostrar el stack trace
    });
  }
};


export const eliminarCarreraDestino = async (req, res) => {
  const { rut } = req.params; // Obtener el RUT del parámetro de la URL

  try {
    // Buscar al estudiante por su RUT
    const estudiante = await Estudiante.findOne({ where: { rut } });

    if (!estudiante) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    // Actualizar el campo 'carreraDestino' del estudiante a null
    const result = await Estudiante.update(
      { carreraDestino: null }, // Establecer 'carreraDestino' como null
      { where: { rut } }
    );

    if (result[0] > 0) { // Si se ha actualizado correctamente
      return res.status(200).json({ message: "Carrera destino eliminada exitosamente." });
    } else {
      return res.status(404).json({ message: "No se encontró la carrera destino para el estudiante con el RUT proporcionado." });
    }
  } catch (error) {
    console.error("Error al eliminar la carrera destino:", error);
    return res.status(500).json({ message: "Hubo un error al eliminar la carrera destino." });
  }
};