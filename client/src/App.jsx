import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import IngresarAlumno from "./components/IngresarAlumno.jsx";

export default function App() {
  return (
    <Router>
      {/* Agrega Router aquí para que todas las rutas estén dentro del contexto de Router */}
      <header>
        <NavBar />
      </header>
      <main>
        <Routes> {/* Asegúrate de usar <Routes> en lugar de <routes> */}
          <Route path="/" element={<SearchBar />} />
          <Route path="/ingresar-alumno" element={<IngresarAlumno />} />
        </Routes>
      </main>
    </Router>
  );
}
