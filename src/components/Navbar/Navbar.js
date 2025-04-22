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
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-light bi bi-chat-square-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </div>
                <b className="NavbarTitulo text-light">
                  Direction
                </b>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {!token && (
                  <div className="d-flex">
                    <div className="ml-2">
                      <Button onClick={() => setScreen('Login')} variant="outline-primary">
                        Sing In
                      </Button>
                    </div>
                    <div className="ml-2">
                      <Button onClick={() => setScreen('Register')} variant="outline-primary">
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
