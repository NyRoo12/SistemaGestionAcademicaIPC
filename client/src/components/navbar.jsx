import React, { useState } from 'react';
import logo from './images/logo.png';

function NavBar() {
  const [selected, setSelected] = useState(''); // Estado para el enlace seleccionado

  // Función para manejar el cambio del enlace seleccionado
  const handleSelect = (page) => {
    setSelected(page);
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center">
      <img src={logo} alt="Logo" className="w-20 h-auto rounded-lg mr-8" /> {/* Margen derecho agregado */}
      <div className="flex flex-1 justify-start ml-8"> {/* Margen izquierdo agregado */}
        <div className="space-x-8"> {/* Espaciado reducido entre enlaces */}
          {/* Enlace 1 */}
          <a
            href="#"
            onClick={() => handleSelect('buscar')}
            className={`${
              selected === 'buscar'
                ? 'bg-gray-100 text-black pb-10'
                : 'text-gray-300 hover:text-white'
            } p-2 rounded-lg transition-all duration-300`}
          >
            Buscar Alumnos
          </a>

          {/* Enlace 2 */}
          <a
            href="#"
            onClick={() => handleSelect('ingresar')}
            className={`${
              selected === 'ingresar'
                ? 'bg-gray-100 text-black pb-10'
                : 'text-gray-300 hover:text-white'
            } p-2 rounded-lg transition-all duration-300`}
          >
            Ingresar alumnos
          </a>

          {/* Enlace 3 */}
          <a
            href="#"
            onClick={() => handleSelect('certificado')}
            className={`${
              selected === 'certificado'
                ? 'bg-gray-100 text-black pb-10'
                : 'text-gray-300 hover:text-white'
            } p-2 rounded-lg transition-all duration-300`}
          >
            Generar Certificado
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
