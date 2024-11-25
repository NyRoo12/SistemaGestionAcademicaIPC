import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt } from "react-icons/fa";

const BotonesCertificados = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex space-x-12">
        <div
          className="bg-gray-400 p-12 rounded-xl shadow-xl w-80 flex flex-col items-center cursor-pointer hover:bg-gray-500 transition-all"
          onClick={() => navigate("")}
        >
          <FaUsers size={120} className="mb-6" />
          <h2 className="text-2xl font-bold text-center">Estudiantes en Transición</h2>
        </div>
        <div
          className="bg-gray-400 p-12 rounded-xl shadow-xl w-80 flex flex-col items-center cursor-pointer hover:bg-gray-500 transition-all"
          onClick={() => navigate("")}
        >
          <FaFileAlt size={120} className="mb-6" />
          <h2 className="text-2xl font-bold text-center">Certificados de Equivalencia</h2>
        </div>
      </div>
    </div>
  );
};

export default BotonesCertificados;
