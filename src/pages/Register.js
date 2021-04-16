import { Form, Button } from "react-bootstrap";

const Register = () => {
  return (
    <div>
      <div className="w-100 mt-5">
        <h2 className="text-center">Registrate</h2>
      </div>
      <div className="login">
        <Form className="FormLogin card">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div>
            <a href="">Ya me registre, iniciar sesion</a>
          </div>
          <Button variant="primary" type="submit">
            Registarse
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Register;
