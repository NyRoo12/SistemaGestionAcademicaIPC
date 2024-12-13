import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt, FaCog } from "react-icons/fa";
import ConfigModal from "./configModal.jsx";

const BotonesCertificados = () => {
  const navigate = useNavigate();
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex space-x-8">
        <div
          className="bg-gray-400 p-12 rounded-lg shadow-lg w-72 flex flex-col items-center cursor-pointer  hover:bg-gray-500"
          onClick={() => navigate("/pdf-viewer/nomina")}
        >
          <FaUsers size={70} className="mb-6" />
          <h2 className="text-lg font-bold">Nómina Estudiantes</h2>
        </div>
        <div
          className="bg-gray-400 p-12 rounded-lg shadow-lg w-72 flex flex-col items-center cursor-pointer  hover:bg-gray-500"
          onClick={() => navigate("/certificado-detallado")}
        >
          <FaFileAlt size={70} className="mb-6" />
          <h2 className="text-lg font-bold">Certificado Detallado</h2>
        </div>
      </div>
      <button
        className="fixed top-20 right-4 bg-gray-500 tebluext-white p-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-gray-600 transition-all"
        onClick={() => setIsConfigOpen(true)}
      >
        <FaCog size={24} />
        <span className="font-bold">Configuración</span>
      </button>

      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />
    </div>
  );
};

export default BotonesCertificados;