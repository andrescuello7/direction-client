import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas, Image } from "react-bootstrap";
import {
  DirectionIcon,
  LogoutIcon,
  ProfileIcon,
  SingInIcon,
  DeleteIconX,
  SearchIcon,
} from "../../../utils/svg";
import { exampleImage } from "../../../utils/values";
import { usePostContext } from "../../../context/PostContext";
import { useState, useRef, useEffect } from "react";

import "./Navbar.css";

const NavbarPage = () => {
  // Context Post
  const token = localStorage.getItem("token");
  const { currentUser } = usePostContext();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="sticky-top">
      <Navbar className="NavbarTwo">
        <Navbar.Brand as={Link} to="/">
          <div className="d-flex align-items-center">
            <DirectionIcon width={30} height={30} />
            <b className="NavbarTitulo text-light">Lugar Secreto</b>
          </div>
        </Navbar.Brand>
        <Navbar.Collapse className="w-100">
          <div className="w-100 d-flex justify-content-end">
            {!token && (
              <div className="d-flex">
                <div className="ml-2">
                  <Nav.Link as={Link} to="/login" className="text-light">
                    <SingInIcon />
                    <b className="mx-2">Entrar</b>
                  </Nav.Link>
                </div>
              </div>
            )}
            {token && (
              <>
                <div className="searchIcon ht-100 d-flex align-items-center">
                  <div className="form-control inputSearch">
                    <SearchIcon height={20} width={20} />
                    <div className="mx-3 w-50">Buscar...</div>
                  </div>
                </div>
                <OffCanvasOptions
                  currentUser={currentUser}
                  handleLogOut={handleLogOut}
                />
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

function OffCanvasOptions({ currentUser, handleLogOut }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <>
      <div onClick={handleShow}  ref={optionsRef}>
        <Image
          width={35}
          height={35}
          className="rounded rounded-5"
          src={currentUser?.Photo || exampleImage}
          alt=""
        />
      </div>
      <Offcanvas show={show} placement="end">
        <Offcanvas.Header className="m-0 offcanvasHeader">
          <div className="w-100">
            <div className="d-flex w-100">
              <Image
                width={45}
                height={45}
                className="rounded rounded-5"
                src={currentUser?.Photo || exampleImage}
                alt=""
              />
              <div className="mx-2 d-flex flex-column w-100">
                <div className="w-100 d-flex justify-content-between">
                  <b className="text-large p-0">{currentUser?.UserName}</b>
                  <div onClick={handleClose}>
                    <DeleteIconX />
                  </div>
                </div>
                <div className="text-secondary p-0">
                  {currentUser?.Instagram}
                </div>
              </div>
            </div>
            {/* <hr className="w-100 bg-light" /> */}
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvasBody m-0 pt-2 pt-0">
          <div className="d-flex flex-column align-items-start justify-content-between">
            <Nav.Link
              as={Link}
              to="/profile"
              onClick={handleClose}
              className="p-2 d-flex align-items-center text-light"
            >
              <ProfileIcon height={20} width={20} />{" "}
              <b className="mx-2">Perfil</b>
            </Nav.Link>
            <Nav.Link
              onClick={handleLogOut}
              className="p-2 pl-2 d-flex align-items-center text-danger"
            >
              <LogoutIcon height={20} width={20} />{" "}
              <b className="mx-2">Cerrar Sesion</b>
            </Nav.Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarPage;
