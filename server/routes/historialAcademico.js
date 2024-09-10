const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Obtener todo el historial académico
router.get('/', (req, res) => {
    connection.query('SELECT * FROM historialAcademico', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Agregar un registro al historial académico
router.post('/', (req, res) => {
    const { rut_estudiante, codigo_IPC, nota, ano, semestre, estado } = req.body;
    const query = 'INSERT INTO historialAcademico (rut_estudiante, codigo_IPC, nota, ano, semestre, estado) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [rut_estudiante, codigo_IPC, nota, ano, semestre, estado], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Registro académico añadido con éxito');
        }
    });
});

module.exports = router;