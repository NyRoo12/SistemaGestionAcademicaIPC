import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Definir el modelo para 'asignaturasIPC'
export const AsignaturasIPC = sequelize.define('AsignaturasIPC', {
    codigo_IPC: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    nombre_IPC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semestre_IPC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regimen_IPC: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creditos_IPC: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    horas_IPC: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'asignaturasipc', // Nombre explícito de la tabla en la base de datos
    timestamps: false // Si no tienes columnas de createdAt o updatedAt
});
