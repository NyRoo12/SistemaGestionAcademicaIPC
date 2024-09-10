const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtener todos los estudiantes
router.get('/', (req, res) => {
    connection.query('SELECT * FROM estudiante', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Crear un nuevo estudiante
router.post('/', (req, res) => {
    const { nombre, rut, carreraDestino } = req.body;
    const query = 'INSERT INTO estudiante (nombre, rut, carreraDestino) VALUES (?, ?, ?)';
    connection.query(query, [nombre, rut, carreraDestino], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Estudiante creado con éxito');
        }
    });
});

module.exports = router;
