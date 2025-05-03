import UsePerfil from "../../../hooks/profile/usePerfil";
import { useLocation } from "react-router-dom";
import "./Portada.css";

import {
  EmailIcon,
  FacebookIcon,
  PhoneIcon,
  ImageIcon,
} from "../../../utils/svg";
import { Modal, Button, Form, Spinner, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CopyIcon } from "../../../utils/svg";
import { qrGenerate } from "../../../services/imgs.services";
import { savePrayes } from "../../../services/prayes.services";

const Perfil = ({ usuario, whoami }) => {
  const location = useLocation();
  const { exampleImage, handlePic, UpdateInfoUser, saveLoading } = UsePerfil();

  const [input, setInput] = useState({});
  const [qrModal, setQrModal] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [prayShow, setPrayShow] = useState(null);
  const handlePrayClose = () => setPrayShow(false);
  const handlePrayShow = () => setPrayShow(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("pray") === "true") {
      handlePrayShow();
    }
  }, [location.search]);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value };
    setInput(changedInput);
  };

  const GenerateQR = async () => {
    const qrGenerateRes = await qrGenerate({ idProfile: usuario?._id });
    setQrModal(qrGenerateRes?.qr);
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="PortadaPrincipal">
        <div className="PortadaDatos">
          <div className="profileInfoOptions">
            {/* <div
              className="w-100 d-flex justify-content-end"
              onClick={GenerateQR}
            >
              <div className="border border-5 p-2 rounded border-secondary text-secondary">
                <QrGeneratorIcon width={30} height={30} />
              </div>
            </div> */}
            <div className="BoxUserInfoToPhoto">
              <div className="BoxInfoUser">
                <h2 className="PortadaNombre">{usuario?.usuario}</h2>
                {usuario?.celular !== undefined && (
                  <div className="d-flex mb-2">
                    {PhoneIcon} <div className="mx-2">{usuario?.celular}</div>
                  </div>
                )}
                {usuario?.facebook !== undefined && (
                  <div className="d-flex mb-2">
                    {FacebookIcon}{" "}
                    <div className="mx-2">{usuario?.facebook}</div>
                  </div>
                )}
                {usuario?.email !== undefined && (
                  <div className="d-flex mb-2">
                    {EmailIcon} <div className="mx-2">{usuario?.email}</div>
                  </div>
                )}
              </div>
              <div className="BoxPhoto" onDoubleClick={GenerateQR}>
                <img
                  className="PortadaFoto"
                  src={usuario?.imagen || exampleImage}
                  alt=""
                />
                <div className="diagonal"></div>
              </div>
            </div>
            {whoami && (
              <div className="PortadaEmail">
                <div>
                  <Button
                    variant="outline-secondary"
                    className="w-100"
                    onClick={handleShow}
                  >
                    <b>Editar</b>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {prayShow !== null && <FormPrayModal
        handlePrayClose={handlePrayClose}
        prayShow={prayShow}
        usuario={usuario}
      />}
      <FormChangeUserModal
        HandleChange={HandleChange}
        UpdateInfoUser={UpdateInfoUser}
        handleClose={handleClose}
        handlePic={handlePic}
        input={input}
        saveLoading={saveLoading}
        show={show}
      />
      <div>
        <Modal
          contentClassName="modalUpdateUser mx-3"
          show={qrModal !== ""}
          onHide={() => setQrModal("")}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="d-flex flex-column text-center align-items-center justify-content-center">
              <Image
                className="rounded rounded-4"
                width={250}
                height={250}
                src={qrModal}
              />
              <h3 className="mt-5 w-100 PortadaNombre d-flex justify-content-center" >
                {usuario?.usuario} <CopyButton idUser={usuario?._id} />
              </h3>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};


function CopyButton({ idUser }) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const urlPath = `${process.env.REACT_APP_URL_WEBSITE}${location?.pathname}/${idUser}?pray=true`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(urlPath);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles: ', err);
    }
  };

  return (
    <div className="ml-3" onClick={handleCopy}>
      <CopyIcon copy={copied} height={25} width={25} />
    </div>
  );
}

function FormPrayModal({ prayShow, handlePrayClose, usuario }) {
  const [input, setInput] = useState({});
  const [save, setSave] = useState(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, to: usuario?._id, [name]: value };
    setInput(changedInput);
  };

  const SavePrayFromUser = async () => {
    setSave(true)
    await savePrayes({ body: input, idUser: usuario?._id })
    setSave(false)
    handlePrayClose()
  };
  console.log(prayShow);
  

  return (
    <div>
      <Form>
        <Modal
          contentClassName="modalUpdateUser"
          show={prayShow}
          onHide={() => handlePrayClose()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Modal.Title className="ml-2 mb-2 text-start d-flex">
              <b>{usuario?.usuario}</b><div className="ml-2">Pedido de Oracion</div>
            </Modal.Title>
            <div className="d-flex flex-column mb-3">
              <textarea
                className="form-control prayFormInput m-0 mb-3 mt-3"
                name="description"
                type="text"
                placeholder={`Porque queres que este orando?`}
                onChange={HandleChange}
              />
              <input
                className="form-control prayFormInput"
                name="from"
                type="text"
                placeholder="De parte de quien? (Opcional)"
                onChange={HandleChange}
              />
            </div>
            <div className="w-100 d-flex justify-content-end">
              <Button
                className="mx-2 btn btn-success"
                onClick={SavePrayFromUser}
              >
                <b>Enviar Oracion</b>
                {save && (
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
  );
}

function FormChangeUserModal({
  show,
  handleClose,
  HandleChange,
  handlePic,
  UpdateInfoUser,
  input,
  saveLoading }) {
  return (
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
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="facebook"
                  type="text"
                  placeholder="Facebook"
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="celular"
                  type="number"
                  placeholder="Celular"
                  onChange={HandleChange}
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
  );
}

export default Perfil;