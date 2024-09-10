const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtener todas las asignaturasIPC
router.get('/', (req, res) => {
    connection.query('SELECT * FROM asignaturasIPC', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
