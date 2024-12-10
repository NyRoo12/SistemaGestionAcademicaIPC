import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BotonEliminar = ({ rut }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEliminar = async () => {
    console.log("Eliminar estudiante con RUT:", rut);

    try {
      // Eliminar historial académico
      const historialResponse = await fetch(
        `http://146.83.216.166:4006/api/historialAcademico/eliminarHistorial/${rut}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!historialResponse.ok) {
        throw new Error("Error al eliminar el historial académico");
      }

      // Eliminar carrera de destino
      const carreraResponse = await fetch(
        `http://146.83.216.166:4006/api/estudiantes/eliminarCarreraDestino/${rut}`,
        {
          method: "DELETE", // Usamos DELETE para eliminar el campo de carreraDestino
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!carreraResponse.ok) {
        throw new Error("Error al eliminar la carrera de destino");
      }

      // Redirigir a la pantalla principal después de eliminar
      navigate("/"); // Redirige al inicio o página de estudiantes
    } catch (error) {
      console.error("Error al eliminar", error);
      alert("Hubo un error al eliminar los datos: " + error.message);
    } finally {
      setShowModal(false); // Cerrar modal al finalizar
    }
  };

  return (
    <div className="flex justify-end mb-4"> {/* Alineación a la derecha */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 text-white h-12 w-48 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out flex items-center justify-center"
        style={{ minWidth: "12rem" }} // Fija el tamaño mínimo
      >
        Eliminar Historial
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar el historial académico y la carrera de destino de {rut}?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2 hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
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

export default BotonEliminar;
