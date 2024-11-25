import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBook } from "react-icons/fa";

const BotonesAlumnos = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex space-x-12">
        <div
          className="bg-gray-400 p-14 rounded-xl shadow-xl w-80 flex flex-col items-center cursor-pointer hover:bg-gray-500 transition-all"
          onClick={() => navigate("/ingresar-listado")}
        >
          <FaBook size={100} className="mb-8" />
          <h2 className="text-2xl font-bold text-center">Importar Listado</h2>
        </div>
        <div
          className="bg-gray-400 p-14 rounded-xl shadow-xl w-80 flex flex-col items-center cursor-pointer hover:bg-gray-500 transition-all"
          onClick={() => navigate("/ingresar-alumno")}
        >
          <FaUser size={100} className="mb-8" />
          <h2 className="text-2xl font-bold text-center">Importar Historial Académico</h2>
        </div>
      </div>
    </div>
  );
};

export default BotonesAlumnos;
