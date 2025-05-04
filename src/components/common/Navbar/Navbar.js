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
                <DirectionIcon width={35} height={35} />
                <b className="NavbarTitulo text-light">Lugar Secreto</b>
              </div>
            </Navbar.Brand>
            <Navbar.Collapse className="w-100">
                {/* <div className="w-75 d-flex justify-content-center">
                  <input className="form-control inputSearch" />
                </div> */}
                <div className="w-100 d-flex justify-content-end">
                  {!token && (
                    <div className="d-flex">
                      <div className="ml-2">
                        <Nav.Link as={Link} to="/login" className="text-light">
                          <b>Entrar</b>
                        </Nav.Link>
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
                </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
export default NavbarPage;
