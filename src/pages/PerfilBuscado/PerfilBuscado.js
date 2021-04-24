import { useState, useEffect } from "react";
import axios from "axios";
import { Card, NavDropdown, Spinner } from "react-bootstrap";
import UseBusqueda from "../../UseForm/UseBusqueda";
import UseHome from "../../UseForm/UseHome";
import PortadaBuscada from "../../components/PortadaBuscada/PortadaBuscada";

const Perfil = () => {
  const [input, setInput] = useState({});
  const token = localStorage.getItem("token");
  const { MapDataBaseBuscado } = UseBusqueda();

  return (
    <div className="ColorDePerfil">
      <div>
        <PortadaBuscada />
      </div>
      <div>{MapDataBaseBuscado}</div>
    </div>
  );
};
export default Perfil;
