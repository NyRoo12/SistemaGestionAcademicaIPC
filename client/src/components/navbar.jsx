import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

function NavBar() {
  const [selected, setSelected] = useState('buscar'); // Estado inicial para el enlace seleccionado

  // Función para manejar el cambio del enlace seleccionado
  const handleSelect = (page) => {
    setSelected(page);
  };

  // Lógica para cambiar la posición del cuadro blanco
  const getPosition = () => {
    switch (selected) {
      case 'buscar':
        return 'translate-x-0'; // Posición inicial
      case 'ingresar':
        return 'translate-x-[95%]'; // Mover 1 espacio a la derecha
      case 'certificado':
        return 'translate-x-[205%]'; // Mover 2 espacios a la derecha
      default:
        return 'translate-x-0';
    }
  };

  // Lógica para cambiar el ancho del cuadro blanco
  const getWidth = () => {
    switch (selected) {
      case 'buscar':
        return 'w-32'; // Ancho del cuadro para "Buscar Alumnos"
      case 'ingresar':
        return 'w-40'; // Ancho del cuadro para "Ingresar Alumnos"
      case 'certificado':
        return 'w-40'; // Ancho del cuadro para "Generar Certificado"
      default:
        return 'w-32';
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 p-4 flex items-center z-50"> 
      <img src={logo} alt="Logo" className="w-15 h-12 rounded-lg mr-0" />
      <div className="flex flex-1 justify-start ml-8 relative">
        {/* Cuadro blanco animado con tamaño dinámico */}
        <div
          className={`absolute top-0 left-0 h-full bg-gray-100 rounded-lg transition-all duration-500 ease-in-out ${getPosition()} ${getWidth()}`}
        ></div>
        <div className="space-x-8 flex relative z-10">
          {/* Enlaces */}
          <Link
            to="/"
            onClick={() => handleSelect("buscar")}
            className={`${
              selected === "buscar"
                ? "text-black"
                : "text-gray-300 hover:text-white"
            } p-2 rounded-lg transition-all duration-300`}
          >
            Buscar Alumnos
          </Link>
          <Link
            to="/botones-a"
            onClick={() => handleSelect("ingresar")}
            className={`${
              selected === "ingresar"
                ? "text-black"
                : "text-gray-300 hover:text-white"
            } p-2 rounded-lg transition-all duration-300`}
          >
            Ingresar Alumnos
          </Link>
          <Link
            to="/botones-c"
            onClick={() => handleSelect("certificado")}
            className={`${
              selected === "certificado"
                ? "text-black"
                : "text-gray-300 hover:text-white"
            } p-2 rounded-lg transition-all duration-300`}
          >
            Generar Certificado
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;