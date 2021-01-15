import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./pages/Header.jsx";
import Carrucel from "./components/Carrucel";
import Footer from "./components/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Api_Pelis from "./components/Api_Pelis";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Carrucel />
            <Api_Pelis />
          </Route>
          <Route path="/pelicula">
            <Header />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/subidas">
            <Header />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
