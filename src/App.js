//Herramientas de uso
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
//Rutas de Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Perfil from "./pages/Perfil/Perfil";
import PerfilBuscado from "./pages/PerfilBuscado/PerfilBuscado";

import Prueba from "./pages/Prueba/Prueba";

//Componentes
import Navbar from "./components/Navbar/Navbar";
axios.defaults.baseURL = "http://localhost:5000/api/";

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
      {/* <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/perfil">
            <Perfil />
          </Route>
          <Route path="/buscar">
            <PerfilBuscado />
          </Route>
          <Route path="/prueba">
            <Prueba />
          </Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
