import PDFDocument from 'pdfkit-table'
import axios from 'axios'

export async function buildNomina(dataCallback, endCallback) {
    const doc = new PDFDocument()

    doc.on('data', dataCallback)
    doc.on('end', endCallback)

    doc.fontSize(30).text('Hello World')

    // Título
    doc.fontSize(30).text('Lista de Estudiantes');

    try {
        // Llamada a la API para obtener los datos
        const response = await axios.get('http://localhost:3001/api/estudiantes/');
        const estudiantes = response.data; // Aquí está el array de estudiantes directamente

        // Limpiar y formatear los datos para la tabla
        const sanitizedData = estudiantes.map((est, index) => [
            // (index + 1).toString(), // Número de fila (1-based)
            est.nombre || '', // Nombre
            est.rut || '', // RUT
            est.carreraDestino || '', // Carrera Destino (rellena con string vacío si es null)
        ]);

        // Formatear los datos para `pdfkit-table`
        const table = {
            headers: ['Nombre', 'RUT', 'Carrera Destino'],
            rows: sanitizedData, // Filas con datos limpiados
        };

        // Agregar la tabla al documento
        await doc.table(table, {
            width: 500,
        });
    } catch (error) {
        console.error('Error obteniendo datos de la API:', error);
        doc.fontSize(12).text('Error cargando datos desde la API.');
    }

    doc.end();
}

export async function buildDetallado(carreraId, dataCallback, endCallback) {
    const doc = new PDFDocument()

    doc.on('data', dataCallback)
    doc.on('end', endCallback)

    doc.fontSize(30).text('Hello World')
    doc.fontSize(30).text(carreraId)

    try {
        // Llamada a la API para obtener los datos
        const response = await axios.get(`http://localhost:3001/api/estudiantes/porCarrera/${carreraId}`);
        const estudiantes = response.data;

        

        // Formatear los datos para `pdfkit-table`
        const table = {
            title: "Nombre",
            subtitle: "rut",
            headers: ['Nombre', 'RUT', 'Carrera Destino'],
            rows: sanitizedData, // Filas con datos limpiados
        };

        // Agregar la tabla al documento
        await doc.table(table, {
            width: 500,
        });
    } catch (error) {
        console.error('Error obteniendo datos de la API:', error);
        doc.fontSize(12).text('Error cargando datos desde la API.');
    }


    doc.end();
}
