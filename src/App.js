//Herramientas de uso
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { useState } from "react";
import "./App.css";

//Rutas de Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Perfil from "./pages/Perfil/Perfil";
import PerfilBuscado from "./pages/PerfilBuscado/PerfilBuscado";

//Componentes
import Navbar from "./components/Navbar/Navbar";
axios.defaults.baseURL = "https://direction-server-production.up.railway.app/api/";

function App() {
  const [screen, setScreen] = useState("Home");
  return (
    <div className="App">
      <Navbar setScreen={setScreen} />
      {screen === "Home" && <Home setScreen={setScreen} />}
      {screen === "Login" && <Login setScreen={setScreen} />}
      {screen === "Register" && <Register setScreen={setScreen} />}
      {screen === "Perfil" && <Perfil setScreen={setScreen} />}
      {screen === "PerfilBuscado" && <PerfilBuscado setScreen={setScreen} />}
    </div>
  );
}

export default App;
