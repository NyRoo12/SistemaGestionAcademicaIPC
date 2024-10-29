import React, { Suspense, lazy, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Login from "./components/login.jsx";

const IngresarAlumno = lazy(() => import("./components/IngresarAlumno.jsx"));
const EstudianteDetalle = lazy(() => import("./components/EstudianteDetalle.jsx"));
const BotonesAlumnos = lazy(() => import("./components/botonesAlumnos.jsx"));
const IngresarListado = lazy(() => import("./components/IngresarListado.jsx"));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está logueado

  const handleLogin = () => {
    setIsLoggedIn(true); // Cambiar el estado a "logueado" cuando el usuario se autentique
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <header>
            <NavBar />
          </header>
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<SearchBar />} /> {/* Página principal de control de botones */}
                <Route path="/botones-a" element={<BotonesAlumnos />} /> {/* Ruta de búsqueda */}
                <Route path="/ingresar-alumno" element={<IngresarAlumno />} /> {/* Carga masiva */}
                <Route path="/ingresar-listado" element={<IngresarListado />} /> {/* Ingreso manual */}
                <Route path="/estudiante/:rut" element={<EstudianteDetalle />} />
              </Routes>
            </Suspense>
          </main>
        </>
      ) : (
        <Login onLogin={handleLogin} /> // Mostrar la página de login si el usuario no está logueado
      )}
    </Router>
  );
}
