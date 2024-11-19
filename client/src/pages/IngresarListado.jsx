import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import * as XLSX from "xlsx";

const IngresarListado = () => {
  const [students, setStudents] = useState([]);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Hook de navegación

  const requiredColumns = ["R.U.N.", "Nombre", "Ingreso"];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name;
    const reader = new FileReader();

    const validateColumns = (columns) => {
      const missingColumns = requiredColumns.filter(
        (col) => !columns.includes(col)
      );
      if (missingColumns.length > 0) {
        setErrorModal({
          open: true,
          message: `El archivo cargado no tiene las columnas necesarias: ${missingColumns.join(
            ", "
          )}`,
        });
        return false;
      }
      return true;
    };

    if (fileName.endsWith(".xlsx")) {
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const [headerRow, ...dataRows] = jsonData;

        if (!validateColumns(headerRow)) return;

        // Mapear las columnas a sus respectivos índices en el encabezado
        const columnIndexes = {
          rut: headerRow.indexOf("R.U.N."),
          nombre: headerRow.indexOf("Nombre"),
          ano: headerRow.indexOf("Ingreso"),
        };

        // Asignar los datos correctamente según las columnas
        const loadedStudents = dataRows.map((row) => {
          return {
            rut: row[columnIndexes.rut],
            nombre: row[columnIndexes.nombre],
            ano: row[columnIndexes.ano],
          };
        });

        console.log(loadedStudents);
        setStudents(loadedStudents);
      };
      reader.onerror = () =>
        setErrorModal({ open: true, message: "Error al leer el archivo." });
      reader.readAsArrayBuffer(file);
    } else {
      setErrorModal({
        open: true,
        message:
          "Formato de archivo no soportado. Cargue un archivo Excel (.xlsx).",
      });
    }
  };

  const confirmSubmission = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/estudiantes/cargaMasiva",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(students),
        }
      );
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
        <h2 className="font-bold text-xl mb-4">Carga Masiva de Estudiantes</h2>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="w-full px-3 py-2 border rounded"
        />

        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">Vista Previa</h2>
          {students.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {" "}
              {/* Barra de desplazamiento */}
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">R.U.N.</th>
                    <th className="py-2">Nombre</th>
                    <th className="py-2">Año de ingreso</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{student.rut}</td>
                      <td className="border px-4 py-2">{student.nombre}</td>
                      <td className="border px-4 py-2">{student.ano}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No hay estudiantes cargados aún.</p>
          )}
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

        {errorModal.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="font-bold text-xl mb-4">Error</h2>
              <p>{errorModal.message}</p>
              <div className="flex mt-4 justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => setErrorModal({ open: false, message: "" })}
                >
                  Cerrar
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
