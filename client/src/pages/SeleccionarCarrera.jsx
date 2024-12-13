import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAndDownloadPdf } from '../components/descargarPDFdetallado';
import Modal from "../components/Modal.jsx";


const SeleccionarCarrera = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [noStudentsFound, setNoStudentsFound] = useState(false); // Estado para mostrar el mensaje cuando no hay estudiantes

  // Llama al backend para obtener las carreras
  const fetchCareers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/asignaturasEquivalentes/carreras`);
      if (!response.ok) throw new Error("Error en la solicitud");
      const result = await response.json();
      setCareers(result);
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };

  // Llama al backend para obtener los estudiantes y su historial académico
  const fetchStudents = async (carreraId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/estudiantes/porCarrera/${carreraId}`);
      if (!response.ok) throw new Error("Error en la solicitud");
      const estudiantes = await response.json();

      if (estudiantes.length === 0) {
          setNoStudentsFound(true); // No hay estudiantes, se actualiza el estado
          setShowTable(false); // Ocultar la tabla
          return;
      }

      const tablas = await Promise.all(estudiantes.map(async (estudiante) => {
          const historialResponse = await fetch(`http://localhost:3001/api/historialAcademico/obtenerHistorial/${estudiante.rut}`);
          const historial = await historialResponse.json();

          const equivalenciasResponse = await fetch(`http://localhost:3001/api/asignaturasEquivalentes/obtenerEquivalencias?query=${estudiante.rut}`);
          const equivalencias = await equivalenciasResponse.json();

          const historialConEquivalencias = historial.map((item) => {
              const equivalencia = equivalencias.find(eq => eq.codigo_IPC === item.codigo_IPC);
              const codigoDestino = equivalencia?.AsignaturasEquivalentes?.[0]?.codigo_destino || "N/A";
              return {
                  ...item,
                  codigo_destino: codigoDestino === "N/A" ? item.codigo_IPC : codigoDestino,
                  nombre: equivalencia?.AsignaturasEquivalentes?.[0]?.nombre || item.nombre_IPC,
              };
          });

          return {
              estudiante,
              historial: historialConEquivalencias,
              equivalencias,
          };
      }));

      setStudents(tablas);
      setShowTable(true);
      setNoStudentsFound(false); // Restablecer si se encontraron estudiantes
    } catch (error) {
        console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleSelectChange = (event) => {
    const selected = event.target.value;
    setSelectedCareer(selected);
    if (selected) {
      fetchStudents(selected);
    }
  };

  const handleDownloadPdf = () => {
    if (selectedCareer) {
      fetchAndDownloadPdf(selectedCareer); // Llama a la función utilitaria con el ID de la carrera
    } else {
      setModalMessage("Por favor, selecciona una carrera primero.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-200 mt-8">
      {/* Sidebar con el select */}
      <div className="w-1/4 p-6 bg-white shadow-md mt-8">
        <h1 className="text-2xl font-bold mb-6">Selecciona una carrera</h1>
        <select
          className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          value={selectedCareer || ""}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Selecciona una carrera
          </option>
          {careers.map((carrera, index) => (
            <option key={index} value={carrera.carrera}>
              {carrera.carrera}
            </option>
          ))}
        </select>

        <button
          onClick={handleDownloadPdf}
          className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-700"
        >
          Descargar Certificado
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6 flex flex-col relative mt-8">
        {showTable ? (
          <div className="overflow-auto flex-1">
            <h2 className="text-xl font-bold mb-4">Historial Académico</h2>
            {students.map(({ estudiante, historial }, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold">{estudiante.nombre} ({estudiante.rut})</h3>
                <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Código IPC</th>
                      <th className="border border-gray-300 px-4 py-2">Código Destino</th>
                      <th className="border border-gray-300 px-4 py-2">Nombre</th>
                      <th className="border border-gray-300 px-4 py-2">Nota</th>
                      <th className="border border-gray-300 px-4 py-2">Año</th>
                      <th className="border border-gray-300 px-4 py-2">Semestre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historial.map((item, i) => (
                      <tr key={i}>
                        <td className="border border-gray-300 px-4 py-2">{item.codigo_IPC}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.codigo_destino}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.nombre}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.nota}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.ano}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.semestre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          noStudentsFound && (
            <div className="text-red-600 font-semibold mt-4">
              No hay historial académico disponible para esta carrera.
            </div>
          )
        )}
      </div>

      <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Error"
          message={modalMessage}
        />
    </div>
  );
};

export default SeleccionarCarrera;
