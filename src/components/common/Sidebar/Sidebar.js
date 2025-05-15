import React from "react";
import { House, Book, Gear, Person } from "react-bootstrap-icons";
import { LogoutIcon } from "../../../utils/svg";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function Sidebar() {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <div className="mt-5 navItemSelect">
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Nav.Link as={Link} to="/home" className="nav-link active text-light">
              <House className="me-2" />
              Inicio
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={Link} to="/profile" className="text-light">
              <Person className="me-2" />
              Perfil
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={Link} to="/profile" className="text-light">
              <Book className="me-2" />
              Proyectos
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={Link} to="/profile" className="text-light">
              <Gear className="me-2" />
              Configuraciones
            </Nav.Link>
          </li>
        </ul>
      </div>
      <div className="navItemSelect">
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <div
              onClick={handleLogOut}
              className="text-danger d-flex mx-2 align-items-center"
            >
              <LogoutIcon className="me-2 text-danger" />
              <b className="text-danger">Cerrar Sesión</b>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
