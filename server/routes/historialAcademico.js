const express = require("express");
const router = express.Router();
const connection = require("../config/db");

// Obtener todo el historial académico
router.get("/", (req, res) => {
  connection.query("SELECT * FROM historialAcademico", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Agregar un registro al historial académico
router.post("/", (req, res) => {
  const { rut_estudiante, codigo_IPC, nota, ano, semestre, estado } = req.body;
  const query =
    "INSERT INTO historialAcademico (rut_estudiante, codigo_IPC, nota, ano, semestre, estado) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [rut_estudiante, codigo_IPC, nota, ano, semestre, estado],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send("Registro académico añadido con éxito");
      }
    }
  );
});

router.get("/obtenerHistorial", (req, res) => {
  const { query: rut } = req.query;

  if (!rut) {
    return res
      .status(400)
      .json({ error: "El RUT es necesario para la búsqueda" });
  }

  // Consulta a la base de datos
  const sql = `SELECT asignaturasIPC.codigo_IPC, nombre_IPC, nota, ano, semestre, estado FROM historialAcademico INNER JOIN asignaturasIPC ON historialAcademico.codigo_IPC = asignaturasIPC.codigo_IPC WHERE historialAcademico.rut_estudiante = ? `;

  connection.query(sql, [rut], (error, results) => {
    if (error) {
      console.error("Error en la consulta:", error);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    // Enviar los resultados de vuelta al frontend
    res.json(results); // Retornar solo el primer resultado, ya que RUT es único
  });
});

module.exports = router;
