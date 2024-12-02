import { Router } from "express";
import {
    buildPDF,
} from "../controllers/pdfNomina.controller.js";

const router = Router();

router.get('/nomina-pdf', (req, res) => {

	const stream = res.writeHead(200, {
		"Content-Type": "application/pdf",
		// "Content-Disposition": "inline; filename=nomina.pdf",
	})

	buildPDF(
		(data) => stream.write(data), 
		() => stream.end()
	);
});

export default router;