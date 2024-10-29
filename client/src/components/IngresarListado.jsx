import React, { useState, useEffect } from "react";

const IngresarAlumno = () => {
  const [students, setStudents] = useState([]); // Estado para almacenar datos de estudiantes
  const [error, setError] = useState(""); // Estado para almacenar errores de carga

  // Función para procesar el archivo CSV
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const lines = fileContent.split("\n");
      
      // Procesar el archivo CSV y actualizar el estado
      const loadedStudents = lines.map((line) => {
        const [nombre, rut, carrera, año] = line.split(",");
        return { nombre, rut, carrera, año };
      });
      
      setStudents(loadedStudents);
      setError("");
    };
    reader.onerror = () => {
      setError("Hubo un error al leer el archivo.");
    };
  
    // Forzar la codificación UTF-8 para caracteres especiales
    reader.readAsText(file, "UTF-8");
  };
  

  // Renderizado del formulario
  return (
    <div className="p-8 bg-gray-100 h-screen flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
        <div className="flex items-start justify-between">
          {/* Sección de carga de archivo */}
          <div className="col-span-2">
            <h2 className="font-bold text-xl mb-4">Carga Masiva de Estudiantes</h2>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border rounded"
            />
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>

        {/* Vista previa de estudiantes cargados */}
        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">Vista Previa de Estudiantes Cargados</h2>
          {students.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">RUT</th>
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Año</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{student.nombre}</td>
                    <td className="border px-4 py-2">{student.rut}</td>
                    <td className="border px-4 py-2">{student.carrera}</td>
                    <td className="border px-4 py-2">{student.año}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No hay estudiantes cargados aún.</p>
          )}
        </div>

        {/* Botón para enviar los datos al backend */}
        <div className="flex justify-end mt-8">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            disabled={students.length === 0} // Desactivar si no hay estudiantes cargados
            onClick={async () => {
              try {
                const response = await fetch("http://localhost:3001/api/estudiantes/cargaMasiva", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(students),
                });
                if (!response.ok) {
                  throw new Error("Error en la carga masiva de estudiantes.");
                }
                alert("Estudiantes cargados exitosamente.");
              } catch (error) {
                console.error("Error en la carga masiva:", error);
              }
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngresarAlumno;
