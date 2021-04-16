import { Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <div>
      <div className="w-100 mt-5">
        <h2 className="text-center">Vlog Primer Amor</h2>
      </div>
      <div className="login">
        <Form className="FormLogin card">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div>
            <a href="">No tienes cuenta?, create una cuenta</a>
          </div>
          <Button variant="primary" type="submit">
            Iniciar Sesion
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Login;
