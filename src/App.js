//Herramientas de uso
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
//Rutas de Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Perfil from "./pages/Perfil/Perfil";
import PerfilBuscado from "./pages/PerfilBuscado/PerfilBuscado";

//Componentes
import Navbar from "./components/Navbar/Navbar";
axios.defaults.baseURL = "https://vlog-conteo-app.herokuapp.com/api/";

function App() {
  return (
    <div className="App">
      <Router>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
