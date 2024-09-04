import React from "react";
import NavBar from "./components/navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";

export default function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <SearchBar />
      </main>
    </>
  );
}
