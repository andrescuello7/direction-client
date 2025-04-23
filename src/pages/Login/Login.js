import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "./Styles.css";

const Login = () => {
  const [input, setInput] = useState({});
  const [validation, setValidation] = useState(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value };
    setInput(changedInput);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("auth", input);
      localStorage.setItem("token", data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setValidation(true);
    }
  };

  return (
    <div className="FondoDeForm">
      <div className="login">
        <Form onSubmit={HandleSubmit} className="FormLogin card">
          <h1 className="text-center PortadaTituloForm">Lugar Secreto</h1>
          <br/>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type="email"
              name="email"
              className="input"
              placeholder="Correo Electronico"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type="password"
              name="password"
              className="input"
              placeholder="Contraseña"
            />
          </Form.Group>
          {validation === true && (
            <div className="ml-2 text-danger">
              <p>No se puede iniciar sesion, modifica los datos!</p>
            </div>
          )}
          <a className="mx-2 mb-2" href="/register">No tienes cuenta?, create una cuenta</a>
          <Button className="button" variant="outline-primary" type="submit">
            Iniciar Sesion
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Login;
