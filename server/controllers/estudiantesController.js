const estudiantesModel = require("../models/estudiantesModel");

exports.obtenerTodosEstudiantes = (req, res) => {
  estudiantesModel.obtenerTodos((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.crearEstudiante = (req, res) => {
  const { nombre, rut, carreraDestino } = req.body;

  estudiantesModel.crear({ nombre, rut, carreraDestino }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Estudiante creado con éxito");
    }
  });
};

exports.buscarEstudiantes = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "El parámetro de búsqueda es necesario" });
  }

  estudiantesModel.buscar(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else {
      res.json(results);
    }
  });
};

exports.obtenerDetalleEstudiante = (req, res) => {
  const { query: rut } = req.query;

  if (!rut) {
    return res.status(400).json({ error: "El RUT es necesario para la búsqueda" });
  }

  estudiantesModel.obtenerDetalle(rut, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error en la base de datos" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "Estudiante no encontrado" });
    } else {
      res.json(result[0]); // Retornar solo el primer resultado
    }
  });
};
