import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt } from "react-icons/fa";

const BotonesCertificados = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 relative">
      <div className="flex space-x-12">
        <div
          className="bg-gray-400 p-12 rounded-xl shadow-xl w-80 flex flex-col items-center cursor-pointer hover:bg-gray-500 transition-all"
          onClick={() => navigate("/estudiantes-transicion")}
        >
          <FaUsers size={120} className="mb-6" />
          <h2 className="text-2xl font-bold text-center">Estudiantes en Transición</h2>
        </div>
        <div
          className="bg-gray-400 p-12 rounded-xl shadow-xl w-80 flex flex-col items-center cursor-pointer hover:bg-gray-500 transition-all"
          onClick={() => navigate("/certificados-equivalencia")}
        >
          <FaFileAlt size={120} className="mb-6" />
          <h2 className="text-2xl font-bold text-center">Certificados de Equivalencia</h2>
        </div>
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-600 transition-all"
        onClick={() => navigate("/logs")}
      >
        <FaFileAlt size={24} />
        <span className="font-bold">LOGS</span>
      </button>
    </div>
  );
};

export default BotonesCertificados;
