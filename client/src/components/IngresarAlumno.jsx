import React, { useState } from "react";

function IngresarAlumno() {
  // Estado para manejar los valores de los inputs
  const [data, setData] = useState([
    { song: "", artist: "", year: "" }, // Ejemplo de datos iniciales
  ]);

  // Función para manejar el cambio de valor en los inputs
  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  // Función para añadir una nueva fila
  const addRow = () => {
    setData([...data, { song: "", artist: "", year: "" }]);
  };

  return (
    <>
      <div className="p-4 bg-[#e2bf40]">
        <h1 className="text-2xl font-bold">Ingresar Nuevo Alumno</h1>
      </div>

      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Song</th>
            <th className="border px-4 py-2">Artist</th>
            <th className="border px-4 py-2">Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.song}
                  onChange={(e) =>
                    handleInputChange(index, "song", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.artist}
                  onChange={(e) =>
                    handleInputChange(index, "artist", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.year}
                  onChange={(e) =>
                    handleInputChange(index, "year", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para añadir una nueva fila */}
      <button
        onClick={addRow}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Añadir Nueva Fila
      </button>
    </>
  );
}

export default IngresarAlumno;
