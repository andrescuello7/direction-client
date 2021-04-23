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
  const { MapDataBase } = UseHome();
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
      {token && (
        <div className="m-2 navigation">
          <div className="toggle" onClick={BoleanBotton}></div>
          <ul className="m-2 d-flex flex-column">
            <p className="mt-2 icon">
              <NavLink as={Link} to="/">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-house-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                  </svg>
                </span>
                <span className="text-dark"> Home</span>
              </NavLink>
            </p>
            <p className="mt-2 icon">
              <NavLink as={Link} to="/perfil">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </span>
                <span className="text-dark"> Profile</span>
              </NavLink>
            </p>
            <p className="mt-2 icon">
              <p onClick={handleShow}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-plus-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                  </svg>
                </span>
                <span className="text-dark"> Public</span>
              </p>
            </p>
            <p className="mt-2 icon">
              <NavLink as={Link} to="/login" onClick={handleLogOut}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-bookmark-x-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6.854 5.146a.5.5 0 1 0-.708.708L7.293 7 6.146 8.146a.5.5 0 1 0 .708.708L8 7.707l1.146 1.147a.5.5 0 1 0 .708-.708L8.707 7l1.147-1.146a.5.5 0 0 0-.708-.708L8 6.293 6.854 5.146z"
                    />
                  </svg>
                </span>
                <span className="text-dark"> Sing Out</span>
              </NavLink>
            </p>
          </ul>
        </div>
      )}
      <div>
        <div className="w-100 d-flex flex-column-reverse">{MapDataBase}</div>
      </div>
      <div className="w-100 d-flex justify-content-center">
        <Modal className="marginPublicacion" show={show} onHide={handleClose}>
          <Publicacion />
        </Modal>
      </div>
    </div>
  );
};
export default LandPage;
