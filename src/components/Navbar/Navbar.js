import { Navbar, NavDropdown, Button, Form, Nav, FormControl } from "react-bootstrap";

const NavbarPage = () => {
  return (
    <div>
      <Navbar className="NavbarBackground" expand="lg">
        <div className="titulo"><b>Network</b></div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
    </div>
  );
};
export default NavbarPage;
