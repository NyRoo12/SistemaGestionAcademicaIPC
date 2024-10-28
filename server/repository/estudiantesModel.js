const connection = require("../config/db");

exports.obtenerTodos = (callback) => {
  const sql = "SELECT * FROM estudiante";
  connection.query(sql, callback);
};

exports.crear = (estudiante, callback) => {
  const { nombre, rut, carreraDestino } = estudiante;
  const sql = "INSERT INTO estudiante (nombre, rut, carreraDestino) VALUES (?, ?, ?)";
  connection.query(sql, [nombre, rut, carreraDestino], callback);
};

exports.buscar = (query, callback) => {
  const searchValue = `%${query}%`;
  const sql = `SELECT * FROM estudiante WHERE nombre LIKE ? OR rut LIKE ?`;
  connection.query(sql, [searchValue, searchValue], callback);
};

exports.obtenerDetalle = (rut, callback) => {
  const sql = `SELECT nombre, rut, carreraDestino FROM estudiante WHERE rut = ?`;
  connection.query(sql, [rut], callback);
};
