// import React, { useState, useEffect } from 'react';
// import { pdfjs } from 'pdfjs-dist/webpack';

// const PDFViewer = () => {
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [pdfDocument, setPdfDocument] = useState(null);

//   // Cargar el PDF desde la URL y generar un blob URL
//   const fetchPdf = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/pdf/nomina-pdf`); // Aquí va la URL de tu archivo PDF en el backend
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setPdfUrl(url);
//     } catch (error) {
//       console.error('Error al obtener el PDF:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPdf();
//   }, []);

//   // Función para renderizar las páginas del PDF en un canvas
//   const renderPage = (pageNum) => {
//     if (!pdfDocument) return;

//     pdfDocument.getPage(pageNum).then((page) => {
//       const canvas = document.getElementById(`pdf-canvas-${pageNum}`);
//       const context = canvas.getContext('2d');

//       const viewport = page.getViewport({ scale: 1 });
//       canvas.height = viewport.height;
//       canvas.width = viewport.width;

//       page.render({
//         canvasContext: context,
//         viewport: viewport,
//       });
//     });
//   };

//   useEffect(() => {
//     if (pdfUrl) {
//       pdfjs.getDocument(pdfUrl).promise.then((doc) => {
//         setPdfDocument(doc);
//         renderPage(1); // Renderizamos la primera página
//       }).catch((err) => {
//         console.error('Error al cargar el documento PDF:', err);
//       });
//     }
//   }, [pdfUrl]);

//   return (
//     <div>
//       {pdfDocument ? (
//         <div>
//           {/* Renderizar las páginas del PDF en un canvas */}
//           <canvas id="pdf-canvas-1"></canvas>
//           {/* Si necesitas múltiples páginas, puedes agregar más canvas y renderizar cada página */}
//         </div>
//       ) : (
//         <p>Cargando PDF...</p>
//       )}
//     </div>
//   );
// };

// export default PDFViewer;



import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = () => {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/pdf/nomina-pdf', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/pdf',
                    },
                });
                if (!response.ok) {
                    throw new Error('Error fetching PDF');
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                setPdfUrl(url);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };

        fetchPdf();
    }, []);

    const downloadPdf = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleClick = async () => {
        const response = await fetch('http://localhost:3001/api/pdf/nomina-pdf', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching PDF');
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
        window.URL.revokeObjectURL(url);

    };

    return (
        <div>
            <h1>Visualizador de PDF</h1>
            {pdfUrl ? (
                <div style={{ height: '600px' }}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={pdfUrl} />
                    </Worker>
                </div>
            ) : (
                <p>Cargando PDF...</p>
            )}
            <button onClick={downloadPdf}>Descargar PDF</button>
        </div>
    );
};

export default PdfViewer;
