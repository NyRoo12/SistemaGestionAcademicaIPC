import PDFDocument from 'pdfkit-table'
import axios from 'axios'

export async function buildNomina(dataCallback, endCallback) {
  const doc = new PDFDocument({
    size: [612.6675, 793.299096],
    bufferPages: true, // Para poder manipular todas las páginas después de generarlas
    margins: {top: 150, bottom: 50, left: 50, right: 50}
  });

  const currentYear = new Date().getFullYear(); // Año actual
  const previousYear = currentYear - 1; // Año anterior

  const today = new Date(); 
  const formattedDate = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', }).format(today);

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  // Constantes para encabezado y pie
  const fullPageWidth = doc.page.width;
  const headerImagePath = './public/images/EncabezadoNew.png';

  // Contenido del documento
  doc.fontSize(11);
  doc.font('Times-Roman');

  // Encabezado inicial
  // doc.moveDown(5);
  doc.text('COMUNICACIÓN INTERNA Nº 004/20 ', { align: 'right' });
  doc.text(`VALDIVIA, ${formattedDate}`, { align: 'right' });
  doc.moveDown(4);

  doc.font('Times-Bold').text('DE: ING. JORGE MORALES VILUGRON.', { align: 'left' });
  doc.text('      DIRECTOR BACHILLERATO EN CIENCIAS DE LA INGENIERÍA PLAN COMÚN', { align: 'left' });
  doc.moveDown(); // Espaciado entre bloques

  doc.text('A:   DR. MAURICIO RUIZ-TAGLE M.', { align: 'left' });
  doc.text('       DIRECTOR DE ESTUDIOS DE PREGRADO', { align: 'left' });
  doc.moveDown();

  doc.text('C.C: SRTA. CRISTINA BARRIGA R.', { align: 'left' });
  doc.text('         JEFA DEPARTAMENTO REGISTRO ACADÉMICO ESTUDIANTIL', { align: 'left' });
  doc.moveDown();

  doc.text('        DRA. VIRGINIA VÁSQUEZ.', { align: 'left' });
  doc.text('       DIRECTORA DE ASUNTOS ESTUDIANTILES', { align: 'left' });
  doc.moveDown();

  // Dibujar la línea negra separadora
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right; // Ancho de página menos márgenes
  doc.moveTo(doc.x, doc.y) // Punto inicial (posición actual)
    .lineTo(doc.x + pageWidth, doc.y) // Punto final (línea horizontal)
    .stroke(); // Dibujar la línea

  doc.moveDown();
  doc.font('Times-Roman').text('MOTIVO:', { align: 'left' });
  doc.moveDown(0.9);

  doc.text(
      '  Adjuntar a Ud.,  la Propuesta de Continuidad de Estudios de los estudiantes de Bachillerato en Ciencias de la Ingeniería Plan - Común, Facultad de Ciencias de Ingeniería, Campus Miraflores, Promoción 2018, para Resolución correspondiente.',
      { align: 'justify', indent: 10}
  );
  doc.moveDown();

  doc.font('Times-Bold').text('1.- ANTECEDENTES GENERALES.', { align: 'justify' });
  doc.moveDown();

  doc.font('Times-Roman').text(
      'La presente propuesta describe la situación académica de los estudiantes del Programa de Bachillerato en Ciencias de la Ingeniería Plan Común promoción 2018, que serán trasladados a las carreras de su elección, en abril del 2020 y que cumplen con el requisito de la resolución N° 13 de marzo 2013.',
      { align: 'justify'}
  );
  doc.moveDown(1.5);

  doc.font('Times-Bold').text('1.  TRASLADO PARA CONTINUIDAD DE ESTUDIOS.', { align: 'justify' });
  doc.moveDown();

  const marginLeft = 86;
  // Margen derecho del texto
  const marginRight = 72;

  // Configuración del texto con indentación completa respetando los márgenes
  doc.font('Times-Roman')
  .fontSize(11)
  .text(
      'Una vez cursado el plan de estudios del Programa de Bachillerato, el estudiante se traslada a la carrera que ha seleccionado, según su vocación y rendimiento académico en Ciencias de la Ingeniería, Plan Común. Sólo podrá hacerse efectivo el traslado, una vez finalizado el cuarto semestre como estudiante regular del Bachillerato, aún cuando se tengan asignaturas reprobadas por cursar.\n\n' +
      'El objetivo del traslado a los dos años permite la inserción con el grupo de pares de su carrera y fortalece su decisión vocacional.',
      marginLeft, // Posición inicial en X con margen izquierdo
      doc.y,      // Posición inicial en Y (continuación del texto)
      {
          align: 'justify', 
          width: doc.page.width - marginLeft - marginRight // Calcular ancho disponible
      }
  );

  // quite el indent 40 !!!!!!!!!!!!!!!!!!!!!!!!!!!!11
  //------------------------------ PAGINA 2 -----------------------------------------------------------------
  // Agregar más texto o tablas según tu contenido
  doc.addPage(); // Segunda página
  // doc.moveDown(5);
  doc.text('Dada la heterogeneidad académica de los estudiantes, se hizo un análisis caso a caso,  de tal forma de adecuarlos a la nueva realidad académica que los acogerá, teniendo presente que muchos de ellos poseen beneficios o créditos.'
      ,marginLeft, // Posición inicial en X con margen izquierdo
      doc.y,      // Posición inicial en Y (continuación del texto)
      {
          align: 'justify', 
          width: doc.page.width - marginLeft - marginRight // Calcular ancho disponible
      }
  );

  doc.moveDown(2);

  // 1.1. Adecuaciones Académicas
  doc.text('1.1.   Adecuaciones Académicas.',marginLeft-15, // Posición inicial en X con margen izquierdo
      doc.y ,{ align: 'justify' });
  doc.moveDown(0.1);

  doc.text(
      'Las principales adecuaciones académicas deberían ser:\n\n',
      { align: 'justify', indent: 25 }
  );
  //doc.moveDown(0.5);

  doc.text(
      '•  Homologación completa de las asignaturas cursadas y aprobadas en el Bachillerato.',marginLeft+30, // Posición inicial en X con margen izquierdo
      doc.y ,
      { align: 'justify' }
  );
  doc.text(
      '•  Se realizarán equivalencias en las asignaturas que lo requieran con las carreras de destino, según Protocolo de Traspaso de Bachillerato en Ciencias de la Ingeniería Plan - Común de la Facultad de Ciencias de la Ingeniería.',
      { align: 'justify'}
  );
  doc.text(
      '•  Dado que alguno de los estudiantes en traslado no han completado el 100% del plan de estudios del Bachillerato, se propone inscribir las asignaturas pendientes u otros equivalentes en la carrera de destino.',
      { align: 'justify' }
  );
  doc.text(
      '•  Al aprobar las asignaturas rezagadas en la carrera de destino, se les otorgará el Grado de Bachillerato en Ciencias de la Ingeniería Plan - Común.',
      { align: 'justify'}
  );

  doc.moveDown(2);

  // 1.2. Conservación de Beneficios
  doc.text('1.2.   Conservación de Beneficios.\n\n',marginLeft-15, // Posición inicial en X con margen izquierdo
      doc.y , { align: 'justify'});
  //doc.moveDown(0.5);

  doc.text(
      'Para la conservación de beneficios se debiera tener en consideración lo siguiente:\n\n',
      { align: 'justify', indent: 25 }
  );
  doc.moveDown(0.5);

  doc.text(
      '• En caso de ser beneficiario de MINEDUC, en el mes de abril 2020, la DAE debe informar a MINEDUC que los traslados de estudiantes a otras carreras se hacen como continuidad de estudios.',marginLeft+30, // Posición inicial en X con margen izquierdo
      doc.y ,
      { align: 'justify' }
  );
  doc.text(
      '• Para hacer efectivo el trámite, Coordinación de Bachillerato debe cautelar que el estudiante complete el Formulario de Traspaso, que se encuentra disponible en la DAE del Campus Miraflores.',
      { align: 'justify' }
  );
  doc.text(
      '• Para todos los efectos legales, la duración de la asignación de beneficios considera los años contemplados en el Plan de Estudios de Bachillerato en Ciencias de la Ingeniería Plan Común.',
      { align: 'justify' }
  );
  doc.moveDown(2.5);

  // 2. Análisis Caso a Caso
  doc.font('Times-Bold').text('2. ANÁLISIS CASO A CASO.\n\n',marginLeft-15, // Posición inicial en X con margen izquierdo
      doc.y , { align: 'justify'});
  //doc.moveDown(0.5);

  doc.font('Times-Roman').text(
      'De acuerdo a conversación sostenida con cada estudiante, se les consultó sobre la carrera de su elección y posteriormente se hizo un análisis de cada situación.',
      { align: 'justify', indent: 25 }
  );


  //------------------------------ PAGINA 3 -----------------------------------------------------------------
  doc.addPage(); // Tercera página
  // doc.moveDown(5);
  // 3. Situación Académica Actual de los Estudiantes del Bachillerato Ingreso 2017
  doc.font('Times-Bold').text(`3. SITUACIÓN ACADÉMICA ACTUAL DE LOS ESTUDIANTES DEL BACHILLERATO INGRESO ${previousYear} \n\n`, marginLeft-15, // Posición inicial en X con margen izquierdo
      doc.y , 
      {align: 'justify'});
  //doc.moveDown(0.5);

  doc.font('Times-Roman').text(
      `Alumnos generación ${currentYear} que se cambian por cumplir con el requisito de tener aprobado como mínimo el primer año completo, luego de haber cursado dos años en Bachillerato en Ciencias de la Ingeniería - Plan Común.`,
      marginLeft, // Posición inicial en X con margen izquierdo
      doc.y ,{ align: 'justify'}
  );


  //ACA VA EL DOCUMENTO 


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
      title: "Estudiantes",
      width: 500,
      columnsSize: [ 30, 250, 110, 110 ],
      prepareHeader: () => {
        // Este callback se llama al inicio de cada nueva página
        doc.font('Times-Roman').fontSize(10);
      },
      prepareRow: (row, i) => doc.font('Times-Roman').fontSize(10),
      x: 60,
      y: 240,
      // minRowHeight: 20, 
    });

  } catch (error) {
      console.error('Error obteniendo datos de la API:', error);
      doc.fontSize(12).text('Error cargando datos desde la API.');
  }


  //------------------------------ PAGINA FINAL -----------------------------------------------------------------
  doc.addPage(); // Ultima página
  // doc.moveDown(5);
  doc.font('Times-Roman').text(`(*)  Estos alumnos, frente a la duda, se matricularon en el Bachiller y deben ser cambiada  su matricula a la carrera  correspondiente.  \n\n`, marginLeft-15, // Posición inicial en X con margen izquierdo
      doc.y , 
      {align: 'justify'}
  );
  doc.moveDown(1.5);

  doc.text('Sin otro particular, saluda atte. A Ud. ');

  // Manipulación de todas las páginas para agregar encabezado y pie
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);

    // Encabezado
    const oldTopMargin = doc.page.margins.top;
    // doc.page.margins.top = 0;
    doc.image(headerImagePath, (fullPageWidth - 200) / 2, 10, { width: 200 });
    // doc.page.margins.top = oldTopMargin;

    // Pie de página
    const oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    
    doc.opacity(1).lineWidth(0.3).moveTo(40, doc.page.height - 55) // Punto inicial de la línea
    .lineTo(doc.page.width - 40, doc.page.height - 55) // Punto final de la línea
    .stroke(); // Dibujar la línea

    doc.opacity(1).lineWidth(1);
    doc.fontSize(9).text(
        `Bachillerato en Ciencias de la Ingeniería Plan - Común - General Lagos Nº 2086 -  Campus Miraflores · Valdivia · Chile`,
        40,
        doc.page.height - 45,
        { align: 'center' } // Centrado en la página
    );

    doc.text(
        `Fono: 56- 63-221859 -  email: bachilleratofci@uach.cl - · www.uach.cl`,
        40,
        doc.page.height - 30, // Posición debajo del texto existente
        { align: 'center' }
    );



    doc.page.margins.bottom = oldBottomMargin;
  }

  doc.end();
}



