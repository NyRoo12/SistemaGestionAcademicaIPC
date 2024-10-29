import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBook } from "react-icons/fa";

const BotonesAlumnos = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex space-x-8">
        <div
          className="bg-gray-400 p-12 rounded-lg shadow-lg w-72 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/ingresar-alumno")}
        >
          <FaUser size={70} className="mb-6" />
          <h2 className="text-xl font-bold">Ingresar Estudiantes</h2>
        </div>
        <div
          className="bg-gray-400 p-12 rounded-lg shadow-lg w-72 flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/ingresar-listado")}
        >
          <FaBook size={70} className="mb-6" />
          <h2 className="text-xl font-bold">Ingresar Listado</h2>
        </div>
      </div>
    </div>
  );
};

export default BotonesAlumnos;
