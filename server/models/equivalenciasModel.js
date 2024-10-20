const connection = require("../config/db");

// Obtener el historial académico del estudiante
exports.obtenerHistorial = (rut, callback) => {
  const sqlHistorial = `
    SELECT ha.codigo_IPC, a.nombre_IPC
    FROM historialAcademico ha
    JOIN asignaturasIPC a ON ha.codigo_IPC = a.codigo_IPC
    WHERE ha.rut_estudiante = ?`;

  connection.query(sqlHistorial, [rut], callback);
};

// Consulta para obtener las equivalencias de las asignaturas en la carrera de destino
// const sqlEquivalencias = `
//   SELECT ad.codigo_destino, ad.nombre, ad.carrera
//   FROM asignaturasDestino ad
//   WHERE ad.codigo_IPC IN (
//     SELECT ha.codigo_IPC
//     FROM historialAcademico ha
//     WHERE ha.rut_estudiante = ?
//   )`;

// Obtener equivalencias de las asignaturas en la carrera de destino
exports.obtenerEquivalencias = (rut, callback) => {
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

  connection.query(sqlEquivalencias, [rut, rut], callback);
};
