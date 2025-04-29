import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "./Styles.css";

const Login = () => {
  const EyeOpen = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-eye-fill"
        viewBox="0 0 16 16"
      >
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
      </svg>
    );
  };
  const EyeClose = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-eye-slash-fill"
        viewBox="0 0 16 16"
      >
        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
      </svg>
    );
  };
  const [openEye, setopenEye] = useState(false);
  const [input, setInput] = useState({});
  const [validation, setValidation] = useState(false);
  function buttomEye() {
    setopenEye(!openEye);
  }
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
          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type="email"
              name="email"
              className="input"
              placeholder="Correo Electronico"
            />
          </Form.Group>
          <Form.Group className="blockEyeLogic" controlId="formBasicPassword">
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type={openEye ? "text" : "password"}
              name="password"
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
          <div className="mt-3 d-flex justify-content-between">
            <a
              href="/register"
              className="mb-3 btn btn-info btn-login d-flex justify-content-center"
              type="submit"
            >
              <div>Crear Cuenta</div>
            </a>
            <div className="mx-2"></div>
            <Button
              disabled={false}
              className="mb-3 btn btn-primary btn-login d-flex justify-content-center"
              type="submit"
            >
              <div>Iniciar Sesion</div>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Login;
