import React, { useState } from "react";

const BotonEquivalencias = ({ rut }) => {
  const [equivalencias, setEquivalencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (equivalencias.length > 0) {
      setEquivalencias([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3001/api/equivalencias/obtenerEquivalencias?query=${encodeURIComponent(rut)}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener las equivalencias");
      }
      const result = await response.json();
      setEquivalencias(result);
    } catch (error) {
      setError("No se pudo obtener las equivalencias");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {equivalencias.length > 0 ? "Cerrar Equivalencias" : "Ver Equivalencias"}
      </button>
      {loading && <p>Cargando equivalencias...</p>}
      {error && <p>{error}</p>}
      {equivalencias.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Equivalencias</h3>
          <ul>
            {equivalencias.map((eq, index) => (             
              <li key={index} className="py-2 border-b">
                {eq.codigo_IPC} {" "} {eq.nombre_IPC} equivale a {eq.codigo_destino}{" "}
                {eq.nombre}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BotonEquivalencias;
