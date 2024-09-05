import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Asegúrate de que el ID de 'root' coincida con el contenedor en tu archivo HTML
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
