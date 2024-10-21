import React from "react";

const DetallesEstudiante = ({ estudiante }) => {
  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Detalles del Estudiante</h2>
      {estudiante ? (
        <div className="flex items-center">
          <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full mr-4">
            <svg
              className="w-12 h-12 text-gray-700"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
            </svg>
          </div>
          <div>
            <p>
              <span className="font-semibold">Nombre:</span> {estudiante.nombre}
            </p>
            <p>
              <span className="font-semibold">RUT:</span> {estudiante.rut}
            </p>
            <p>
              <span className="font-semibold">Carrera Destino:</span>{" "}
              {estudiante.carreraDestino}
            </p>
          </div>
        </div>
      ) : (
        <p>Cargando detalles del estudiante...</p>
      )}
    </div>
  );
};

export default DetallesEstudiante;