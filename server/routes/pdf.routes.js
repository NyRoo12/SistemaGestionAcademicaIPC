import { Router } from "express";
import {
    getNomina,
	getDetallado,
} from "../controllers/pdf.controller.js";

const router = Router();

router.get('/nomina', getNomina);

router.get('/detallado/:id', getDetallado)

export default router;