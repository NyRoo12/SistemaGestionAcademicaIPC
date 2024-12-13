import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define(
  "User",
  {
    hashed_password: {
      type: DataTypes.STRING(100), // varchar(100)
      allowNull: false, // DEFAULT NULL
      primaryKey: true, // Clave primaria
    },
  },
  {
    tableName: "user", // Nombre explÃ­cito de la tabla en la base de datos
    timestamps: false, // No se incluyen createdAt y updatedAt
  }
);
  