import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons"; // Ícono referencial

const IngresarListado = () => {
  const [students, setStudents] = useState([]);
  const [errorModal, setErrorModal] = useState({ open: false, message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState(""); // Estado para el nombre del archivo cargado
  const navigate = useNavigate();
  const [notificationModal, setNotificationModal] = useState({
    open: false,
    message: "",
  });
  

  const requiredColumns = ["R.U.N.", "Nombre", "Ingreso"];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setFileName(file.name); // Guarda el nombre del archivo seleccionado
    event.target.blur(); // Libera el enfoque del input de archivo
    document.body.focus();
  
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
        setStudents([]); // Limpia la vista previa
        return false;
      }
      return true;
    };
  
    if (file.name.endsWith(".xlsx")) {
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
        const [headerRow, ...dataRows] = jsonData;
  
        if (!validateColumns(headerRow)) {
          setStudents([]); // Limpia la vista previa
          return;
        }
  
        // Limpia el mensaje de error si el archivo es válido
        setErrorModal({ open: false, message: "" });
  
        const columnIndexes = {
          rut: headerRow.indexOf("R.U.N."),
          nombre: headerRow.indexOf("Nombre"),
          ano: headerRow.indexOf("Ingreso"),
        };
  
        const loadedStudents = dataRows.map((row) => {
          return {
            rut: row[columnIndexes.rut],
            nombre: row[columnIndexes.nombre],
            ano: row[columnIndexes.ano],
          };
        });
  
        setStudents(loadedStudents);
      };
  
      reader.onerror = () => {
        setErrorModal({ open: true, message: "Error al leer el archivo." });
        setStudents([]); // Limpia la vista previa
      };
  
      reader.readAsArrayBuffer(file);
    } else {
      setErrorModal({
        open: true,
        message: "Formato de archivo no soportado. Cargue un archivo Excel (.xlsx).",
      });
      setStudents([]); // Limpia la vista previa
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
  
      // Cierra el modal de confirmación y muestra el de notificación
      setIsModalOpen(false);
      setNotificationModal({
        open: true,
        message: "¡Los archivos se cargaron con éxito!",
      });
  
      // Limpia la lista de estudiantes después del éxito
      setStudents([]);
    } catch (error) {
      setIsModalOpen(false);
      setNotificationModal({
        open: true,
        message: "Hubo un problema al cargar los archivos. Intenta nuevamente.",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/botones-a"); // Redirige al finalizar
  };


  return (
    <div className="p-8 bg-gray-100 h-screen flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
        <div className="flex items-start justify-between">
          <div className="col-span-2 mb-4">
            <h2 className="font-bold text-xl mb-4">Carga Masiva de Estudiantes</h2>
            {/* Selector estilizado */}
            <label className="flex items-center border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-100">
              {fileName && (
                <FontAwesomeIcon
                  icon={faFileAlt}
                  size="2x"
                  className="text-green-500 mr-2"
                />
              )}
              <span className="flex-1 truncate">
                {fileName || "Seleccionar archivo"}
              </span>
              <input
                type="file"
                accept=".csv, .xlsx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {errorModal.open && (
              <p className="text-red-600 mt-2">{errorModal.message}</p>
            )}
          </div>
        </div>
  
        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">Vista Previa</h2>
          {students.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
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
  
        {/* Modal de confirmación */}
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
  
        {/* Modal de notificación */}
        {notificationModal.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="font-bold text-xl mb-4">Notificación</h2>
              <p>{notificationModal.message}</p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => {
                    setNotificationModal({ open: false, message: "" });
                    navigate("/botones-a"); // Navegar tras cerrar
                  }}
                >
                  Aceptar
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
