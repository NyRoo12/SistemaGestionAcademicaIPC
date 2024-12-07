import React from "react";

const TarjetaHistorial = ({
  codigoIPC,
  codigoIPCBRUTO,
  codigoDestino = null,
  nombre,
  nota,
  ano,
  semestre,
  estado,
}) => {
  let tarjetaClase;
  switch (estado) {
    case 1:
      tarjetaClase = "bg-green-600";
      break;
    case -1:
      tarjetaClase = "bg-gray-700";
      break;
    case -2:
      tarjetaClase = "bg-yellow-500";
      break;
    default:
      tarjetaClase = "bg-red-600";
  }

  return (
    <div
      className={`p-2 m-2 rounded-lg text-white ${tarjetaClase} shadow-lg `} 
      style={{ width: "3000px" }}
    >
      <div className="flex justify-between text-sm">
        <div className="w-1/5 p-1">
          <p>{codigoIPCBRUTO}</p>
        </div>
        {codigoDestino && (
          <div className="w-1/5 p-1">
            <p>{codigoDestino}</p>
          </div>
        )}
        <div className="w-1/5 p-1">
          <p>{nombre}</p>
        </div>
        <div className="w-1/5 p-1">
          <p>{nota}</p>
        </div>
        <div className="w-1/5 p-1">
          <p>{ano}</p>
        </div>
        <div className="w-1/5 p-1">
          <p>{semestre}</p>
        </div>
      </div>
    </div>
  );
};

export default TarjetaHistorial;
