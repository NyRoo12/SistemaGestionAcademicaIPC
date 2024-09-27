require("dotenv").config(); // <-- Carga las variables de entorno
const express = require("express");
const connection = require("./config/db");
const app = express();
const cors = require("cors"); // Importa el paquete cors

app.use(express.json()); // Permite manejar JSON

app.use(cors()); // Usa cors en toda la aplicación

// Importar rutas
const estudiantesRoutes = require("./routes/estudiantes");
const asignaturasIPCRoutes = require("./routes/asignaturasIPC");
const historialAcademicoRoutes = require("./routes/historialAcademico");
const equivalenciasRoutes = require("./routes/equivalencias");
const loginRoutes = require("./routes/login"); // Corregir el nombre para que coincida

// Usar las rutas
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/asignaturasIPC", asignaturasIPCRoutes);
app.use("/api/historialAcademico", historialAcademicoRoutes);
app.use("/api/equivalencias", equivalenciasRoutes);
app.use("/api/login", loginRoutes); // Usa loginRoutes en lugar de login

const PORT = process.env.PORT || 3001;

// Escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
