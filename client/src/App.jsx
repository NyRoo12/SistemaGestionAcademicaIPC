import React, { Suspense, lazy,useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Login from "./components/login.jsx";

const IngresarAlumno = lazy(() => import("./components/IngresarAlumno.jsx"));
const EstudianteDetalle = lazy(() => import("./components/EstudianteDetalle.jsx"));

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
              <Route path="/" element={<SearchBar />} />
              <Route path="/ingresar-alumno" element={<IngresarAlumno />} />
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
