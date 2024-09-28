require('dotenv').config(); // <-- Carga las variables de entorno
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST ,  // Cambia 'localhost' o '0.0.0.0' a 'db'
    user: process.env.DB_USER,       // Tu usuario de MySQL
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,  // Tu contraseña de MySQL
    database: process.env.DB_NAME  // Nombre de tu base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

module.exports = connection;