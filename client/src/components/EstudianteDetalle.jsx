import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TarjetaHistorial from "./TarjetaHistorial.jsx";
import BotonEquivalencias from "./BotonEquivalencias.jsx"; // Importa el componente

const EstudianteDetalle = () => {
  const { rut } = useParams();
  const [estudiante, setEstudiante] = useState(null);
  const [historial, setHistorial] = useState(null);
  console.log(rut);

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/estudiantes/obtenerDetalle?query=${encodeURIComponent(
            rut
          )}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el estudiante");
        }
        const result = await response.json();
        setEstudiante(result);
        console.log("mostrar detalles del estudiante");
        console.log(result);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchEstudiante();
  }, [rut]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/historialAcademico/obtenerHistorial?query=${encodeURIComponent(
            rut
          )}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el historial");
        }
        const result = await response.json();
        setHistorial(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchHistorial();
  }, [rut]);

  if (!estudiante) {
    return <div>Cargando detalles del estudiante...</div>;
  }

  if (!historial) {
    return <div>Cargando detalles del historial...</div>;
  }

  return (
<div className="min-h-screen p-8 bg-gray-100">
    {/* Sección para mostrar los detalles del estudiante */}
    <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Detalles del Estudiante</h2>
      
      {/* Contenedor flex para alinear el icono y el texto horizontalmente */}
      <div className="flex items-center">
        {/* Icono de usuario */}
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

        {/* Texto del estudiante */}
        <div>
          <p><span className="font-semibold">Nombre:</span> {estudiante.nombre}</p>
          <p><span className="font-semibold">RUT:</span> {estudiante.rut}</p>
          <p><span className="font-semibold">Carrera Destino:</span> {estudiante.carreraDestino}</p>
        </div>
      </div>
    </div>

      {/* Botón para mostrar equivalencias */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
        <BotonEquivalencias rut={rut} />
      </div>

      {/* Sección para mostrar el historial académico */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        Historial Académico
      </h2>
      <div className="flex justify-center flex-wrap">
        <TarjetaHistorial
          key={-1}
          codigoIPC="Codigo"
          nombre="Nombre"
          nota="Nota"
          ano="Año"
          semestre="Semestre"
          estado={-1}
        />
        {historial.map((item, index) => (
          <TarjetaHistorial
            key={index}
            codigoIPC={item.codigo_IPC}
            nombre={item.nombre_IPC}
            nota={item.nota}
            ano={item.ano}
            semestre={item.semestre}
            estado={item.estado}
          />
        ))}
      </div>
    </div>
  );
};

export default EstudianteDetalle;