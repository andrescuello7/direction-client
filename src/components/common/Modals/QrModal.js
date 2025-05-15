import { useLocation } from "react-router-dom";
import "../../profile/Portada/Portada.css";

import { CopyIcon, MailboxPray } from "../../../utils/svg";
import { useState } from "react";
import { Modal, Image } from "react-bootstrap";

const QRModal = ({ idUser, qrModal, setQrModal, usuario }) => {
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
    <Modal
      contentClassName="qr-modal-container bg-dark"
      show={qrModal !== ""}
      onHide={() => setQrModal("")}
      centered
    >
      <Modal.Body>
        <div className="qr-modal-content d-flex flex-column align-items-center">
          <div className="qr-title mb-3 text-center">
            <h5 className="text-light"><b>{usuario?.UserName}</b> código de oración</h5>
            <p className="text-secondary small">
              Crea un pedido de oración y escanea el código para enviar una
              petición.
            </p>
          </div>

          <div className="qr-box border border-2 rounded-3 p-3">
            <Image
              className="rounded-3"
              width={180}
              height={180}
              src={qrModal}
              alt="QR para oraciones"
            />
          </div>

          <div className="qr-code-box border border-secondary text-white rounded-3 px-3 py-2 mt-3 d-flex align-items-center justify-content-between w-75">
            <code className="text-truncate">{usuario?.UserName}</code>
            <div
              onClick={handleCopy}
              className="ms-2"
              style={{ cursor: "pointer" }}
            >
              <CopyIcon copy={copied} height={20} width={20} />
            </div>
          </div>

          <div className="text-secondary mt-2 small">
            O hacer tu pedido
          </div>

          <a href={urlPath} className="btn btn-primary mt-2 w-75">Continuar</a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QRModal;
