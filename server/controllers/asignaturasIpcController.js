const AsignaturasIpcModel = require('../models/asignaturasIpcModel.js');

exports.obtenerAsignaturas = async (req, res) => {
    AsignaturasIpcModel.obtenerTodo((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};