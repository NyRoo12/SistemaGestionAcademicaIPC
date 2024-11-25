import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ipc from "./images/ipc.png";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false); // Nueva bandera

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/estudiantes`);
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchPerformed(true); // Marca que se realizó una búsqueda
    try {
      const response = await fetch(
        `http://localhost:3001/api/estudiantes/buscar?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const result = await response.json();
      filterData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = (fetchedData) => {
    const isNumber = !isNaN(query.charAt(0));
    const result = fetchedData.filter((item) => {
      if (isNumber) {
        return item.rut.replace(/[^0-9]/g, '').charAt(0) === query.charAt(0);
      } else {
        return item.nombre.toLowerCase().charAt(0) === query.toLowerCase().charAt(0);
      }
    });
    setFilteredData(result);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 py-8 overflow-hidden">
      <h1 className="text-3xl font-bold mb-4 mt-16">
        <img src={ipc} className="w-40 h-auto" alt="Logo IPC" />
      </h1>
      <form onSubmit={handleSearch} className="w-full max-w-md mb-4 mt-4">
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

      <div className="w-full max-w-md flex-grow overflow-y-auto min-h-auto max-h-[70vh] "> {/* Ajuste aquí */}
        {searchPerformed && filteredData.length === 0 ? (
          <div className="text-center my-4">
            <span className="text-lg text-gray-600">Sin Resultados</span>
          </div>
        ) : (
          filteredData.map((estudiante) => (
            <Link
              key={estudiante.rut}
              to={`/estudiante/${estudiante.rut}`}
              className="block p-4 mb-4 bg-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-300 transition duration-300"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg">{estudiante.nombre}</span>
                  <span className="text-sm text-gray-600">{estudiante.rut}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{estudiante.carreraDestino}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;
