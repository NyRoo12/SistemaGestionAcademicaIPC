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

router.get("/obtenerDetalle", (req, res) => {
  const { query: rut } = req.query;

  if (!rut) {
    return res
      .status(400)
      .json({ error: "El RUT es necesario para la búsqueda" });
  }

  // Consulta a la base de datos
  const sql = `SELECT estudiante.nombre AS estudiante_nombre, estudiante.rut AS estudiante_rut, estudiante.carreraDestino AS estudiante_carreraDestino, historialAcademico.codigo_IPC AS asignatura_codigo_IPC, asignaturasIPC.nombre_IPC AS asignatura_nombre, historialAcademico.nota AS nota, historialAcademico.ano AS ano, historialAcademico.semestre AS semestre, asignaturasDestino.codigo_destino AS asignatura_destino_codigo, asignaturasDestino.carrera AS asignatura_destino_carrera, asignaturasDestino.nombre AS asignatura_destino_nombre FROM estudiante JOIN historialAcademico ON estudiante.rut = historialAcademico.rut_estudiante JOIN asignaturasIPC ON historialAcademico.codigo_IPC = asignaturasIPC.codigo_IPC LEFT JOIN asignaturasDestino ON asignaturasIPC.codigo_IPC = asignaturasDestino.codigo_IPC WHERE estudiante.rut = ? ORDER BY historialAcademico.ano, historialAcademico.semestre`;

  connection.query(sql, [rut], (error, results) => {
    if (error) {
      console.error("Error en la consulta:", error);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    // Enviar los resultados de vuelta al frontend
    res.json(results[0]); // Retornar solo el primer resultado, ya que RUT es único
  });
});

module.exports = router;
