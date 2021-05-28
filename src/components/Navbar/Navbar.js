import {
  Navbar,
  Dropdown,
  Button,
  Nav,
} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import UseHome from "../../UseForm/UseHome";
import UsePerfil from "../../UseForm/UsePerfil";

const NavbarPage = () => {
  const token = localStorage.getItem("token");
  const { usuario } = UseHome();
  const { exampleImage } = UsePerfil();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  
  return (
    <div className="sticky-top">
      <Navbar className="NavbarTwo">
        <Navbar.Brand as={Link} to="/">
          <b className="NavbarTitulo">Blog-Secreto</b>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="mr-auto"></Nav>
          {!token && (
            <div className="d-flex">
              <div className="ml-2">
                <Button as={Link} to="/login" variant="outline-dark">
                  Login
                </Button>
              </div>
              <div className="ml-2">
                <Button as={Link} to="/register" variant="outline-dark">
                  Registarse
                </Button>
              </div>
            </div>
          )}
          <div>
            {token && (
              <div className="NavbarButton">
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <img
                      className="NavbarFoto"
                      src={usuario.imagen || exampleImage}
                      alt=""
                    />
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
