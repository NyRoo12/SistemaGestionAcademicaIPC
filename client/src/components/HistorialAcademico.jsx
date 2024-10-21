import React from "react";
import TarjetaHistorial from "./TarjetaHistorial.jsx";

const HistorialAcademico = ({
  historial,
  equivalencias,
  mostrarEquivalencias,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Historial Académico
      </h2>
      <div className="flex justify-center flex-wrap transition-all duration-500 ease-in-out">
        <TarjetaHistorial
          key={-1}
          codigoIPC="Codigo"
          nombre="Nombre"
          nota="Nota"
          ano="Año"
          semestre="Semestre"
          estado={-1}
          codigoDestino={mostrarEquivalencias ? "Codigo Destino" : ""}
        />

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