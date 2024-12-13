import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt } from "react-icons/fa";

const BotonesCertificados = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex space-x-8">
        <div
          className="bg-gray-400 p-8 rounded-lg shadow-lg w-64 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("")}
        >
          <FaUsers size={50} className="mb-4" />
          <h2 className="text-lg font-bold">Nómina Estudiantes</h2>
        </div>
        <div
          className="bg-gray-400 p-8 rounded-lg shadow-lg w-64 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("")}
        >
          <FaFileAlt size={50} className="mb-4" />
          <h2 className="text-lg font-bold">Certificados</h2>
        </div>
      </div>
    </div>
  );
};

export default BotonesCertificados;
