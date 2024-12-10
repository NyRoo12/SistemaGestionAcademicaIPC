import React, { useEffect, useState } from 'react';
import { MdSimCardDownload } from "react-icons/md";
import { useParams } from "react-router-dom";

const PdfViewer = () => {
    const { id } = useParams(); // Obtiene el ID de la URL
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const url =
                id === "nomina"
                  ? "http://localhost:3001/api/pdf/nomina"
                  : `http://localhost:3001/api/pdf/detallado/${id}`;
      
              const response = await fetch(url, { method: "GET" });
                if (!response.ok) {
                    throw new Error('Error fetching PDF');
                }
                const blob = await response.blob();
                const urlBlob = window.URL.createObjectURL(blob);
                setPdfUrl(urlBlob);
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
        <div className="flex flex-col items-center justify-start min-h-screen bg-white py-8">
            <label className="text-lg font-medium">SU PDF ESTA LISTO</label>
            <button 
                className="bg-gray-300 py-6 px-9 rounded-lg flex flex-row justify-center items-center hover:bg-gray-400 transition transform hover:scale-105" onClick={downloadPdf}>
                <MdSimCardDownload size={100} />
                <span className="ml-2 text-center">Descargar PDF</span>
            </button>
        </div>

    );
};

export default PdfViewer;