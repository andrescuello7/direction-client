import React from 'react';
import { House, Book, Gear } from 'react-bootstrap-icons';
import './Sidebar.css'; // Estilos personalizados

export default function Sidebar() {
  return (
    <div className="flex-shrink-0 p-3 sidebar">
      <div className='mt-5'></div>
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
