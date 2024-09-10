require('dotenv').config(); // <-- Carga las variables de entorno
const express = require('express');
const connection = require('./config/db');
const app = express();

app.use(express.json()); // Permite manejar JSON

// Importar rutas
const estudiantesRoutes = require('./routes/estudiantes');
const asignaturasIPCRoutes = require('./routes/asignaturasIPC');
const historialAcademicoRoutes = require('./routes/historialAcademico');

// Usar las rutas
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/asignaturasIPC', asignaturasIPCRoutes);
app.use('/api/historialAcademico', historialAcademicoRoutes);

const PORT = process.env.PORT || 3000;

// Escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});