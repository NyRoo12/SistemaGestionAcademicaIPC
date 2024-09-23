const express = require("express");
const router = express.Router();
const connection = require("../config/db");

// Obtener equivalencias de asignaturas
router.get("/obtenerEquivalencias", (req, res) => {
  const { query: rut } = req.query;

  if (!rut) {
    return res
      .status(400)
      .json({ error: "El RUT es necesario para obtener las equivalencias" });
  }

  // Consulta para obtener el historial académico del estudiante
  const sqlHistorial = `
    SELECT ha.codigo_IPC, a.nombre_IPC
    FROM historialAcademico ha
    JOIN asignaturasIPC a ON ha.codigo_IPC = a.codigo_IPC
    WHERE ha.rut_estudiante = ?`;

  connection.query(sqlHistorial, [rut], (errorHistorial, resultsHistorial) => {
    if (errorHistorial) {
      console.error("Error en la consulta del historial académico:", errorHistorial);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (resultsHistorial.length === 0) {
      return res.status(404).json({ error: "No se encontraron asignaturas en el historial académico" });
    }

    // Consulta para obtener las equivalencias de las asignaturas en la carrera de destino
    // const sqlEquivalencias = `
    //   SELECT ad.codigo_destino, ad.nombre, ad.carrera
    //   FROM asignaturasDestino ad
    //   WHERE ad.codigo_IPC IN (
    //     SELECT ha.codigo_IPC
    //     FROM historialAcademico ha
    //     WHERE ha.rut_estudiante = ?
    //   )`;
    const sqlEquivalencias = `
  SELECT ipc.codigo_IPC, ipc.nombre_IPC, ad.codigo_destino, ad.nombre, ad.carrera
  FROM asignaturasIPC ipc
  JOIN asignaturasDestino ad ON ipc.codigo_IPC = ad.codigo_IPC
  WHERE ipc.codigo_IPC IN (
    SELECT ha.codigo_IPC
    FROM historialAcademico ha
    WHERE ha.rut_estudiante = ?
    )
    AND ad.carrera = (
    SELECT e.carreraDestino
    FROM estudiante e
    WHERE e.rut = ?
  )`;


  connection.query(sqlEquivalencias, [rut, rut], (errorEquivalencias, resultsEquivalencias) => {
    if (errorEquivalencias) {
      console.error("Error en la consulta de equivalencias:", errorEquivalencias);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
  
    if (resultsEquivalencias.length === 0) {
      return res.status(404).json({ error: "No se encontraron equivalencias para las asignaturas del estudiante en la carrera de destino" });
    }
  
    // Enviar los resultados de vuelta al frontend
    res.json(resultsEquivalencias);
  });
  });
});

module.exports = router;