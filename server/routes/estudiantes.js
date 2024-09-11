const express = require("express");
const router = express.Router();
const connection = require("../config/db");

// Obtener todos los estudiantes
router.get("/todos", (req, res) => {
  connection.query("SELECT * FROM estudiante", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Crear un nuevo estudiante
router.post("/", (req, res) => {
  const { nombre, rut, carreraDestino } = req.body;
  const query =
    "INSERT INTO estudiante (nombre, rut, carreraDestino) VALUES (?, ?, ?)";
  connection.query(query, [nombre, rut, carreraDestino], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Estudiante creado con éxito");
    }
  });
});

router.get("/buscar", (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: "El parámetro de búsqueda es necesario" });
  }

  // Consulta a la base de datos
  const sql = `SELECT * FROM estudiante WHERE nombre LIKE ? OR rut LIKE ?`;
  const searchValue = `%${query}%`;

  connection.query(sql, [searchValue, searchValue], (error, results) => {
    if (error) {
      console.error("Error en la consulta:", error);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    // Enviar los resultados de vuelta al frontend
    res.json(results);
  });
});

module.exports = router;
