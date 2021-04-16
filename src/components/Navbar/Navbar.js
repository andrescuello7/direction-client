import {
  Navbar,
  NavDropdown,
  Button,
  Form,
  Nav,
  FormControl,
} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
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
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <b>Network</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
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
          {token && (
            <div>
              <NavDropdown
                title={usuario.usuario}
                id="basic-nav-dropdown"
                className="btn btn-dark"
              >
                <NavDropdown.Item as={Link} to="/perfil">Perfil</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogOut}>
                  Cerrar Sesion
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default NavbarPage;
