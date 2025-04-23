import {
  Navbar,
  Container,
  Button,
  Nav,
} from "react-bootstrap";
import "./Navbar.css";

const NavbarPage = ({ setScreen }) => {
  const token = localStorage.getItem("token");
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setScreen('Login')
  };

  return (
    <div className="sticky-top">
      <div>
        <Navbar className="NavbarTwo">
          <Container>
            <Navbar.Brand onClick={() => setScreen('Home')}>
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="text-light bi bi-signpost-split" viewBox="0 0 16 16">
                  <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7zm1 3V8H2l-.75 1L2 10zm0-5h6l.75-1L14 3H8z"/>
                </svg>
                <b className="NavbarTitulo text-light">Direction</b>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="me-auto">
                {!token && (
                  <div className="d-flex">
                    <div className="ml-2">
                      <Button onClick={() => setScreen('Login')} variant="outline-light">
                        Sing In
                      </Button>
                    </div>
                    <div className="ml-2">
                      <Button onClick={() => setScreen('Register')} variant="outline-light">
                        Sing Out
                      </Button>
                    </div>
                  </div>
                )}
                {token && (
                  <div className="d-flex">
                    <Nav.Link onClick={() => setScreen('Perfil')} className="text-light">Perfil</Nav.Link>
                    <Nav.Link onClick={handleLogOut} className="text-light">Cerrar Sesion</Nav.Link>
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
/*

                <img
                  className="NavbarFoto"
                  src={usuario.imagen || exampleImage}
                  alt=""
                />
*/
