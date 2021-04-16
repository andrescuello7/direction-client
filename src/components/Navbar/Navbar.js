import {
  Navbar,
  NavDropdown,
  Dropdown,
  Button,
  Form,
  Nav,
  FormControl,
} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import UseHome from "../../UseForm/UseHome";

const NavbarPage = () => {
  const token = localStorage.getItem("token");
  const { usuario } = UseHome();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div>
      <Navbar className="NavbarTwo" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <b className="NavbarTitulo">Blog-Secreto</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {!token && (
            <div className="d-flex">
              <div className="ml-2">
                <Button as={Link} to="/login" variant="outline-light">
                  Login
                </Button>
              </div>
              <div className="ml-2">
                <Button as={Link} to="/register" variant="outline-light">
                  Registarse
                </Button>
              </div>
            </div>
          )}
          <div>
            {token && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <i>
                      <b>{usuario.usuario} </b>
                    </i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="NavbarButtonUser">
                    <Dropdown.Item as={Link} to="/perfil">
                      Perfil
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogOut}>
                      Cerrar sesion
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default NavbarPage;
