import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TarjetaHistorial from "./TarjetaHistorial.jsx";

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
    estudiante;
    return <div>Cargando detalles del estudiante...</div>;
  }

  if (!historial) {
    historial;
    return <div>Cargando detalles del historial...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
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
