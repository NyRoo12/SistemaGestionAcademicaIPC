import React from 'react';
import logo from './images/logo.png';

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <img src={logo} alt="Descripción de la imagen" className="w-20 h-auto rounded-lg" />
      <div className="flex-1 flex justify-center">
        <div className="space-x-20">
          <a href="#" className="text-gray-300 hover:text-white">
            Buscar Alumnos
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Ingresar alumnos
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Generar Certificado
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
