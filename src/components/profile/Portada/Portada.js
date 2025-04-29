import UsePerfil from "../../../hooks/profile/usePerfil";
import axios from "axios";
import "./Portada.css";

import {
  EmailIcon,
  FacebookIcon,
  PhoneIcon,
  ImageIcon,
} from "../../../utils/svg";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";

const Perfil = ({ usuario, whoami }) => {
  const { exampleImage, handlePic, UpdateInfoUser, saveLoading } = UsePerfil();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [input, setInput] = useState({});

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value };
    setInput(changedInput);
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
              {usuario?.email && (
                <div className="d-flex">
                  {EmailIcon}
                  <p className="pl-2">
                    <b>Email:</b> {usuario?.email}
                  </p>
                </div>
              )}
              {whoami && (
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
          <Modal
            contentClassName="modalUpdateUser"
            show={show}
            onHide={handleClose}
          >
            <Modal.Body>
              <Modal.Title className="mb-4 text-center">
                <b>Actualizar Datos</b>
              </Modal.Title>
              <div className="pl-2">
                <div className="d-flex mb-2">
                  <input
                    className="form-control"
                    name="usuario"
                    type="text"
                    placeholder="Nombre de Usuario"
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div className="d-flex mb-2">
                  <input
                    className="form-control"
                    name="facebook"
                    type="text"
                    placeholder="Facebook"
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div className="d-flex mb-2">
                  <input
                    className="form-control"
                    name="celular"
                    type="number"
                    placeholder="Celular"
                    onChange={(e) => HandleChange(e)}
                  />
                </div>
                <div className="upload-wrapper">
                  <label htmlFor="file-upload" className="custom-upload-button">
                    <ImageIcon height={20} width={20} />{" "}
                    <div className="mx-2">Subir Imagen</div>
                  </label>
                  <input
                    id="file-upload"
                    name="img"
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={(e) => handlePic(e)}
                    className="hidden-file-input"
                  />
                </div>
              </div>
              <div className="w-100 d-flex justify-content-end">
                <Button
                  className="mx-2 btn btn-primary"
                  onClick={() => UpdateInfoUser({ input, handleClose })}
                >
                  <b>Guardar Cambios</b>
                  {saveLoading && (
                    <Spinner
                      className="spinnerSize"
                      animation="border"
                      variant="light"
                    />
                  )}
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </Form>
      </div>
    </div>
  );
};
export default Perfil;
