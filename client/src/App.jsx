import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";

const IngresarAlumno = lazy(() => import("./components/IngresarAlumno.jsx"));
const EstudianteDetalle = lazy(() => import("./components/EstudianteDetalle.jsx"));

export default function App() {
  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<SearchBar />} />
            <Route path="/ingresar-alumno" element={<IngresarAlumno />} />
            <Route path="/estudiante/:rut" element={<EstudianteDetalle />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}
