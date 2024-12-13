import React, { useEffect, useState } from 'react';
import { MdSimCardDownload } from "react-icons/md";

const PdfViewer = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch the students' data
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/estudiantes/');
                if (!response.ok) {
                    throw new Error('Error fetching students');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const downloadPdf = async () => {
        try {
            const url = "http://localhost:3001/api/pdf/nomina";
            const response = await fetch(url, { method: "GET" });
            if (!response.ok) {
                throw new Error('Error fetching PDF');
            }
            const blob = await response.blob();
            const urlBlob = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = urlBlob;
            link.download = `nomina.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <div className="flex flex-row items-start justify-between min-h-screen bg-white py-8 px-8 mt-20">
            <div className="w-2/3">
                <h1 className="text-xl font-bold mb-6">Nomina de Estudiantes</h1>
                <div className="overflow-x-auto w-full">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                                <th className="border border-gray-300 px-4 py-2">RUT</th>
                                <th className="border border-gray-300 px-4 py-2">Carrera Destino</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{student.nombre}</td>
                                    <td className="border border-gray-300 px-4 py-2">{student.rut}</td>
                                    <td className="border border-gray-300 px-4 py-2">{student.carreraDestino}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-1/3 flex flex-col items-center justify-center">
                <button
                    onClick={downloadPdf}
                    className="bg-blue-500 text-white py-4 px-8 rounded hover:bg-blue-600 transition transform hover:scale-105">
                    <MdSimCardDownload size={40} className="mb-2" /> Descargar Nómina
                </button>
            </div>
        </div>
    );
};

export default PdfViewer;
