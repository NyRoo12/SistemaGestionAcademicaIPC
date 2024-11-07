import { getEstudiantes_, createEstudiante_, getEstudiante_, getDetalle_ } from "../repository/estudiantes.repository.js";

export async function getEstudiantes(req, res) {
  getEstudiantes_().then(data => {
    res.json(data)
    // res.status(200).json({status : true, data : data})
  }, error => {
    res.status(400).json({status : false, error : error.message })
  })
}

export async function createEstudiante(req, res) {
  const { nombre, rut, carreraDestino, ano } = req.body;
  const estudiante = {
    nombre,
    rut,
    carreraDestino,
    ano
  }

  createEstudiante_(estudiante).then(data => {
    res.status(500).send(err);
  }, error => {
    res.status(201).send("Estudiante creado con éxito");
  })
}

export async function getEstudiante(req, res) {
  const { query } = req.query;

  getEstudiante_(query).then(data => {
    res.json(data)
    // res.status(200).json({status : true, data : data})
  }, error => {
    res.status(400).json({status : false, error : error.message })
  })
}

export async function getDetalle(req, res) {
  const { query: rut } = req.query;

  if (!rut) {
    return res
      .status(400)
      .json({ error: "El RUT es necesario para la búsqueda" });
  }

  getDetalle_(rut).then(data => {
    res.json(data);
    // res.status(200).json({status : true, data : data})
  }, error => {
    res.status(400).json({status : false, error : error.message })
  })
}