//Herramientas de uso
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Rutas de Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Perfil from "./pages/Perfil/Perfil";
import { PostProvider } from "./context/PostContext";

//Componentes
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_URL_PRODUCTION}/api/`;
function App() {
  return (
    <PostProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
              <Footer />
            </Route>
            <Route path="/register">
              <Register />
              <Footer />
            </Route>
            <Route path="/profile">
              <Perfil />
            </Route>
          </Switch>
        </Router>
      </div>
    </PostProvider>
  );
}

export default App;
