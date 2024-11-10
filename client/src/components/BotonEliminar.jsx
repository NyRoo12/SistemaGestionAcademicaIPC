import React from "react";

const BotonEliminar = ({ rut }) => {
  const handleEliminar = async () => {
    console.log("Eliminar estudiante con RUT:", rut);

    try {
      // Realizar la solicitud DELETE al backend
      const response = await fetch(
        `http://localhost:3001/api/estudiantes/eliminarEstudiante?query=${encodeURIComponent(
          rut
        )}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Muestra el mensaje de éxito
      } else {
        alert(data.error); // Muestra el mensaje de error
      }
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
      alert("Error al eliminar el estudiante");
    }
  };

  return (
    <div className="fixed bottom-4 left-4">
      <button
        onClick={handleEliminar} // Al hacer clic en el botón, se llama a la función handleEliminar
        className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
      >
        Eliminar Estudiante
      </button>
    </div>
  );
};

export default BotonEliminar;
