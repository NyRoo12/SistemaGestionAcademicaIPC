import React, { useState, useEffect } from "react";
import ipc from "./images/ipc.png";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]); // Agrega esta línea para definir `data`

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", query);
    fetchData(query);
  };

  const fetchData = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/estudiantes/buscar?query=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const result = await response.json();
      console.log("Datos recibidos:", result); // Agrega esto para inspeccionar los datos
      setData(result); // Guarda los datos en el estado
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-8">
      {/* Alineación hacia la parte superior con justify-start y padding reducido */}
      <h1 className="text-3xl font-bold mb-4">
        <img src={ipc} className="w-40 h-auto" />
      </h1>
      <form onSubmit={handleSearch} className="w-full max-w-md mb-4">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar por nombre o rut"
          />
          <button
            type="submit"
            className="absolute right-0 mr-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m-2.65 1.35A7 7 0 1110 3a7 7 0 014.35 12.35L21 21z"
              />
            </svg>
          </button>
        </div>
      </form>
      <ul>
        {data.map((item) => (
          <li key={item.rut}>
            {item.nombre} - {item.rut}
          </li> // Ajusta esto según la estructura de tus datos
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
