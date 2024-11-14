import Sequelize from "sequelize";
import dotenv from 'dotenv'
dotenv.config();

// Crear una instancia de Sequelize
export const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,  // Cambia según tu configuración
		user: process.env.DB_USER,       // Tu usuario de MySQL
		password: process.env.DB_PASSWORD,  // Tu contraseña de MySQL
		database: process.env.DB_NAME,  // Nombre de tu base de datos
		dialect: 'mysql', // Puedes cambiar a 'sqlite', 'postgres', etc. según tu base de datos
		logging: console.log, // Activa los logs para ver las consultas realizadas
	}
);

// connection.connect((err) => {
//     if (err) {
//         console.error('Error conectando a la base de datos:', err);
//         return;
//     }
//     console.log('Conexión exitosa a la base de datos MySQL');
// });

// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Conexión exitosa a la base de datos MySQL con Sequelize');
//     } catch (error) {
//         console.error('Error al conectar a la base de datos:', error);
//     }
// }

// // Llamar a la función para probar la conexión
// testConnection();

// module.exports = sequelize;

// require('dotenv').config(); // <-- Carga las variables de entorno
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,  // Cambia según tu configuración
//     user: process.env.DB_USER,       // Tu usuario de MySQL
//     password: process.env.DB_PASSWORD,  // Tu contraseña de MySQL
//     database: process.env.DB_NAME  // Nombre de tu base de datos
// });
