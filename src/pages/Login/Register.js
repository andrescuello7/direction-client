import { Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import {
  AppleIcon,
  GoogleIcon,
  FacebookIcon,
  EyeClose,
  EyeOpen,
} from "../../utils/svg";
import "./Styles.css";

const Register = () => {
  const [samepassword, setSamePassword] = useState(true);
  const [validation, setValidation] = useState(false);
  const [input, setInput] = useState({});

  const [openEye, setOpenEye] = useState(false);
  const toggleEye = () => setOpenEye(!openEye);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value };
    if (
      changedInput?.Password === changedInput?.confirmPassword &&
      changedInput.UserName !== null &&
      changedInput.Email !== null &&
      changedInput?.Password !== "" &&
      changedInput?.confirmPassword !== ""
    ) {
      setSamePassword(false);
    } else {
      setSamePassword(true);
    }
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
          <h1 className="text-center PortadaTituloForm">Registrate!</h1>
          <button
            disabled={true}
            className="w-100 mb-3 btn btn-primary btn-login d-flex justify-content-center"
          >
            {FacebookIcon}
            <div className="ml-2">Facebook</div>
            <div></div>
          </button>
          <button
            disabled={true}
            className="mb-3 btn btn-light btn-login d-flex justify-content-center"
          >
            {GoogleIcon} <div>Google</div>
            <div></div>
          </button>
          <button className="btn-apple btn btn-dark btn-login d-flex justify-content-center">
            {AppleIcon} <div>Apple</div>
            <div></div>
          </button>
          <br />
          <hr className="text-light m-0 p-0 w-100" />
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type="text"
              name="UserName"
              className="input"
              placeholder="Usuario"
            />
          </Form.Group>
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
            <div className="iconSvg" onClick={toggleEye}>
              {openEye ? <EyeOpen /> : <EyeClose />}
            </div>
          </Form.Group>
          <Form.Group className="blockEyeLogic" controlId="formBasicPassword">
            <Form.Control
              onChange={(e) => HandleChange(e)}
              type={openEye ? "text" : "password"}
              name="confirmPassword"
              className="input"
              placeholder="Confirmar Contraseña"
            />
          </Form.Group>
          {validation === true && (
            <div className="ml-2 text-danger">
              <p>No se puede registrar, modifica los datos!</p>
            </div>
          )}
          <button
            disabled={samepassword}
            className="mb-3 mt-4 btn btn-primary btn-login d-flex justify-content-center"
            type="submit"
          >
            <div>Registarse</div>
          </button>
        </Form>
      </div>
    </div>
  );
};
export default Register;
