import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

axios.defaults.baseURL = 'https://vlog-conteo-app.herokuapp.com/api/';

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
