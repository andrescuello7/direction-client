import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import Portada from "./Portada.css";
import UseHome from "../../UseForm/UseHome";
import UsePerfil from "../../UseForm/UsePerfil";
import axios from "axios";

const Perfil = () => {
  const token = localStorage.getItem("token");
  const { usuario } = UseHome();
  const { onChangeImg, exampleImage, handlePic } = UsePerfil();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [input, setInput] = useState({});

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value };
    setInput(changedInput);
  };

  const onChangeDate = async (e) => {
    const headers = { "x-auth-token": token };
    try {
      await axios.put("usuario", input, { headers });
      handleClose()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="PortadaPrincipal">
        <div className="PortadaDatos">
          <div className="ml-5">
            <h2 className="PortadaNombre">{usuario.usuario}</h2>
            <div className="PortadaEmail">
              <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                </svg>
                <p className="pl-2"> {usuario.email}</p>
              </div>
              {usuario.celular !== undefined && <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-telephone-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                  />
                </svg>
                <p className="pl-2"> {usuario.celular}</p>
              </div>}
              {usuario.facebook !== undefined && <div className="d-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
                <p className="pl-2"> {usuario.facebook}</p>
              </div>}
              <div>
                <Button variant="primary" onClick={handleShow}>
                  <b>Update</b>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="PortadaFoto"
            src={usuario.imagen || exampleImage}
            alt=""
          />
          <div className="diagonal"></div>
        </div>
      </div>
      <div>
        <Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="w-100" closeButton>
              <Modal.Title className="text-center">
                Update of user
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="pl-2">
                <div className="d-flex">
                  <p>Nombre</p>
                  <input
                    className="form-control"
                    name="usuario"
                    type="text"
                    placeholder="facebook..."
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div className="d-flex">
                  <p>Facebook</p>
                  <input
                    className="form-control"
                    name="facebook"
                    type="text"
                    placeholder="facebook..."
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div className="d-flex">
                  <p>Cel/Telef</p>
                  <input
                    className="form-control"
                    name="celular"
                    type="number"
                    placeholder="telefono..."
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div className="d-flex">
                  <p>Foto de perfil</p>
                  <Form.Group
                    controlId="formFileMultiple"
                    className="w-100 d-flex justify-content-center mb-3"
                  >
                    <Form.Control
                      name="img"
                      accept="image/png, image/jpeg"
                      type="file"
                      onChange={(e) => handlePic(e)}
                      multiple
                    />
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button className="btn btn-primary" onClick={onChangeDate}>
                Guardar Cambios
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </div>
    </div>
  );
};
export default Perfil;
