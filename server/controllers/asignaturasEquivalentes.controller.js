import { getHistorial_, getEquivalencias_, getCarreras_, } from "../repository/asignaturasEquivalentes.repository.js";

export async function getEquivalencias(req, res) {
  const { query: rut } = req.query;

  if (!rut) {
    return res.status(400).json({ error: "El RUT es necesario para obtener las equivalencias" });
  }

  getHistorial_(rut)
  .then(resultsHistorial => {
    if (resultsHistorial.length === 0) {
      return res.status(404).json({ error: "No se encontraron asignaturas en el historial académico" });
    }

    return getEquivalencias_(rut);
  })
  .then(resultsEquivalencias => {
    if (resultsEquivalencias.length === 0) {
      return res.status(404).json({ error: "No se encontraron equivalencias para las asignaturas del estudiante en la carrera de destino" });
    }

    // Enviar los resultados al frontend
    res.json(resultsEquivalencias);
  })
  .catch(error => {
    console.error("Error en la consulta:", error);
    res.status(500).json({ error: "Error en la base de datos" });
  });


};

export async function getCarreras(req, res) {
  getCarreras_().then(data => {
    res.json(data)
    // res.status(200).json({status : true, data : data})
  }, error => {
    res.status(400).json({status : false, error : error.message })
  })
}