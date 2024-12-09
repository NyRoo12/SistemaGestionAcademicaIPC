import PDFDocument from 'pdfkit-table'
import axios from 'axios'

export async function buildNomina(dataCallback, endCallback) {
  const doc = new PDFDocument()

  doc.on('data', dataCallback)
  doc.on('end', endCallback)


  doc.font('Times-Roman')

  doc.fontSize(30).text('Hello World')

  // Título
  doc.fontSize(30).text('Lista de Estudiantes')

  try {
      // Llamada a la API para obtener los datos
      const response = await axios.get('http://localhost:3001/api/estudiantes/');
      const estudiantes = response.data; // Aquí está el array de estudiantes directamente

      // Limpiar y formatear los datos para la tabla
      const sanitizedData = estudiantes.map((est, index) => [
          (index + 1).toString(), // Número de fila (1-based)
          est.nombre || '', // Nombre
          est.rut || '', // RUT
          est.carreraDestino || '', // Carrera Destino (rellena con string vacío si es null)
      ]);

      // Formatear los datos para `pdfkit-table`
      const table = {
          headers: ['', 'Nombre', 'RUT', 'Carrera Destino'],
          rows: sanitizedData, // Filas con datos limpiados
      };

      // Agregar la tabla al documento
      await doc.table(table, {
          width: 500,
          columnsSize: [ 30, 250, 110, 110 ],
          prepareHeader: () => doc.font('Times-Roman').fontSize(10),
          prepareRow: (row, i) => doc.font('Times-Roman').fontSize(10)
      });

  } catch (error) {
      console.error('Error obteniendo datos de la API:', error);
      doc.fontSize(12).text('Error cargando datos desde la API.');
  }

  doc.end();
}

export async function buildDetallado(carreraId, dataCallback, endCallback) {

  console.log(carreraId);

  const doc = new PDFDocument()

  doc.on('data', dataCallback)
  doc.on('end', endCallback)

  doc.fontSize(30).text('Hello World')
  doc.fontSize(30).text(carreraId)

  try {
      // Llamada a la API para obtener los datos
      const response = await axios.get(`http://localhost:3001/api/estudiantes/porCarrera/${carreraId}`);
      const estudiantes = response.data;
      
      console.log(estudiantes);
      
      const tablas = await procesarEstudiantes(estudiantes);

      for (const table of tablas) {
        // console.log(table);
        await doc.table(table, {
          width: 500,
          prepareHeader: () => doc.font('Times-Roman').fontSize(10),
          prepareRow: (row, i) => doc.font('Times-Roman').fontSize(10)
        });
      }

  } catch (error) {
      console.error('Error obteniendo datos de la API:', error);
      doc.fontSize(12).text('Error cargando datos desde la API.');
  }

  doc.end();
}

async function obtenerHistorial(rut) {
  try {
    const response = await axios.get(`http://localhost:3001/api/historialAcademico/obtenerHistorial/${rut}`);
    return response.data;  // Retorna el historial obtenido
  } catch (error) {
      console.error(`Error obteniendo historial para RUT ${rut}:`, error);
      return [];
  }
}

async function obtenerHistorialEquivalente(rut) {
  try {
      const response = await axios.get(`http://localhost:3001/api/asignaturasEquivalentes/obtenerEquivalencias?query=${rut}`);
      return response.data;  // Retorna el historial obtenido
  } catch (error) {
      console.error(`Error obteniendo equivalencias para RUT ${rut}:`, error);
      return [];
  }
}

function crearTabla(estudiante, historial, equivalencias) {
  // Creamos la estructura básica de la tabla
  const table = {
    title: estudiante.rut,
    subtitle: estudiante.nombre,
    // headers: ['Código IPC', 'Código Destino', 'Nombre', 'Nota', 'Nivel', 'Año', 'Semestre'],
    headers: [
      { label:"Código IPC", property: 'codigo_IPC', width: 71.43 },
      { label:"Código Destino", property: 'codigo_destino', width: 71.43 },
      { label:"Nombre", property: 'nombre', width: 101.43 },
      { label:"Nota", property: 'nota', width: 41.43, align: 'center' },
      { label:"Nivel", property: 'nivel', width: 71.43, align: 'center' },
      { label:"Año", property: 'ano', width: 71.43, align: 'center' },
      { label:"Semestre", property: 'semestre', width: 71.43, align: 'center' },
    ],
    datas: [],
  };

  // Iteramos sobre el historial y creamos las filas
  historial.forEach(item => {
    // Buscar las equivalencias para el código IPC actual
    const equivalencia = equivalencias.find(eq => eq.codigo_IPC === item.codigo_IPC);
    
    // Si encontramos una equivalencia, usamos su código destino y nombre
    const codigoDestino = equivalencia && equivalencia.AsignaturasEquivalentes.length > 0
    ? equivalencia.AsignaturasEquivalentes[0].codigo_destino
    : item.codigo_IPC;
  
    const nombre = equivalencia && equivalencia.AsignaturasEquivalentes.length > 0
      ? equivalencia.AsignaturasEquivalentes[0].nombre
      : item.nombre_IPC;

      const colorNota = item.nota >= 4.0 ? '#381575' : '#9c0606';
      const estiloFila = equivalencia ? { backgroundColor: 'yellow', backgroundOpacity: 0.5, color: colorNota } : {color: colorNota};

    const fila = {
      codigo_IPC: { label: item.codigo_IPC, options: { color: colorNota }},
      codigo_destino: { label: codigoDestino, options: estiloFila },
      nombre: { label: nombre, options: estiloFila },
      nota: { label: item.nota ?? 'N/A', options: { color: colorNota }},
      nivel: { label: item.Nivel ?? 'Desconocido', options: { color: colorNota }},
      ano: { label: item.ano ?? 'Sin Año', options: { color: colorNota }},
      semestre: { label: item.semestre ?? 'Sin Semestre', options: { color: colorNota }},
    };
    

    // Agregar la fila con las celdas estilizadas
    table.datas.push(fila);
  });

  return table;
}


async function procesarEstudiantes(estudiantes) {
  const tablas = [];

  for (const estudiante of estudiantes) {
    const historial = await obtenerHistorial(estudiante.rut);
    const equivalencias = await obtenerHistorialEquivalente(estudiante.rut);
    const tabla = crearTabla(estudiante, historial, equivalencias);
    tablas.push(tabla);
  }
  return tablas;
}

