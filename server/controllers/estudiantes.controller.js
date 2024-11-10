import {
  getEstudiantes_,
  createEstudiante_,
  getEstudiante_,
  getDetalle_,
  cargaMasiva_,
  eliminarEstudiante_,
} from "../repository/estudiantes.repository.js";

export async function getEstudiantes(req, res) {
  getEstudiantes_().then(
    (data) => {
      res.json(data);
      // res.status(200).json({status : true, data : data})
    },
    (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

//eliminar estudiante
export async function eliminarEstudiante(req, res) {
  const { query: rut } = req.query;

  if (!rut) {
    return res
      .status(400)
      .json({ error: "El RUT es necesario para la eliminación" });
  }

  eliminarEstudiante_(rut).then(
    (data) => {
      res.status(200).json(data); // Enviamos el mensaje de éxito
    },
    (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

export async function createEstudiante(req, res) {
  const { nombre, rut, carreraDestino, ano } = req.body;
  const estudiante = {
    nombre,
    rut,
    carreraDestino,
    ano,
  };

  createEstudiante_(estudiante).then(
    (data) => {
      res.status(500).send(err);
    },
    (error) => {
      res.status(201).send("Estudiante creado con éxito");
    }
  );
}

export async function cargaMasiva(req, res) {
  // Se espera que los estudiantes sean enviados en el cuerpo de la solicitud (req.body)
  const estudiantes = req.body;

  try {
    // Llamamos a la función cargaMasiva que ya tiene la lógica para manejar la carga masiva de estudiantes
    const resultados = await cargaMasiva_(estudiantes);

    // Si la carga es exitosa, devolvemos los resultados
    res.status(201).send({
      message: "Estudiantes cargados con éxito",
      estudiantes: resultados, // Opcionalmente, podemos devolver los estudiantes creados
    });
  } catch (error) {
    console.error("Error en la carga masiva de estudiantes:", error);
    // En caso de error, respondemos con un mensaje de error
    res.status(500).send({
      message: "Error al cargar los estudiantes",
      error: error.message,
    });
  }
}

export async function getEstudiante(req, res) {
  const { query } = req.query;

  getEstudiante_(query).then(
    (data) => {
      res.json(data);
      // res.status(200).json({status : true, data : data})
    },
    (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}

export async function getDetalle(req, res) {
  const { query: rut } = req.query;

  if (!rut) {
    return res
      .status(400)
      .json({ error: "El RUT es necesario para la búsqueda" });
  }

  getDetalle_(rut).then(
    (data) => {
      res.json(data);
      // res.status(200).json({status : true, data : data})
    },
    (error) => {
      res.status(400).json({ status: false, error: error.message });
    }
  );
}
