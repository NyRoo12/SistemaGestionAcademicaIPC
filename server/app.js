import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

//init
dotenv.config();
const app = express();

// Importar rutas
import estudiantesRoutes from './routes/estudiantes.routes.js';
import asignaturasIPCRoutes from './routes/asignaturasIpc.routes.js';
import historialAcademicoRoutes from './routes/historialAcademico.routes.js';
import asignaturasEquivalentesRoutes from './routes/asignaturasEquivalentes.routes.js';
import userRoutes from './routes/user.routes.js'; // Asegúrate de que el nombre y el archivo coincidan

app.use(express.json());

// Configura CORS
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Usar las rutas
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/asignaturasIPC", asignaturasIPCRoutes);
app.use("/api/historialAcademico", historialAcademicoRoutes);
app.use("/api/asignaturasEquivalentes", asignaturasEquivalentesRoutes);
app.use("/api/login", userRoutes); // Usa loginRoutes en lugar de login

export default app;