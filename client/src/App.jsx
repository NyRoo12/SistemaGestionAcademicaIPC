import React, { useEffect, useState, Suspense, lazy } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Login from "./pages/login.jsx";

import IngresarAlumno from "./pages/IngresarAlumno.jsx";
import EstudianteDetalle from "./components/EstudianteDetalle.jsx";
import BotonesAlumnos from "./pages/botonesAlumnos.jsx";
import IngresarListado from "./pages/IngresarListado.jsx";
import BotonesCertificados from "./pages/botonesCertificados.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está logueado

  const handleLogin = () => {
    setIsLoggedIn(true); // Cambiar el estado a "logueado" cuando el usuario se autentique
  };

  useEffect(() => {
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
          <div className="App flex flex-col min-h-screen">
            <main>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<SearchBar />} />{" "}
                  {/* Página principal de control de botones */}
                  <Route path="/botones-a" element={<BotonesAlumnos />} />
                  <Route path="/botones-c" element={<BotonesCertificados />} />
                  <Route
                    path="/ingresar-alumno"
                    element={<IngresarAlumno />}
                  />{" "}
                  {/* Carga masiva */}
                  <Route
                    path="/ingresar-listado"
                    element={<IngresarListado />}
                  />{" "}
                  {/* Ingreso manual */}
                  <Route
                    path="/estudiante/:rut"
                    element={<EstudianteDetalle />}
                  />
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
