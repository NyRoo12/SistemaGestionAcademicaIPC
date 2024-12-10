import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt } from "react-icons/fa";

const BotonesCertificados = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex space-x-8">
        <div
          className="bg-gray-400 p-12 rounded-lg shadow-lg w-72 flex flex-col items-center cursor-pointer  hover:bg-gray-500"
          onClick={() => navigate("/nomina-estudiantes/nomina")}
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
    </div>
  );
};

export default BotonesCertificados;