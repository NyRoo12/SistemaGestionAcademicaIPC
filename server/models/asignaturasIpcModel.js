const connection = require('../config/db');

exports.obtenerTodo = (callback) => {
    const query = "SELECT * FROM asignaturasIPC";
    connection.query(query, callback);
};