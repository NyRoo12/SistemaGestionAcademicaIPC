import {
    buildNomina,
    buildDetallado,
} from "../repository/pdf.repository.js"

export async function getNomina(req, res) {

	const stream = res.writeHead(200, {
		"Content-Type": "application/pdf",
	})

	buildNomina(
		(data) => stream.write(data), 
		() => stream.end()
	);
}

export async function getDetallado(req, res) {
    const carreraId = req.params.id;
    
    const stream = res.writeHead(200, {
		"Content-Type": "application/pdf",
	})

	buildDetallado(
        carreraId,
		(data) => stream.write(data), 
		() => stream.end()
	);
}