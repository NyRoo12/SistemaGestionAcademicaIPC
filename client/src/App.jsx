import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import IngresarAlumno from "./components/IngresarAlumno.jsx";
import EstudianteDetalle from "./components/EstudianteDetalle.jsx"; // Importa el nuevo componente

export default function App() {
  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/ingresar-alumno" element={<IngresarAlumno />} />
          <Route path="/estudiante/:rut" element={<EstudianteDetalle />} />{" "}
          {/* Nueva ruta */}
        </Routes>
      </main>
    </Router>
  );
}