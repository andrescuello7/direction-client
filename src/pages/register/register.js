import React from "react";
import { useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useFormRegister from "../../useForm/useFormRegister";
import { getStorageArray, setStorage } from "../../utils";

export default function FormExample() {
  const [input, setInput] = useState({
    name: "",
    password: "",
    email: "",
  });
  const { handleChange, handleSubmit, validated } = useFormRegister(input);

  return (
    <div className="Login">
      <div className="LoginCard">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Bien se ve!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="descripcion">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              rows={3}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              name="password"
              required
              type="password"
              onChange={handleChange}
            />
            <Form.Control.Feedback>Bien se ve!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Check
              required
              label="Acepta los términos y condiciones"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <div>
              <Button type="submit">Guardas Datos</Button>
            </div>
            <div>
              <Nav.Link as={NavLink} to="/" exact>
                <i>Volver atras</i>
              </Nav.Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
