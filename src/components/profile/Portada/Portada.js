import UsePerfil from "../../../hooks/profile/usePerfil";
import { useLocation } from "react-router-dom";
import "./Portada.css";

import {
  CopyIcon,
  PhoneIcon,
  ImageIcon,
  EmailIcon,
  MailboxPray,
  FacebookIcon,
  QrGeneratorIcon,
} from "../../../utils/svg";
import { Modal, Button, Form, Spinner, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
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

  const InfoView = ({ Icon, Info }) => {
    return (
      Info !== undefined && (
        <div className="d-flex mb-2">
          {Icon} <div className="mx-2">{Info}</div>
        </div>
      )
    );
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="PortadaPrincipal">
        <div className="PortadaDatos">
          <div className="profileInfoOptions">
            <div className="BoxUserInfoToPhoto">
              <div className="BoxInfoUser">
                <h2 className="PortadaNombre">{usuario?.usuario}</h2>
                <InfoView Icon={PhoneIcon} Info={usuario?.celular} />
                <InfoView Icon={FacebookIcon} Info={usuario?.facebook} />
                <InfoView Icon={EmailIcon} Info={usuario?.email} />
              </div>
              <div className="BoxPhoto">
                <img
                  className="PortadaFoto"
                  src={usuario?.imagen || exampleImage}
                  alt=""
                />
                <div className="diagonal"></div>
              </div>
            </div>
            {whoami && (
              <div className="w-100 d-flex justify-content-between">
                <div className="mr-2 PortadaEmail">
                  <div>
                    <Button
                      variant="outline-secondary"
                      className="w-100"
                      onClick={handleShow}
                    >
                      <b>Editar perfil</b>
                    </Button>
                  </div>
                </div>
                <div className="ml-2 PortadaEmail">
                  <div>
                    <Button
                      variant="outline-secondary"
                      className="w-100"
                      onClick={GenerateQR}
                    >
                      <QrGeneratorIcon width={15} height={15} />
                      <b className="ml-2">Oraciones</b>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {prayShow !== null && (
        <FormPrayModal
          handlePrayClose={handlePrayClose}
          prayShow={prayShow}
          usuario={usuario}
        />
      )}
      <FormChangeUserModal
        HandleChange={HandleChange}
        UpdateInfoUser={UpdateInfoUser}
        handleClose={handleClose}
        handlePic={handlePic}
        input={input}
        saveLoading={saveLoading}
        show={show}
      />
      <div className="">
        <Modal
          contentClassName="modalUpdateUser w-100"
          show={qrModal !== ""}
          onHide={() => setQrModal("")}
          size="lg"
          aria-labelledby="example-modal-sizes-title-sm"
          centered
        >
          <Modal.Body>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="mt-3 mb-5 w-100 PortadaNombre d-flex justify-content-center align-items-center">
                <MailboxPray height={30} width={30} />
                <div className="ml-2 d-inline-block text-truncate">Pedidos de Oracion</div>
              </div>
              <Image
                className="rounded rounded-4"
                width={200}
                height={200}
                src={qrModal}
              />
              <div className="mt-5 w-100 PortadaNombre d-flex justify-content-center">
                {usuario?.usuario} <CopyButton idUser={usuario?._id} />
              </div>
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
  let userPray =
    location?.pathname === "/profile"
      ? `/profile/${idUser}`
      : location?.pathname;

  const urlPath = `${process.env.REACT_APP_URL_WEBSITE}${userPray}?pray=true`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(urlPath);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar al portapapeles: ", err);
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
    setSave(true);
    await savePrayes({ body: input, idUser: usuario?._id });
    setSave(false);
    handlePrayClose();
  };

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
            <Modal.Title>
              <div className="w-100 d-flex mb-3 justify-content-center">
                <MailboxPray height={30} width={30} />
                <b className="ml-2">Pedido de Oracion</b>
              </div>
              <hr className="bg-secondary" />
              <div className="ml-2 mt-3 mb-2 d-flex justify-content-between">
                <b>{usuario?.usuario}</b>
                <div className="w-25 d-flex justify-content-end">
                  <Button
                    className="mx-2 btn btn-success"
                    onClick={SavePrayFromUser}
                  >
                    <b>Enviar</b>
                    {save && (
                      <Spinner
                        className="spinnerSize"
                        animation="border"
                        variant="light"
                      />
                    )}
                  </Button>
                </div>
              </div>
            </Modal.Title>
            <div className="d-flex flex-column">
              <textarea
                className="form-control prayFormInput m-0 mb-3 mt-3"
                name="description"
                type="text"
                placeholder="Porque queres que este orando?"
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
  saveLoading,
}) {
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
