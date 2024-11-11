import React from "react";
import TarjetaHistorial from "../components/TarjetaHistorial.jsx";
import BotonEliminar from "../components/BotonEliminar.jsx";

const HistorialAcademico = ({
  historial,
  equivalencias,
  mostrarEquivalencias,
}) => {
  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Historial Académico
      </h2>

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

            return (
              <TarjetaHistorial
                key={index}
                codigoIPC={item.codigo_IPC}
                nombre={nombreAsignatura}
                nota={item.nota}
                ano={item.ano}
                semestre={item.semestre}
                estado={estadoTarjeta}
                codigoDestino={codigoDestino}
              />
            );
          })
        ) : (
          <p>No hay historial académico disponible</p>
        )}
      </div>
    </div>
  );
};

export default HistorialAcademico;