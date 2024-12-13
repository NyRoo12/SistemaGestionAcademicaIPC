import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Estudiante } from "./Estudiantes.js"; // Importa el modelo Estudiante
import { AsignaturasIPC } from "./AsignaturasIPC.js"; // Importa el modelo AsignaturasIPC

export const HistorialAcademico = sequelize.define(
  "HistorialAcademico",
  {
    rut_estudiante: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: Estudiante,
        key: "rut",
        primaryKey: true,
      },
    },
    codigo_IPC_bruto: {
      type: DataTypes.STRING(50), // Campo adicional para almacenar el código completo
      allowNull: false,
    },
    codigo_IPC: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: AsignaturasIPC,
        key: "codigo_IPC",
        primaryKey: true,
      },
    },
    nota: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    semestre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
  },
  {
    tableName: "historialacademico",
    timestamps: false,
    hooks: {
      // Hook para rellenar automáticamente `codigo_IPC` desde `codigo_IPC_bruto`
      beforeCreate: (record) => {
        const bruto = record.codigo_IPC_bruto;
        if (bruto.includes("-")) {
          record.codigo_IPC = bruto.split("-")[0]; // Extrae la parte antes del guion
        } else {
          throw new Error("Formato de `codigo_IPC_bruto` inválido.");
        }
      },
      beforeUpdate: (record) => {
        const bruto = record.codigo_IPC_bruto;
        if (bruto.includes("-")) {
          record.codigo_IPC = bruto.split("-")[0];
        } else {
          throw new Error("Formato de `codigo_IPC_bruto` inválido.");
        }
      },
    },
  }
);


// Relación N:1 con estudiantes
HistorialAcademico.belongsTo(Estudiante, {
  foreignKey: 'rut_estudiante',
  targetKey: 'rut',
  onDelete: 'NO ACTION',
  onUpdate: 'CASCADE',
});

Estudiante.hasMany(HistorialAcademico, {
  foreignKey: "rut_estudiante", // Clave foránea en HistorialAcademico que apunta a Estudiante
  sourceKey: "rut", // Clave primaria en Estudiante
});

// Relación N:1 con asignaturas_IPC
HistorialAcademico.belongsTo(AsignaturasIPC, {
  foreignKey: 'codigo_IPC',
  targetKey: 'codigo_IPC',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

AsignaturasIPC.hasMany(HistorialAcademico, {
  foreignKey: "codigo_IPC", // Clave foránea en HistorialAcademico que apunta a AsignaturaIPC
  sourceKey: "codigo_IPC", // Clave primaria en AsignaturaIPC
});