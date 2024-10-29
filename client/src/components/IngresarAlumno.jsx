import React, { useState, useEffect } from "react";

const IngresarAlumno = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [student, setStudent] = useState({
    nombre: "",
    rut: "",
    carrera: "",
    año: "",
  });
  const [nombreError, setNombreError] = useState(""); // Para el error del nombre

  // Cargar asignaturasIPC desde el backend al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/asignaturasIPC`);
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Función para manejar el cambio de valor en los inputs
  const handleInputChange = (field, value) => {
    setStudent({ ...student, [field]: value });
  };

  // Verificar si el nombre ya existe en la base de datos al hacer clic en el botón
  const verificarNombre = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/estudiantes/verificarNombre?nombre=${encodeURIComponent(student.nombre)}`
      );
      const result = await response.json();
      if (result.exists) {
        setNombreError("El nombre del estudiante ya existe en la base de datos.");
      } else {
        setNombreError("El nombre es válido y no está registrado.");
      }
    } catch (error) {
      console.error("Error verificando el nombre:", error);
      setNombreError("Ocurrió un error al verificar el nombre.");
    }
  };

  // Función para formatear el RUT con puntos y guion
  const formatRUT = (rut) => {
    const cleanRUT = rut.replace(/[^0-9kK]/g, "");
    if (cleanRUT.length > 1) {
      const body = cleanRUT.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const dv = cleanRUT.slice(-1);
      return `${body}-${dv}`;
    }
    return cleanRUT;
  };

  const handleRUTChange = (value) => {
    setStudent({ ...student, rut: formatRUT(value) });
  };

  return (
    <div className="p-8 bg-gray-100 h-screen flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3">
        <div className="flex items-start justify-between">
          {/* Formulario de datos del estudiante */}
          <div className="grid grid-cols-2 gap-4 flex-grow">
            <div className="col-span-2">
              <label className="block font-semibold mb-2">Nombre Completo:</label>
              <input
                type="text"
                value={student.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Botón para verificar el nombre */}
            <div className="mt-4">
              <button
                onClick={verificarNombre}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Verificar Nombre
              </button>
            </div>

            {/* Mostrar el mensaje de error o éxito */}
            {nombreError && (
              <div
                className={`mt-4 p-4 ${
                  nombreError.includes("existe")
                    ? "bg-red-100"
                    : "bg-green-100"
                } text-${
                  nombreError.includes("existe") ? "red-600" : "green-600"
                } border ${
                  nombreError.includes("existe")
                    ? "border-red-500"
                    : "border-green-500"
                } rounded`}
              >
                {nombreError}
              </div>
            )}

            <div className="col-span-2">
              <label className="block font-semibold mb-2">Rut:</label>
              <input
                type="text"
                value={student.rut}
                onChange={(e) => handleRUTChange(e.target.value)}
                maxLength="12"
                placeholder="Ej: 12.345.678-9"
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
                <option value="" disabled>
                  Selecciona una carrera
                </option>
                <option value="Ingeniería Civil Acústica">
                  Ingeniería Civil Acústica
                </option>
                <option value="Ingeniería Naval">Ingeniería Naval</option>
                <option value="Ingeniería en Construcción">
                  Ingeniería en Construcción
                </option>
                <option value="Ingeniería Civil en Obras Civiles">
                  Ingeniería Civil en Obras Civiles
                </option>
                <option value="Ingeniería Civil Mecánica">
                  Ingeniería Civil Mecánica
                </option>
                <option value="Ingeniería Civil Electrónica">
                  Ingeniería Civil Electrónica
                </option>
                <option value="Ingeniería Civil en Informática">
                  Ingeniería Civil en Informática
                </option>
                <option value="Ingeniería Civil Industrial">
                  Ingeniería Civil Industrial
                </option>
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

          {/* Ícono del perfil del estudiante */}
          <div className="ml-8">
            <div className="bg-gray-300 w-32 h-32 rounded-full flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-700"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Historial Académico */}
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

        {/* Botón de Siguiente */}
        <div className="flex justify-end mt-8">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            disabled={nombreError !== ""} // Desactivar el botón si hay error
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngresarAlumno;
