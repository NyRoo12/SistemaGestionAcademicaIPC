import React, { useEffect, useState, Suspense, lazy } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Login from "./pages/login.jsx";

const IngresarAlumno = lazy(() => import("./pages/IngresarAlumno.jsx"));
const EstudianteDetalle = lazy(() => import("./components/EstudianteDetalle.jsx"));
const BotonesAlumnos = lazy(() => import("./pages/botonesAlumnos.jsx"));
const IngresarListado = lazy(() => import("./pages/IngresarListado.jsx"));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está logueado

  const handleLogin = () => {
    setIsLoggedIn(true); // Cambiar el estado a "logueado" cuando el usuario se autentique
  };

  useEffect(() => {
    // Desactiva el scroll en el <body>
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Restablece el scroll al desmontar
    };
  }, []);

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <header>
            <NavBar />
          </header>
          <div className="App h-screen overflow-hidden">
            <main>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<SearchBar />} />
                  <Route path="/botones-a" element={<BotonesAlumnos />} />
                  <Route path="/ingresar-alumno" element={<IngresarAlumno />} />
                  <Route path="/ingresar-listado" element={<IngresarListado />} />
                  <Route path="/estudiante/:rut" element={<EstudianteDetalle />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
}
