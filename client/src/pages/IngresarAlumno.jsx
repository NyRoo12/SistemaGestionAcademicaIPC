import React, { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { useNavigate } from "react-router-dom"; // Importar useNavigate

function IngresarAlumno() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    nombre: "",
    rut: "",
    carrera: "",
    año: "",
  });

  const [modal, setModal] = useState({ isOpen: false, message: "" });
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [step, setStep] = useState(1);
  const [careers, setCareers] = useState([]);
  const [studentsWithoutHistory, setStudentsWithoutHistory] = useState([]);

  const fetchCareers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/asignaturasEquivalentes/carreras`);
      if (!response.ok) throw new Error("Error en la solicitud");
      const result = await response.json();
      setCareers(result);
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };

  const fetchStudentsWithoutHistory = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/historialAcademico/estudiantesSinHistorial");
      if (!response.ok) throw new Error("Error al obtener alumnos sin historial");
      const result = await response.json();
      setStudentsWithoutHistory(result.data);
    } catch (error) {
      console.error("Error fetching students without history:", error);
    }
  };

  useEffect(() => {
    fetchCareers();
    fetchStudentsWithoutHistory();
  }, []);

  const openModal = (message) => {
    setModal({ isOpen: true, message });
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: "" });
    if (modal.message === "Historial académico enviado exitosamente") {
      navigate("/botones-a");
    }
  };

  const enviarHistorialAcademico = async (rut, historialAcademico) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/historialAcademico/agregarHistorial/${rut}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(historialAcademico),
        }
      );
      if (!response.ok) {
        throw new Error('Error al enviar el historial académico');
      }
      openModal('Historial académico enviado exitosamente');
    } catch (error) {
      console.error('Error al enviar historial académico:', error);
      openModal('Hubo un error al enviar el historial académico');
    }
  };
  

  const enviarAsignaturasDestino = async (rut, carreraDestino) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/estudiantes/cargarCarreraDestino/${rut}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ carreraDestino }),
        }
      );
    if (!response.ok) {
        throw new Error('Error al enviar las asignaturas de destino');
      }
    } catch (error) {
      console.error('Error al enviar carrera de destino:', error);
      openModal('Hubo un error al enviar la carrera de destino');
    }
  };
  

  const formatRUT = (value) => {
    if (!value) return "";
    return value.replace(/^(\d{1,2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
  };

  const handleInputChange = (field, value) => {
    if (field === "rut") {
      value = value;
    }
    setStudent({ ...student, [field]: value });
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const processedData = [];
      jsonData.forEach((row) => {
        if (
          row.length > 0 &&
          !row[0].includes("Situación Periodo") &&
          !row[0].includes("P.S.P.") &&
          !row[0].includes("Situación Acumulada") &&
          !row[0].includes("P.G.A.")
        ) {
          processedData.push({
            Código: row[0] || "",
            Nombre: row[1] || "",
            Nota: row[2] || "",
            Régimen: row[3] || "",
            Nivel: row[4] || "",
            Año: row[5] || "",
            Periodo: row[6] || "",
            Créditos: row[7] || "",
            HrsPresenciales: row[8] || "",
            Estado: row[9] || "",
          });
        }
      });

      setData(processedData);
    };
    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.xls, .xlsx' });

  const handleDeleteFile = () => {
    setData([]);
    setFileName("");
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleVerifyStudent = () => {
    const studentFound = studentsWithoutHistory.find(
      (studentWithoutHistory) => studentWithoutHistory.rut === student.rut
    );

    if (studentFound) {
      setStudent({
        ...student,
        nombre: studentFound.nombre,
        año: studentFound.ano,
      });
    } else {
      openModal("El estudiante no se encuentra en la lista de alumnos sin historial.");
    }
  };

  const handleConfirmar = () => {
    if (student.rut && data.length > 0) {
      enviarAsignaturasDestino(student.rut, student.carrera);
      enviarHistorialAcademico(student.rut, data);
    } else {
      openModal('Por favor selecciona un estudiante y asegúrate de que el historial académico esté disponible');
    }
  };
  

  return (
    <div className="p-8 bg-gray-100 h-screen flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3 overflow-y-auto">
        {step === 1 ? (
          <>
            <div className="flex items-start justify-between">
              <div className="grid grid-cols-2 gap-4 flex-grow">
                <div className="col-span-2">
                  <label className="block font-semibold mb-2">Rut:</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={student.rut}
                      onChange={(e) => handleInputChange("rut", e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Ejemplo: 12365478-9"
                    />
                    <button
                      onClick={handleVerifyStudent}
                      className="ml-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
                    >
                      Verificar
                    </button>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold mb-2">Nombre:</label>
                  <input
                    type="text"
                    value={student.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block font-semibold mb-2">Carrera Destino:</label>
                  <select
                    value={student.carrera}
                    onChange={(e) => handleInputChange("carrera", e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Selecciona una carrera</option>
                    {careers.map((career, index) => (
                      <option key={index} value={career.carrera}>
                        {career.carrera}
                      </option>
                    ))}
                  </select>
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
            </div>
  
            <div className="mt-8">
              <h2 className="font-bold text-xl mb-4">Historial académico</h2>
              <div
                {...getRootProps()}
                className="bg-gray-300 p-6 rounded-lg flex justify-center items-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p className="ml-4 text-gray-600 text-center">
                  Arrastra un archivo Excel aquí, o haz clic para seleccionarlo
                </p>
              </div>
  
              {fileName && (
                <div className="mt-4">
                  <p className="text-green-600">{fileName} ha sido cargado.</p>
                  <button
                    onClick={handleDeleteFile}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Eliminar archivo
                  </button>
                </div>
              )}
            </div>
  
            <button
              onClick={handleContinue}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Continuar
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Confirmar Datos del Alumno</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Datos Personales</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold">Nombre:</label>
                  <p>{student.nombre}</p>
                </div>
                <div>
                  <label className="font-semibold">Rut:</label>
                  <p>{student.rut}</p>
                </div>
                <div>
                  <label className="font-semibold">Carrera Destino:</label>
                  <p>{student.carrera}</p>
                </div>
                <div>
                  <label className="font-semibold">Año de Ingreso:</label>
                  <p>{student.año}</p>
                </div>
              </div>
            </div>
  
            <h3 className="text-xl font-semibold mb-4">Datos Académicos</h3>
            <div style={{ overflowX: "auto" }}>
              <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Nota</th>
                    <th>Régimen</th>
                    <th>Nivel</th>
                    <th>Año</th>
                    <th>Periodo</th>
                    <th>Créditos</th>
                    <th>Hrs. Presenciales</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.Código}</td>
                      <td>{row.Nombre}</td>
                      <td>{row.Nota}</td>
                      <td>{row.Régimen}</td>
                      <td>{row.Nivel}</td>
                      <td>{row.Año}</td>
                      <td>{row.Periodo}</td>
                      <td>{row.Créditos}</td>
                      <td>{row.HrsPresenciales}</td>
                      <td>{row.Estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Volver
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleConfirmar}
              >
                Confirmar
              </button>
            </div>
          </>
        )}
  
        {/* Modal */}
        {modal.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-bold mb-4">Mensaje</h2>
              <p className="mb-6">{modal.message}</p>
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IngresarAlumno;
