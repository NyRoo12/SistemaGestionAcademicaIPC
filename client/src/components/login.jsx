import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import ipc from "./images/ipc.png";

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para almacenar el mensaje de error
  const passwordInputRef = useRef(null); // Crear una referencia al input
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(''); // Limpiar el error cuando el usuario empieza a escribir
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://146.83.216.166:4006/api/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }), // Enviar la contraseña al servidor
      });

      const data = await response.json();

      if (response.ok) {
        // Si la autenticación fue exitosa
        onLogin(); // Cambiar el estado de login en App.js
        navigate("/"); // Redirigir al usuario a la ruta donde está el SearchBar
      } else {
        // Si hubo un error
        setError(data.error || 'Error de autenticación');
        setPassword(''); // Limpiar el campo después de un intento fallido
        passwordInputRef.current.focus(); // Volver a enfocar el campo de contraseña
      }
    } catch (err) {
      setError('Error en la conexión con el servidor');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    handleLogin(); // Llamar a la función de login cuando se envíe el formulario
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white py-8">
      <h1 className="text-3xl font-bold mb-4">
        <img src={ipc} className="w-40 h-auto" alt="Logo" />
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div>
          <label className="text-lg font-medium">Contraseña</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Ingrese su contraseña"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            ref={passwordInputRef} // Asignar la referencia al input
          />
          {error && ( // Mostrar el mensaje de error si existe
            <p className="text-red-500 mt-2">{error}</p>
          )}
        </div>
        <div className="mt-8 flex flex-col">
          <button
            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-emerald-600 text-white text-lg font-bold"
            type="submit"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;