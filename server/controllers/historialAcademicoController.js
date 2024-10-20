const historialAcademicoModel = require('../models/historialAcademicoModel.js')

exports.obtenerHistorial = (req, res) => {
  historialAcademicoModel.obtenerTodo((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.agregarRegistro = (req, res) => {
  const { rut_estudiante, codigo_IPC, nota, ano, semestre, estado } = req.body;
  historialAcademicoModel.agregar({ rut_estudiante, codigo_IPC, nota, ano, semestre, estado }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Registro académico añadido con éxito");
    }
	});
};

exports.obtenerHistorialPorRut = (req, res) => {
  const { query: rut } = req.query;

  if (!rut) {
    return res.status(400).json({ error: "El RUT es necesario para la búsqueda" });
  }

  historialAcademicoModel.obtenerPorRut(rut, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res.json(results);
  });
};