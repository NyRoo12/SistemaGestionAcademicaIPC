// components/TarjetaHistorial.jsx
import React from "react";

const TarjetaHistorial = ({
  codigoIPC,
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
    default:
      tarjetaClase = "bg-red-600";
  }

  return (
    <div
      className={`p-4 m-2 rounded-lg text-white ${tarjetaClase}`}
      style={{ width: "1000px" }}
    >
      <div className="flex justify-between">
        <div className="w-1/5 p-1">
          <p>{codigoIPC}</p>
        </div>
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
