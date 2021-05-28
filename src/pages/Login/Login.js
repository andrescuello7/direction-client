import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

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
      setValidation(true)
    }
  };

  return (
    <div className="FondoDeForm">
      <div className="w-100">
        <h1 className="text-center PortadaTituloForm"><b><i>Lugar Secreto</i></b></h1>
      </div>
      <div className="login">
        <Form onSubmit={HandleSubmit} className="FormLogin card">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type="email"
              name="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          {(validation === true &&(<div className="ml-2 text-danger">
          <p>No se puede iniciar sesion, modifica los datos!</p>
        </div>))}
          <div>
            <a href="/register">No tienes cuenta?, create una cuenta</a>
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
