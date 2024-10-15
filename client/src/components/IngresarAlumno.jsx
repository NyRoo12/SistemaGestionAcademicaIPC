import React, { useState } from "react";

function IngresarAlumno() {
  // Estado para manejar los valores de los inputs del estudiante
  const [student, setStudent] = useState({
    nombre: "",
    rut: "",
    carrera: "",
    año: "",
  });

  // Función para manejar el cambio de valor en los inputs
  const handleInputChange = (field, value) => {
    setStudent({ ...student, [field]: value });
  };

  return (
    <div className="p-8 bg-gray-100 h-screen flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
        <div className="flex items-start justify-between">
          {/* Formulario de datos del estudiante */}
          <div className="grid grid-cols-2 gap-4 flex-grow">
            <div className="col-span-2">
              <label className="block font-semibold mb-2">Nombre:</label>
              <input
                type="text"
                value={student.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-semibold mb-2">Rut:</label>
              <input
                type="text"
                value={student.rut}
                onChange={(e) => handleInputChange("rut", e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="col-span-1">
              <label className="block font-semibold mb-2">Carrera Destino:</label>
              <input
                type="text"
                value={student.carrera}
                onChange={(e) => handleInputChange("carrera", e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="col-span-1">
              <label className="block font-semibold mb-2">Año de Ingreso:</label>
              <input
                type="text"
                value={student.año}
                onChange={(e) => handleInputChange("año", e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Ícono del perfil del estudiante alineado a la derecha */}
          <div className="ml-8">
            <div className="bg-gray-300 w-32 h-32 rounded-full flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-700" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" /> 
              </svg>
            </div>
          </div>
        </div>
        
        {/* Historial Académico (sin funcionalidad de arrastrar archivo) */}
        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">Historial académico</h2>
          <div className="bg-gray-300 p-6 rounded-lg flex justify-center items-center">
          <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-16 w-16 text-gray-700"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth="2"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h6a2 2 0 012 2v4h4a2 2 0 012 2v2"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M14 2l6 6m-3 4v6m-3-3h6"
  />
</svg>

            <p className="ml-4 text-gray-600 text-center">
              Arrastra el archivo o examinar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngresarAlumno;
