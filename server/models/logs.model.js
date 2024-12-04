import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Modelo de la tabla logs
const Logs = sequelize.define('Logs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  accion: {
    type: DataTypes.ENUM('AGREGAR_ESTUDIANTE', 'AGREGAR_HISTORIAL', 'ELIMINAR_HISTORIAL'),
    allowNull: false,
  },
  rut: {
    type: DataTypes.STRING(20),
    allowNull: true, // Es opcional para logs que no tengan un RUT asociado
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'logs',
  timestamps: false,
});

export default Logs;
