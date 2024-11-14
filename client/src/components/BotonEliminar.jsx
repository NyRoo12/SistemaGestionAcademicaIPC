import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BotonEliminar = ({ rut }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Hook para navegar entre pantallas

  const handleEliminar = async () => {
    console.log("Eliminar estudiante con RUT:", rut);

    try {
      // Primero eliminar el historial
      const historialResponse = await fetch(
        `http://localhost:3001/api/historialAcademico/eliminarHistorial/${rut}`,
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


      // Si la eliminación del historial es exitosa, proceder con la eliminación del estudiante
      const estudianteResponse = await fetch(
        `http://localhost:3001/api/estudiantes/eliminarEstudiante?query=${encodeURIComponent(rut)}`,
        {
          method: "DELETE",
        }
      );

      const estudianteData = await estudianteResponse.json();

      if (estudianteResponse.ok) {
        alert(estudianteData.message); // Mostrar el mensaje de éxito del estudiante
        navigate("/"); // Redirige a la pantalla principal u otra ruta
      } else {
        alert(estudianteData.error); // Mostrar el mensaje de error
      }
    } catch (error) {
      console.error("Error al eliminar el historial o el estudiante:", error);
      alert("Hubo un error al eliminar el historial o el estudiante");
    } finally {
      setShowModal(false); // Cierra el modal después de intentar eliminar
    }
  };

  return (
    <div className="fixed bottom-4 left-4">
      <button
        onClick={() => setShowModal(true)} // Muestra el modal de confirmación
        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
      >
        Eliminar Estudiante
      </button>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirmar eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar el estudiante con RUT {rut}?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)} // Cierra el modal sin eliminar
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2 hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar} // Llama a la función de eliminación
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
