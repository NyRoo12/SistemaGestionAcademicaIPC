import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import { Paper } from "./AsignaturasIPC.js";


// Definir el modelo para 'asignaturasDestino'
const AsignaturasDestino = sequelize.define('AsignaturasDestino', {
    codigo_destino: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    carrera: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigo_IPC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regimen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creditos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    horas: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'asignaturasDestino', // Nombre explícito de la tabla en la base de datos
    timestamps: false // Si no tienes columnas de createdAt o updatedAt
});

AsignaturasDestino.hasMany(AsignaturasIPC, {
    foreinkey: "userId",
    sourceKey: "id",
  });
  Paper.belongsTo(User, { foreinkey: "userId", targetId: "id" });

// Sincronizar el modelo con la base de datos
sequelize.sync()
    .then(() => {
        console.log('Modelo AsignaturasDestino sincronizado con la base de datos');
    })
    .catch((error) => {
        console.error('Error al sincronizar el modelo:', error);
    });

module.exports = AsignaturasDestino;