import { useState, useEffect } from "react";
import axios from "axios";
import { Card, NavDropdown, Spinner } from "react-bootstrap";
import UseHome from "../../UseForm/UseHome";
import Portada from "../../components/Portada/Portada";

const Perfil = () => {
  const [input, setInput] = useState({});
  const token = localStorage.getItem("token");
  const { MapComparatePublic } = UseHome();

  return (
    <div className="ColorDePerfil">
      <div>
        <Portada />
      </div>
      <div className="w-100 d-flex flex-column-reverse">{MapComparatePublic}</div>
    </div>
  );
};
export default Perfil;
