import UsePerfil from "../../../hooks/profile/usePerfil";
import axios from "axios";
import "./Portada.css";

import { EmailIcon, FacebookIcon, PhoneIcon } from "../../../utils/svg";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

const Perfil = ({ usuario, whoami }) => {
  const token = localStorage.getItem("token");
  const { exampleImage, handlePic } = UsePerfil();

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
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="PortadaPrincipal">
        <div className="PortadaDatos">
          <div className="ml-5">
            <h2 className="PortadaNombre">{usuario?.usuario}</h2>
              <div className="PortadaEmail">
                {usuario?.celular !== undefined && (
                  <div className="d-flex">
                    {PhoneIcon}
                    <p className="pl-2">
                      <b>Celu:</b> {usuario?.celular}
                    </p>
                  </div>
                )}
                {usuario?.facebook !== undefined && (
                  <div className="d-flex">
                    {FacebookIcon}
                    <p className="pl-2">
                      <b>Face:</b> {usuario?.facebook}
                    </p>
                  </div>
                )}
                <div className="d-flex">
                  {EmailIcon}
                  <p className="pl-2">
                    <b>Email:</b> {usuario?.email}
                  </p>
                </div>
                {whoami  && (
                  <div>
                    <Button
                      variant="outline-secondary"
                      className="w-50"
                      onClick={handleShow}
                    >
                      <b>Editar</b>
                    </Button>
                  </div>
                )}
              </div>
          </div>
        </div>
        <div>
          <img
            className="PortadaFoto"
            src={usuario?.imagen || exampleImage}
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
                <b>Actualizar Datos</b>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="pl-2">
                <div className="d-flex">
                  <input
                    className="form-control"
                    name="usuario"
                    type="text"
                    placeholder="Nombre de Usuario"
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div className="d-flex">
                  <input
                    className="form-control"
                    name="facebook"
                    type="text"
                    placeholder="Facebook"
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div className="d-flex">
                  <input
                    className="form-control"
                    name="celular"
                    type="number"
                    placeholder="Celular"
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div className="d-flex">
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
              <Button
                className="mx-2 w-100 btn btn-primary"
                onClick={onChangeDate}
              >
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
