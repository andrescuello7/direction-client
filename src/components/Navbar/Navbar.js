import {
  Navbar,
  NavDropdown,
  Button,
  Form,
  Nav,
  FormControl,
} from "react-bootstrap";

const NavbarPage = () => {
  return (
    <div>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home">
          <b>Network</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div>
            <Button variant="outline-dark">Usuario</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default NavbarPage;
