import { Form, Button, Nav } from "react-bootstrap";
import "./Login.css";
import { NavLink } from "react-router-dom";
import useForm from "../../useForm/useForm";

export default function Login() {
  const userSesion = {
    name: "",
    password: "",
  };
  const { handleOnChange, handleSubmit, nameUserDate, user, array } = useForm(
    userSesion
  );
  // console.log("🚀nameUserDate", nameUserDate);
  // console.log("user", user);
  // console.log("array", array);
  return (
    <div className="Login">
      <div className="LoginCard">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Ingrese usuario</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Usuario"
              onChange={handleOnChange}
            />
            <Form.Text className="text-muted">
              Nunca compartiremos su correo electrónico con nadie más.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Me echa un vistazo" />
          </Form.Group>
          <Button className="btn btn-primary" type="submit">
            <b>Iniciar Sesion</b>
          </Button>
        </Form>
        <Nav.Link class="text-center" as={NavLink} to="/register">
          <i>Aun no tienes cuenta?, registrate gratuitamente</i>
        </Nav.Link>
      </div>
    </div>
  );
}
