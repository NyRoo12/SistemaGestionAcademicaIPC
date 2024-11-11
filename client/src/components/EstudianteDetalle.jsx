import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetallesEstudiante from "./DetallesEstudiante.jsx";
import BotonEquivalencias from "./BotonEquivalencias.jsx";
import HistorialAcademico from "../pages/HistorialAcademico.jsx";

const EstudianteDetalle = () => {
  const { rut } = useParams();
  const [estudiante, setEstudiante] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [equivalencias, setEquivalencias] = useState([]);
  const [mostrarEquivalencias, setMostrarEquivalencias] = useState(false);

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/estudiantes/obtenerDetalle?query=${encodeURIComponent(rut)}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el estudiante");
        }
        const result = await response.json();
        setEstudiante(result);
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
          `http://localhost:3001/api/historialAcademico/obtenerHistorial/${encodeURIComponent(rut)}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el historial");
        }
        const result = await response.json();
        console.log(result)
        setHistorial(result);
      } catch (error) {
        console.error("Error fetching academic history:", error);
      }
    };

    fetchHistorial();
  }, [rut]);

  useEffect(() => {
    if (mostrarEquivalencias) {
      const fetchEquivalencias = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/api/asignaturasEquivalentes/obtenerEquivalencias?query=${encodeURIComponent(rut)}`
          );
          if (!response.ok) {
            throw new Error("Error al obtener las equivalencias");
          }
          const result = await response.json();
          const transformedResult = result.flatMap(asignatura => 
            asignatura.AsignaturasEquivalentes.map(eq => ({
              codigo_IPC: asignatura.codigo_IPC,
              nombre_IPC: asignatura.nombre_IPC,
              codigo_destino: eq.codigo_destino,
              nombre: eq.nombre,
              carrera: eq.carrera
            }))
          );
          console.log(transformedResult);
          setEquivalencias(transformedResult);
        } catch (error) {
          console.error("No se pudo obtener las equivalencias", error);
        }
      };

      fetchEquivalencias();
    } else {
      setEquivalencias([]);
    }
  }, [rut, mostrarEquivalencias]);

  const handleClick = () => {
    setMostrarEquivalencias(!mostrarEquivalencias);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col">
      <div className="flex mb-4">
        <div className="w-1/3 pr-4"> {/* Información del estudiante a la izquierda */}
          <DetallesEstudiante estudiante={estudiante} />
          <BotonEquivalencias
            mostrarEquivalencias={mostrarEquivalencias}
            onClick={handleClick}
          />
        </div>
        <div className="w-2/3"> {/* Historial académico a la derecha */}
          <HistorialAcademico
            historial={historial}
            equivalencias={equivalencias}
            mostrarEquivalencias={mostrarEquivalencias}
          />
        </div>
      </div>
    </div>
  );
};

export default EstudianteDetalle;