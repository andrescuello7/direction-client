import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { EyeClose, EyeOpen } from "../../utils/svg";
import axios from "axios";
import "./Styles.css";

const Login = () => {
  const [samepassword, setSamePassword] = useState(true);
  const [openEye, setopenEye] = useState(false);
  const [input, setInput] = useState({});
  const [validation, setValidation] = useState(false);
  function buttomEye() {
    setopenEye(!openEye);
  }
  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value };
    if (changedInput.email !== null && changedInput?.password !== "") {
      setSamePassword(false);
    } else {
      setSamePassword(true);
    }
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
          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type="email"
              name="Email"
              className="input"
              placeholder="Correo Electronico"
            />
          </Form.Group>
          <Form.Group className="blockEyeLogic" controlId="formBasicPassword">
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type={openEye ? "text" : "password"}
              name="Password"
              className="input"
              placeholder="Contraseña"
            />
            <div className="iconSvg" onClick={buttomEye}>
              {openEye ? <EyeOpen /> : <EyeClose />}
            </div>
          </Form.Group>
          {validation === true && (
            <div className="ml-2 text-danger">
              <p>No se puede iniciar sesion, modifica los datos!</p>
            </div>
          )}
          <a href="/" className="ml-1 mt-2">
            Olvidaste tu contraseña?
          </a>
          <div className="mt-3 d-flex justify-content-between">
            <a
              href="/register"
              className="mb-3 btn btn-outline-light border-light btn-login d-flex justify-content-center"
              type="submit"
            >
              <b>Crear Cuenta</b>
            </a>
            <div className="mx-2"></div>
            <Button
              disabled={samepassword}
              className="mb-3 btn btn-primary btn-login d-flex justify-content-center"
              type="submit"
            >
              <b>Iniciar Sesion</b>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Login;
