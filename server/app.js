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
import userRoutes from './routes/user.routes.js'; 
import logsRoutes from './routes/logs.routes.js';
import pdfRoutes from './routes/pdf.routes.js';
import configRoutes from './routes/config.routes.js';


app.use(express.json());

// Configura CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'http://146.83.216.166:3006'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


// Usar las rutas
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/asignaturasIPC", asignaturasIPCRoutes);
app.use("/api/historialAcademico", historialAcademicoRoutes);
app.use("/api/asignaturasEquivalentes", asignaturasEquivalentesRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/login', userRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/save-config", configRoutes);



export default app;