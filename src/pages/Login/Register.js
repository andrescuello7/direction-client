import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import "./Styles.css";

const Register = () => {
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
      const { data } = await axios.post("usuario", input);
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
          <h1 className="text-center PortadaTituloForm">Registrate</h1>
          <Form.Group controlId="formBasicEmail">
            {/* <Form.Label>Nombre</Form.Label> */}
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type="text"
              name="usuario"
              className="input"
              placeholder="Usuario"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            {/* <Form.Label>Correo Electronico</Form.Label> */}
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type="email"
              name="email"
              className="input"
              placeholder="Correo Electronico"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            {/* <Form.Label>Contraseña</Form.Label> */}
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
              <p>No se puede registrar, modifica los datos!</p>
            </div>
          )}
          <a className="mx-2 mb-2" href="/login">
            Ya me registre, iniciar sesion
          </a>
          <Button className="button" variant="outline-primary" type="submit">
            Registarse
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Register;
