import { obtenerTodos_, crearEstudiante_, buscar_, obtenerDetalle_ } from "../repository/estudiantes.repository.js";

export async function obtenerTodosEstudiantes(req, res) {
  obtenerTodos_((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
}

export async function crearEstudiante(req, res) {
  const { nombre, rut, carreraDestino } = req.body;

  crearEstudiante_({ nombre, rut, carreraDestino }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Estudiante creado con éxito");
    }
  });
}

export async function buscarEstudiantes(req, res) {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: "El parámetro de búsqueda es necesario" });
  }

  buscar_(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
}

export async function obtenerDetalleEstudiante(req, res) {
  const { query: rut } = req.query;

  if (!rut) {
    return res
      .status(400)
      .json({ error: "El RUT es necesario para la búsqueda" });
  }

  obtenerDetalle_(rut, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Estudiante no encontrado" });
    } else {
      res.json(result[0]); // Retornar solo el primer resultado
    }
  });
}