import React from 'react';
import { House, Book, Gear } from 'react-bootstrap-icons';
import './Sidebar.css'; // Estilos personalizados

export default function Sidebar() {
  return (
    <div className="flex-shrink-0 p-3 sidebar">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">MyProject</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="/home" className="nav-link active text-white">
            <House className="me-2" />
            Inicio
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <Book className="me-2" />
            Proyectos
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white">
            <Gear className="me-2" />
            Configuraciones
          </a>
        </li>
      </ul>
    </div>
  );
}
