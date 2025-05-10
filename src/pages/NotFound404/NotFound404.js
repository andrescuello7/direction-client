import React from "react";
import "./NotFound404.css";
import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="emoji">😕</div>
        <h1 className="title"><b>Error 404</b></h1>
        <h1 className="title">Página no encontrada</h1>
        <p className="description">
          La página que estás buscando no existe o fue movida.
        </p>
        <Link to="/" className="btn-return">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
