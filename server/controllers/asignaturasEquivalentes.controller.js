import {getHistorial_, getEquivalencias_} from "../repository/asignaturasEquivalentes.repository.js";

export async function getEquivalencias(req, res) {
  const { query: rut } = req.query;

  if (!rut) {
    return res.status(400).json({ error: "El RUT es necesario para obtener las equivalencias" });
  }

  getHistorial_(rut, (errorHistorial, resultsHistorial) => {
    if (errorHistorial) {
      console.error("Error en la consulta del historial académico:", errorHistorial);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (resultsHistorial.length === 0) {
      return res.status(404).json({ error: "No se encontraron asignaturas en el historial académico" });
    }

    getEquivalencias_(rut, (errorEquivalencias, resultsEquivalencias) => {
      if (errorEquivalencias) {
        console.error("Error en la consulta de equivalencias:", errorEquivalencias);
        return res.status(500).json({ error: "Error en la base de datos" });
      }

      if (resultsEquivalencias.length === 0) {
        return res.status(404).json({ error: "No se encontraron equivalencias para las asignaturas del estudiante en la carrera de destino" });
      }

      // Enviar los resultados al frontend
      res.json(resultsEquivalencias);
    });
  });
};