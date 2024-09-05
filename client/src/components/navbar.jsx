import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

function NavBar() {
  const [selected, setSelected] = useState(''); // Estado para el enlace seleccionado

  // Función para manejar el cambio del enlace seleccionado
  const handleSelect = (page) => {
    setSelected(page);
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center">
      <img src={logo} alt="Logo" className="w-15 h-12 rounded-lg mr-0" /> {/* Margen derecho agregado */}
      <div className="flex flex-1 justify-start ml-8"> {/* Margen izquierdo agregado */}
        <div className="space-x-8"> {/* Espaciado reducido entre enlaces */}
          {/* Enlace 1 */}
          <Link
            to="/"
            onClick={() => handleSelect('buscar')}
            className={`${
              selected === 'buscar'
                ? 'bg-gray-100 text-black pb-10'
                : 'text-gray-300 hover:text-white'
            } p-2 rounded-lg transition-all duration-300`}
          >
            Buscar Alumnos
          </Link>

          {/* Enlace 2 */}
          <Link
            to="/ingresar-alumno" // Cambia a la ruta de la página de ingresar alumnos
            onClick={() => handleSelect('ingresar')}
            className={`${
              selected === 'ingresar'
                ? 'bg-gray-100 text-black pb-10'
                : 'text-gray-300 hover:text-white'
            } p-2 rounded-lg transition-all duration-300`}
          >
            Ingresar alumnos
          </Link>

          {/* Enlace 3 */}
          <Link
            to="/certificado"
            onClick={() => handleSelect('certificado')}
            className={`${
              selected === 'certificado'
                ? 'bg-gray-100 text-black pb-10'
                : 'text-gray-300 hover:text-white'
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
