import { DataTypes } from "sequelize";
import { sequelize } from "../config";


// Definir el modelo para 'asignaturasIPC'
const AsignaturasIPC = sequelize.define('AsignaturasIPC', {
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
    tableName: 'asignaturasIPC', // Nombre explícito de la tabla en la base de datos
    timestamps: false // Si no tienes columnas de createdAt o updatedAt
});

// Sincronizar el modelo con la base de datos
sequelize.sync()
    .then(() => {
        console.log('Modelo AsignaturasIPC sincronizado con la base de datos');
    })
    .catch((error) => {
        console.error('Error al sincronizar el modelo:', error);
    });

module.exports = AsignaturasIPC;