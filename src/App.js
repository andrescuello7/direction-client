//Herramientas de uso
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

//Rutas de Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Perfil from "./pages/Perfil/Perfil";
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Login/Register";
import NotFound404 from "./pages/NotFound404/NotFound404";
import { PostProvider } from "./context/PostContext";

//Componentes
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import SidebBar from "./components/common/Sidebar/Sidebar";
axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_URL_PRODUCTION}/api/`;

function App() {
  return (
    <PostProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/home" exact>
              <Landing />
            </Route>
            <Route path="/" exact>
              <SidebBar />
              <Home />
            </Route>
            <Route path="/profile">
              <Perfil />
            </Route>
            <Route path="/login">
              <Login />
              <Footer />
            </Route>
            <Route path="/register">
              <Register />
              <Footer />
            </Route>
            <Route path="/404">
              <NotFound404 />
            </Route>
            <Route path="*">
              <Redirect to="/404" replace />
            </Route>
          </Switch>
        </Router>
      </div>
    </PostProvider>
  );
}

export default App;