// ##########################################################################################################################################



export async function buildDetallado(carreraId, dataCallback, endCallback) {
  const doc = new PDFDocument({
    size: [612.6675, 793.299096],
    bufferPages: true, // Para poder manipular todas las páginas después de generarlas
    margins: {top: 150, bottom: 50, left: 50, right: 50}
  });

  const marginLeft = 86;
  // Margen derecho del texto
  const marginRight = 72;


  const currentYear = new Date().getFullYear(); // Año actual
  const previousYear = currentYear - 1; // Año anterior

  const today = new Date(); 
  const formattedDate = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', }).format(today);

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  // Constantes para encabezado y pie
  const fullPageWidth = doc.page.width;
  const headerImagePath = './public/images/EncabezadoNew.png';

  // Contenido del documento
  doc.fontSize(11);
  doc.font('Times-Roman');

  //ACA VA EL DOCUMENTO 
  doc.text(`VALDIVIA, ${formattedDate}`, { align: 'right' });

  doc.font('Times-Bold').fontSize(20).text("\n").text(carreraId, {align: 'center'});

  try {
      // Llamada a la API para obtener los datos
      const response = await axios.get(`http://localhost:3001/api/estudiantes/porCarrera/${carreraId}`);
      const estudiantes = response.data;
      
      // console.log(estudiantes);
      
      const tablas = await procesarEstudiantes(estudiantes);

      for (const table of tablas) {
        // console.log(table);
        await doc.table(table, {
          width: 500,
          prepareHeader: () => doc.font('Times-Roman').fontSize(10),
          prepareRow: (row, i) => doc.font('Times-Roman').fontSize(10),
        });
      }

  } catch (error) {
      console.error('Error obteniendo datos de la API:', error);
      doc.fontSize(12).text('Error cargando datos desde la API.');
  }


  //------------------------------ PAGINA FINAL -----------------------------------------------------------------
  doc.addPage(); // Ultima página
  // doc.moveDown(5);
  doc.moveDown(1.5);

  doc.text('Sin otro particular, saluda atte. A Ud. ');

  // Manipulación de todas las páginas para agregar encabezado y pie
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);

    // Encabezado
    const oldTopMargin = doc.page.margins.top;
    // doc.page.margins.top = 0;
    doc.image(headerImagePath, (fullPageWidth - 200) / 2, 10, { width: 200 });
    // doc.page.margins.top = oldTopMargin;

    // Pie de página
    const oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    
    doc.opacity(1).lineWidth(0.3).moveTo(40, doc.page.height - 55) // Punto inicial de la línea
    .lineTo(doc.page.width - 40, doc.page.height - 55) // Punto final de la línea
    .stroke(); // Dibujar la línea

    doc.fillColor('black');
    doc.opacity(1).lineWidth(1);
    doc.fontSize(9).text(
        `Bachillerato en Ciencias de la Ingeniería Plan - Común - General Lagos Nº 2086 -  Campus Miraflores · Valdivia · Chile`,
        40,
        doc.page.height - 45,
        { align: 'center' } // Centrado en la página
    );

    doc.text(
        `Fono: 56- 63-221859 -  email: bachilleratofci@uach.cl - · www.uach.cl`,
        40,
        doc.page.height - 30, // Posición debajo del texto existente
        { align: 'center' }
    );



    doc.page.margins.bottom = oldBottomMargin;
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
  // console.log(estudiantes);

  for (const estudiante of estudiantes) {
    const historial = await obtenerHistorial(estudiante.rut);
    const equivalencias = await obtenerHistorialEquivalente(estudiante.rut);
    const tabla = crearTabla(estudiante, historial, equivalencias);
    tablas.push(tabla);
  }
  return tablas;
}
