import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SeleccionarCarrera = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);

  // Llama al backend para obtener las carreras
  const fetchCareers = async () => {
    try {
      const response = await fetch(`http://146.83.216.166:4006/api/asignaturasEquivalentes/carreras`);
      if (!response.ok) throw new Error("Error en la solicitud");
      const result = await response.json();
      console.log(result);
      setCareers(result);
      console.log(careers);
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mt-16 mb-4">Selecciona una carrera</h1>
        <div className="grid grid-cols-2 gap-6 mt-16">
        {careers.map((carrera, index) => (
          <button
            key={index}
            className="bg-yellow-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-yellow-700"
            onClick={() => {
              console.log("Carrera seleccionada:", carrera.carrera); // Verifica el valor
              navigate(`/pdf-viewer/${carrera.carrera}`);
            }}
          >
            {carrera.carrera}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeleccionarCarrera;