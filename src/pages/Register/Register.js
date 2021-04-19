import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Register = () => {
  const [input, setInput] = useState({});

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
    }
  };

  return (
    <div>
      <div className="w-100 mt-5">
        <h2 className="text-center">Registrate</h2>
      </div>
      <div className="login">
        <Form onSubmit={HandleSubmit} className="FormLogin card">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control onChange={(e) => HandleChange(e)} type="text" name="usuario" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control onChange={(e) => HandleChange(e)} type="email" name="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control onChange={(e) => HandleChange(e)} type="password" name="password" placeholder="Password" />
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