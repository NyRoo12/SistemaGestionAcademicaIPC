import Sequelize from "sequelize";
import dotenv from 'dotenv'
dotenv.config();

// Crear una instancia de Sequelize
export const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST || "db",  // Cambia según tu configuración
		user: process.env.DB_USER,       // Tu usuario de MySQL
		password: process.env.DB_PASSWORD,  // Tu contraseña de MySQL
		database: process.env.DB_NAME,  // Nombre de tu base de datos
		dialect: 'mysql', // Puedes cambiar a 'sqlite', 'postgres', etc. según tu base de datos
		logging: console.log, // Activa los logs para ver las consultas realizadas
	}
);
