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
      <div className="navItemSelect">
        <ul className="nav nav-pills w-75 flex-column mb-auto">
          <li className="nav-item">
            <Nav.Link as={Link} to="/home" className="nav-link active">
              <House size={18} />
              Inicio
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={Link} to="/profile" className="nav-link">
              <Person size={18} />
              Perfil
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={Link} to="/projects" className="nav-link">
              <Book size={18} />
              Proyectos
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={Link} to="/settings" className="nav-link">
              <Gear size={18} />
              Configuraciones
            </Nav.Link>
          </li>
        </ul>
      </div>

      <div className="navItemSelect">
        <div onClick={handleLogOut} className="logout w-75 d-flex align-items-center">
          <LogoutIcon className="me-2" width={18} height={18} />
          <b>Cerrar Sesión</b>
        </div>
      </div>
    </div>
  );
}
