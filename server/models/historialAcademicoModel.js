const connection = require('../config/db');

exports.obtenerTodo = (callback) => {
    const query = "SELECT * FROM historialAcademico";
    connection.query(query, callback);
};

exports.agregar = ({ rut_estudiante, codigo_IPC, nota, ano, semestre, estado }, callback) => {
const query = "INSERT INTO historialAcademico (rut_estudiante, codigo_IPC, nota, ano, semestre, estado) VALUES (?, ?, ?, ?, ?, ?)";
connection.query(query, [rut_estudiante, codigo_IPC, nota, ano, semestre, estado], callback);
};

exports.obtenerPorRut = (rut, callback) => {
const query = `
    SELECT asignaturasIPC.codigo_IPC, nombre_IPC, nota, ano, semestre, estado
    FROM historialAcademico
    INNER JOIN asignaturasIPC
    ON historialAcademico.codigo_IPC = asignaturasIPC.codigo_IPC
    WHERE historialAcademico.rut_estudiante = ?`;
connection.query(query, [rut], callback);
};