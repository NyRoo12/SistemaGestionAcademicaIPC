import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Definir el modelo para 'estudiante'
export const Estudiante = sequelize.define(
  "Estudiante",
  {
    nombre: {
      type: DataTypes.STRING(100), // varchar(100)
      allowNull: true, // DEFAULT NULL
    },
    rut: {
      type: DataTypes.STRING(20), // varchar(20)
      allowNull: false,
      primaryKey: true, // Clave primaria
    },
    carreraDestino: {
      type: DataTypes.STRING(50), // varchar(50)
      allowNull: true, // DEFAULT NULL
    },
  },
  {
    tableName: "estudiantes", // Nombre explÃ­cito de la tabla en la base de datos
    timestamps: false, // No se incluyen createdAt y updatedAt
  }
);
