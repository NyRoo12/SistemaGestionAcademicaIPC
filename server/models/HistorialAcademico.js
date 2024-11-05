import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Estudiante } from "./Estudiantes.js"; // Importa el modelo Estudiante
import { AsignaturasIPC } from "./AsignaturasIPC.js"; // Importa el modelo AsignaturasIPC

// Definir el modelo para 'historialAcademico'
export const HistorialAcademico = sequelize.define(
  "HistorialAcademico",
  {
    rut_estudiante: {
      type: DataTypes.STRING(20), // varchar(20)
      allowNull: false,
      references: {
        model: Estudiante, // Referencia al modelo Estudiante
        key: "rut", // Clave foránea al campo 'rut' de la tabla 'estudiante'
        primaryKey: true,
      },
    },
    codigo_IPC: {
      type: DataTypes.STRING(30), // varchar(30)
      allowNull: false,
      references: {
        model: AsignaturasIPC, // Referencia al modelo AsignaturasIPC
        key: "codigo_IPC", // Clave foránea al campo 'codigo_IPC' de la tabla 'asignaturasIPC'
        primaryKey: true,
      },
    },
    nota: {
      type: DataTypes.FLOAT, // float
      allowNull: true, // DEFAULT NULL
    },
    ano: {
      type: DataTypes.INTEGER, // int
      allowNull: false,
      primaryKey: true,
    },
    semestre: {
      type: DataTypes.STRING(30), // varchar(30)
      allowNull: false,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.TINYINT, // tinyint(1)
      allowNull: true, // DEFAULT NULL
    },
  },
  {
    tableName: "historialAcademico", // Nombre explícito de la tabla en la base de datos
    timestamps: false, // No se incluyen createdAt y updatedAt
  }
);

// Relación N:1 con estudiantes
HistorialAcademico.belongsTo(Estudiante, {
  foreignKey: "rut_estudiante", // Clave foránea en HistorialAcademico que apunta a Estudiante
  targetKey: "rut", // Clave primaria en Estudiante
});
Estudiante.hasMany(HistorialAcademico, {
  foreignKey: "rut_estudiante", // Clave foránea en HistorialAcademico que apunta a Estudiante
  sourceKey: "rut", // Clave primaria en Estudiante
});

// Relación N:1 con asignaturas_IPC
HistorialAcademico.belongsTo(AsignaturasIPC, {
  foreignKey: "codigo_IPC", // Clave foránea en HistorialAcademico que apunta a AsignaturaIPC
  targetKey: "codigo_IPC", // Clave primaria en AsignaturaIPC
});
AsignaturasIPC.hasMany(HistorialAcademico, {
  foreignKey: "codigo_IPC", // Clave foránea en HistorialAcademico que apunta a AsignaturaIPC
  sourceKey: "codigo_IPC", // Clave primaria en AsignaturaIPC
});