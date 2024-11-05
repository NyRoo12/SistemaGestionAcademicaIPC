import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importa useNavigate
import * as XLSX from "xlsx";

const IngresarListado = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();  // Hook de navegación

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name;
    const reader = new FileReader();

    if (fileName.endsWith(".csv")) {
      reader.onload = (e) => {
        const fileContent = e.target.result;
        const lines = fileContent.split("\n");

        const loadedStudents = lines.map((line) => {
          const [nombre, rut, carrera, año] = line.split(",");
          return { nombre, rut, carrera, año };
        });

        setStudents(loadedStudents);
        setError("");
      };
      reader.onerror = () => setError("Hubo un error al leer el archivo.");
      reader.readAsText(file, "UTF-8");

    } else if (fileName.endsWith(".xlsx")) {
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const loadedStudents = jsonData.slice(1).map((row) => {
          const [nombre, rut, carrera, año] = row;
          return { nombre, rut, carrera, año };
        });

        setStudents(loadedStudents);
        setError("");
      };
      reader.onerror = () => setError("Hubo un error al leer el archivo.");
      reader.readAsArrayBuffer(file);

    } else {
      setError("Formato de archivo no soportado. Cargue un archivo CSV o Excel (.xlsx).");
    }
  };

  const confirmSubmission = async () => {
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
      setStudents([]);
      setIsModalOpen(false);

      // Navega a "/botones-a" después de la confirmación exitosa
      navigate("/botones-a");
    } catch (error) {
      console.error("Error en la carga masiva:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 h-screen flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
        <div className="flex items-start justify-between">
          <div className="col-span-2">
            <h2 className="font-bold text-xl mb-4">Carga Masiva de Estudiantes</h2>
            <input
              type="file"
              accept=".csv, .xlsx"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border rounded"
            />
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">Vista Previa de Estudiantes Cargados</h2>
          <div className="max-h-64 overflow-y-auto"> {/* Contenedor con desplazamiento vertical */}
            {students.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Nombre</th>
                    <th className="py-2">RUT</th>
                    <th className="py-2">Año</th>
                    <th className="py-2">Ingreso</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{student.rut}</td>
                      <td className="border px-4 py-2">{student.nombre}</td>
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
        </div>

        <div className="flex justify-end mt-8">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            disabled={students.length === 0}
            onClick={() => setIsModalOpen(true)}
          >
            Enviar
          </button>
        </div>

        {/* Modal de Confirmación */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="font-bold text-xl mb-4">Confirmación</h2>
              <p>¿Estás seguro de que deseas cargar estos estudiantes?</p>
              <div className="flex mt-4 space-x-2 justify-end">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={confirmSubmission}
                >
                  Sí, Confirmar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngresarListado;
