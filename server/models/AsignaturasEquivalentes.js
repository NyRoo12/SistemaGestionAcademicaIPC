import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { AsignaturasIPC } from "./AsignaturasIPC.js";

export const AsignaturasEquivalentes = sequelize.define('AsignaturasEquivalentes', {
  codigo_destino: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true,
  },
  carrera: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  codigo_IPC: {
    type: DataTypes.STRING(30),
    allowNull: false,
    references: {
      model: 'asignaturasIPC',  // Nombre de la tabla referenciada
      key: 'codigo_IPC',        // Columna referenciada en la tabla asignaturasIPC
    },
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  regimen: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  creditos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  horas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'asignaturasEquivalentes',  // Nombre de la tabla en la base de datos
  timestamps: false,  // Desactiva las columnas 'createdAt' y 'updatedAt'
});


AsignaturasIPC.hasMany(AsignaturasEquivalentes, {
  foreignKey: 'codigo_IPC',
  sourceKey: 'codigo_IPC',
});

// Relación en AsignaturasEquivalentes
AsignaturasEquivalentes.belongsTo(AsignaturasIPC, {
  foreignKey: 'codigo_IPC',
  targetKey: 'codigo_IPC',
});