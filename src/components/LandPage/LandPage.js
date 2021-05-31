import { Modal, Button, NavDropdown } from "react-bootstrap";
import UseHome from "../../UseForm/UseHome";
import Publicacion from "../Publicacion/Publicacion";
import { NavLink, Link } from "react-router-dom";
import Precentacion from "../Precentacion/Precentacion";
import { useState } from "react";

const LandPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //Declaracion de datos traidos de Hook Home y Token de LocalStorage
  const { MapDataBase, usuario } = UseHome();
  const token = localStorage.getItem("token");

  const BoleanBotton = () => {
    const navigation = document.querySelector(".navigation");
    document.querySelector(".toggle").onclick = function () {
      this.classList.toggle("active");
      navigation.classList.toggle("active");
    };
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="body">
      <div>
        {token &&<div className="w-100 d-flex justify-content-center">
          <Publicacion />
        </div>}
        <div className="w-100 d-flex flex-column-reverse">{MapDataBase}</div>
      </div>
    </div>
  );
};
export default LandPage;
