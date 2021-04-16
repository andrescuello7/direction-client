import { useState, useEffect } from "react";
import axios from "axios";
import { Card, NavDropdown, Spinner } from "react-bootstrap";
import UseHome from "../../UseForm/UseHome";

const Perfil = () => {
  const [input, setInput] = useState({});
  const token = localStorage.getItem("token");
  const { MapComparatePublic } = UseHome();

  return <div>
    {MapComparatePublic}
  </div>;
};
export default Perfil;
