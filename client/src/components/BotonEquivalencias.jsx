import React from "react";

const BotonEquivalencias = ({ mostrarEquivalencias, onClick }) => {
  return (
    <div className="flex justify-end mb-4"> {/* Alineación a la derecha */}
      <button
        onClick={onClick}
        className="bg-blue-500 text-white h-12 w-48 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
        style={{ minWidth: "12rem" }} // Fija el tamaño mínimo
      >
        {mostrarEquivalencias ? (
          <span className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H9m6 0h3m-3 0h-3M9 16l-4 4m0 0l4-4m-4 4l4-4m3-12l4 4m0 0l-4-4m4 4l-4-4"
              />
            </svg>
            Cerrar Equivalencias
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H9m6 0h3m-3 0h-3M9 16l-4 4m0 0l4-4m-4 4l4-4m3-12l4 4m0 0l-4-4m4 4l-4-4"
              />
            </svg>
            Ver Equivalencias
          </span>
        )}
      </button>
    </div>
  );
};

export default BotonEquivalencias;
