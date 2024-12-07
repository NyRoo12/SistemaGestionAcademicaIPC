import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"; // Para el ícono de basura

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedLog, setExpandedLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/logs");
        if (!response.ok) {
          throw new Error("Error al obtener los logs");
        }
        const data = await response.json();
        const groupedLogs = groupLogs(data.datos);
        setLogs(groupedLogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const groupLogs = (data) => {
    const grouped = {
      agregarHistorial: {},
      eliminarHistorial: {},
      otros: [],
    };
    const timeThreshold = 60000; // Intervalo máximo para agrupar (1 minuto)

    data.forEach((log) => {
      const { accion, Rut, descripcion, fecha } = log;
      const logTime = new Date(fecha).getTime();
      let key;

      if (accion === "AGREGAR_HISTORIAL") {
        key = "agregarHistorial";
        if (!grouped.agregarHistorial[Rut]) {
          grouped.agregarHistorial[Rut] = {
            Rut,
            logs: [],
          };
        }
        grouped.agregarHistorial[Rut].logs.push({ descripcion, fecha });
      } else if (accion === "ELIMINAR_HISTORIAL") {
        key = "eliminarHistorial";
        if (!grouped.eliminarHistorial[Rut]) {
          grouped.eliminarHistorial[Rut] = {
            Rut,
            logs: [],
          };
        }
        grouped.eliminarHistorial[Rut].logs.push({ descripcion, fecha });
      } else {
        key = "otros";
        if (!grouped.otros[key]) {
          grouped.otros[key] = [];
        }
        const existingGroup = grouped.otros[key].find(
          (group) => Math.abs(group.timestamp - logTime) <= timeThreshold
        );

        if (existingGroup) {
          existingGroup.logs.push({ Rut, descripcion, fecha });
        } else {
          grouped.otros[key].push({
            accion,
            timestamp: logTime,
            logs: [{ Rut, descripcion, fecha }],
          });
        }
      }
    });

    const formattedLogs = [
      ...Object.values(grouped.agregarHistorial).map((log, index) => ({
        type: "agregarHistorial",
        id: index,
        log,
      })),
      ...Object.values(grouped.eliminarHistorial).map((log, index) => ({
        type: "eliminarHistorial",
        id: index,
        log,
      })),
      ...Object.values(grouped.otros).flat(),
    ];
    return formattedLogs;
  };

  const toggleDescription = (id) => {
    setExpandedLog((prev) => (prev === id ? null : id));
  };

  const clearLogs = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/logs/vaciar", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al borrar los logs");
      }
      setLogs([]);
      setIsModalOpen(false); // Cerrar el modal después de vaciar los logs
    } catch (error) {
      setError("Error al borrar los logs: " + error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Logs del Sistema</h1>
      {loading && <p className="text-gray-500">Cargando logs...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-4 overflow-y-auto h-96">
          {logs.length > 0 ? (
            <ul className="space-y-4">
              {logs.map((group, index) => (
                <li
                  key={index}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50"
                >
                  {group.type === "agregarHistorial" ? (
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleDescription(index)}
                    >
                      <span className="font-bold text-gray-800">
                        {`AGREGAR_HISTORIAL - RUT: ${group.log.Rut}`}
                      </span>
                    </div>
                  ) : group.type === "eliminarHistorial" ? (
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleDescription(index)}
                    >
                      <span className="font-bold text-gray-800">
                        {`ELIMINAR_HISTORIAL - RUT: ${group.log.Rut}`}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleDescription(index)}
                    >
                      <span className="font-bold text-gray-800">
                        {group.accion}
                      </span>
                      <span className="text-gray-600">
                        {group.logs.length} registro(s)
                      </span>
                    </div>
                  )}
                  {expandedLog === index && (group.type === "agregarHistorial" || group.type === "eliminarHistorial") && (
                    <div className="mt-2 text-sm text-gray-700">
                      <ul className="space-y-2">
                        {group.log.logs.map((logEntry, logIndex) => (
                          <li key={logIndex}>
                            <p>{logEntry.descripcion}</p>
                            <p className="text-gray-500 text-xs">
                              Fecha: {new Date(logEntry.fecha).toLocaleString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {expandedLog === index && group.type === "otros" && (
                    <div className="mt-2 text-sm text-gray-700">
                      <ul className="space-y-2">
                        {group.logs.map((log, logIndex) => (
                          <li key={logIndex}>
                            <p className="font-bold text-gray-600">
                              RUT: {log.Rut}
                            </p>
                            <p>{log.descripcion}</p>
                            <p className="text-gray-500 text-xs">
                              Fecha: {new Date(log.fecha).toLocaleString()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay logs para mostrar.</p>
          )}
        </div>
      )}

      {/* Botón para vaciar los logs */}
      <button
        onClick={() => setIsModalOpen(true)} // Mostrar el modal de confirmación
        className="fixed bottom-6 right-6 flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
      >
        <FaTrash className="mr-2" />
        Vaciar logs
      </button>

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Confirmar acción</h2>
            <p className="mb-4">¿Estás seguro de que quieres vaciar todos los logs? Esta acción es irreversible.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)} // Cerrar el modal sin hacer nada
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={clearLogs} // Llamar a la función para vaciar los logs
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logs;
