import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBook } from "react-icons/fa";

const botonesAlumnos = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex space-x-8">
        <div
          className="bg-gray-400 p-8 rounded-lg shadow-lg w-64 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/ingresar-alumno")}
        >
          <FaUser size={50} className="mb-4" />
          <h2 className="text-lg font-bold">Ingresar Estudiantes</h2>
        </div>
        <div
          className="bg-gray-400 p-8 rounded-lg shadow-lg w-64 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/ingresar-listado")}
        >
          <FaBook size={50} className="mb-4" />
          <h2 className="text-lg font-bold">Ingresar Listado</h2>
        </div>
      </div>
    </div>
  );
};

export default botonesAlumnos;
