import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Api_Pelis from "../components/Api_Pelis";

export default function Header(props) {
  return (
    <div className="sticky-top">
      <Navbar variant="dark" expand="lg">
        <Navbar.Brand as={NavLink} to="/" exact>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            fill="currentColor"
            class="bi bi-film"
            viewBox="0 0 16 16"
          >
            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
          </svg>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="headerForm" as={NavLink} to="/home">
              <b>Inicio</b>
            </Nav.Link>
            <Nav.Link className="headerForm" as={NavLink} to="/pelicula">
              <b>Peliculas</b>
            </Nav.Link>
            <Nav.Link className="headerForm" as={NavLink} to="/register">
              <b>Registrarse</b>
            </Nav.Link>
            <Nav.Link className="headerForm" as={NavLink} to="/subidas">
              <b>Subidas</b>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
