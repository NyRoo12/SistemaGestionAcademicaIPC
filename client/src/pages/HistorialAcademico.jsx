import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetallesEstudiante from "../components/DetallesEstudiante.jsx";
import BotonEquivalencias from "../components/BotonEquivalencias.jsx";
import BotonEliminar from "../components/BotonEliminar.jsx";
import TarjetaHistorial from "../components/TarjetaHistorial.jsx";  // Importa la tarjeta del historial académico

const HistorialAcademico = () => {
  const { rut } = useParams();
  const [estudiante, setEstudiante] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [equivalencias, setEquivalencias] = useState([]);
  const [mostrarEquivalencias, setMostrarEquivalencias] = useState(false);

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const response = await fetch(
          `http://146.83.216.166:4006/api/estudiantes/obtenerDetalle?query=${encodeURIComponent(rut)}`
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
          `http://146.83.216.166:4006/api/historialAcademico/obtenerHistorial/${encodeURIComponent(rut)}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el historial");
        }
        const result = await response.json();
        console.log(result);
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
            `http://146.83.216.166:4006/api/asignaturasEquivalentes/obtenerEquivalencias?query=${encodeURIComponent(rut)}`
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
      <div className="flex justify-between items-center mb-4 mt-14">
        {/* Información del estudiante en la parte izquierda */}
        <DetallesEstudiante estudiante={estudiante} />
        {/* Botones a la derecha */}
        <div className="flex flex-col space-y-4">
          {/* Botón para ver equivalencias */}
          <BotonEquivalencias
            mostrarEquivalencias={mostrarEquivalencias}
            onClick={handleClick}
          />
          {/* Botón para eliminar estudiante */}
          <BotonEliminar rut={rut} />
        </div>
      </div>

      <div className="w-full mt-8">
        {/* Historial académico debajo */}
        <h2 className="text-2xl font-bold mb-4 text-center">Historial Académico</h2>

        {/* Tarjeta estática con encabezados */}
        <div className="flex justify-between text-sm bg-gray-800 p-2 rounded-lg shadow-lg mb-2">
          <div className="w-1/5">
            <p className="text-white">Código</p>
          </div>
          {mostrarEquivalencias && (
            <div className="w-1/5">
              <p className="text-white">Código Destino</p>
            </div>
          )}
          <div className="w-1/5">
            <p className="text-white">Nombre</p>
          </div>
          <div className="w-1/5">
            <p className="text-white">Nota</p>
          </div>
          <div className="w-1/5">
            <p className="text-white">Año</p>
          </div>
          <div className="w-1/5">
            <p className="text-white">Semestre</p>
          </div>
        </div>

        {/* Contenedor con desplazamiento para las tarjetas */}
        <div className="flex justify-center overflow-y-auto max-h-96 flex-wrap transition-all duration-500 ease-in-out">
          {historial.length > 0 ? (
            historial.map((item, index) => {
              let codigoDestino = null;
              let estadoTarjeta = item.estado;
              let nombreAsignatura = item.nombre_IPC;

              if (mostrarEquivalencias) {
                const equivalencia = equivalencias.find(
                  (eq) => eq.codigo_IPC === item.codigo_IPC
                );
                codigoDestino = equivalencia ? equivalencia.codigo_destino : " ";
                if (codigoDestino && codigoDestino.trim() !== "") {
                  estadoTarjeta = -2;
                  nombreAsignatura = equivalencia.nombre;
                }
              }
              //console.log(item.codigo_IPC_bruto);

              return (
                <TarjetaHistorial
                  key={index}
                  codigoIPC={item.codigo_IPC}
                  codigoIPCBRUTO={item.codigo_IPC_bruto}
                  codigoDestino={codigoDestino}
                  nombre={nombreAsignatura}
                  nota={item.nota}
                  ano={item.ano}
                  semestre={item.semestre}
                  estado={estadoTarjeta}
                />
              );
            })
          ) : (
            <p>No hay historial académico disponible</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorialAcademico;
