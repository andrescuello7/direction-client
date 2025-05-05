import { useLocation } from "react-router-dom";
import "../Portada.css";

import { CopyIcon, MailboxPray } from "../../../../utils/svg";
import { useState } from "react";
import { Modal, Button, Image } from "react-bootstrap";

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
              <div className="ml-2 d-inline-block text-truncate">
                Pedidos de Oracion
              </div>
            </div>
            <Image
              className="rounded rounded-4"
              width={200}
              height={200}
              src={qrModal}
            />
            <div className="mt-5 w-100 PortadaNombre d-flex justify-content-center">
              {usuario?.usuario}
              <div className="ml-3" onClick={handleCopy}>
                <CopyIcon copy={copied} height={25} width={25} />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default QRModal;
