import UsePerfil from "../../../hooks/profile/usePerfil";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Portada.css";

import {
  FacebookIcon,
  QrGeneratorIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "../../../utils/svg";
import { useEffect, useState } from "react";
import { qrGenerate } from "../../../services/imgs.services";
import ChangeInfoUser from "./Modals/ChangeInfoUser";
import PrayModal from "./Modals/PrayModal";
import QrModal from "./Modals/QrModal";

const Perfil = ({ usuario, whoami }) => {
  const location = useLocation();
  const { exampleImage, handlePic, UpdateInfoUser, saveLoading, currentUser } = UsePerfil();

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

  const InfoView = ({ Icon, Info, Enable }) => {
    return (
      Enable !== undefined && (
        <a className="text-light d-flex mt-3 mb-2 ml-2" target="_blank" href={Info}>
          {Icon}
        </a>
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
                <div className="w-75">{usuario?.descripcion}</div>
              </div>
              <div className="BoxPhoto mt-5">
                <img
                  className="PortadaFoto"
                  src={usuario?.imagen || exampleImage}
                  alt=""
                />
                <div className="diagonal"></div>
              </div>
            </div>
            <div className="d-flex mt-2 w-100 justify-content-end">
              <InfoView
                Icon={<InstagramIcon height={25} width={25} />}
                Info={`https://www.instagram.com/${usuario?.instagram}`}
                Enable={usuario?.instagram}
              />
              <InfoView
                Icon={<WhatsAppIcon height={25} width={25} />}
                Info={`https://wa.me/${usuario?.celular}`}
                Enable={usuario?.celular}
              />
              <InfoView
                Icon={<FacebookIcon height={25} width={25} />}
                Info={`https://web.facebook.com/${usuario?.facebook}`}
                Enable={usuario?.facebook}
              />
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
        <PrayModal
          handlePrayClose={handlePrayClose}
          prayShow={prayShow}
          usuario={usuario}
        />
      )}
      <ChangeInfoUser
        CurrentUser={currentUser}
        HandleChange={HandleChange}
        UpdateInfoUser={UpdateInfoUser}
        handleClose={handleClose}
        handlePic={handlePic}
        input={input}
        saveLoading={saveLoading}
        show={show}
      />
      <QrModal
        idUser={usuario?._id}
        qrModal={qrModal}
        setQrModal={setQrModal}
        usuario={usuario}
      />
    </div>
  );
};

export default Perfil;
