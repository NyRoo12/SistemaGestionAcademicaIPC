const connection = require("../config/db");

exports.getUserPassword = (callback) => {
  const sql = 'SELECT hashed_password FROM user LIMIT 1'; // Cambia la consulta según tu estructura
  connection.query(sql, callback);
};
