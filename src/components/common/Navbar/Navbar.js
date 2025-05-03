import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DirectionIcon } from "../../../utils/svg";
import "./Navbar.css";

const NavbarPage = () => {
  const token = localStorage.getItem("token");
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="sticky-top">
      <div>
        <Navbar className="NavbarTwo">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <div className="d-flex align-items-center">
                <DirectionIcon width={35} height={35}/>
                <b className="NavbarTitulo text-light">Lugar Secreto</b>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="w-100 d-flex justify-content-end">
              <Nav className="me-auto">
                {!token && (
                  <div className="d-flex">
                    <div className="ml-2">
                      <Button as={Link} to="/login" variant="outline-light">
                        Entrar
                      </Button>
                    </div>
                    <div className="ml-2">
                      <Button as={Link} to="/register" variant="outline-light">
                        Registro
                      </Button>
                    </div>
                  </div>
                )}
                {token && (
                  <div className="d-flex align-items-center">
                    <Nav.Link as={Link} to="/profile" className="text-light">
                      <b>Perfil</b>
                    </Nav.Link>
                    <Nav.Link onClick={handleLogOut} className="text-danger">
                      <b>Salir</b>
                    </Nav.Link>
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
export default NavbarPage;
