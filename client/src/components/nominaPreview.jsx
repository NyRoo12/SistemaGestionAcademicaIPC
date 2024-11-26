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

    return (
        <div>
            <h1>Visualizador de PDF</h1>
            {pdfUrl ? (
                <div style={{ height: '600px' }}>
                    <Worker workerUrl="/pdf.worker.min.js">
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
