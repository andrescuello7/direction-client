import "./Options.css";
import DeletePostModal from "../../Modals/DeletePostModal";
import SendMessageModal from "../../Modals/SendMessageModal";
import {
  LockIcon,
  DeleteIcon,
  OptionsPostIcon,
  PraySuccessIcon,
  WhatsAppIcon,
} from "../../../../utils/svg";
import { useState, useRef, useEffect } from "react";

const OptionsItem = ({
  idPost,
  Private,
  Delete,
  DeleteProject,
  PraySuccess,
  SendMessage,
}) => {
  const [enable, setEnable] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sendMessageModal, setSendMessageModal] = useState(false);
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);

  const optionsRef = useRef(null);

  const switchEnable = () => setEnable(!enable);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setEnable(false);
      }
    };
  
    if (enable) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enable]);

  const OptionItemSelect = ({ Icon, SetModal, Label, className, Enable }) => {
    return Enable ? (
      <div
        className={`${className} px-2 mt-1 w-100 d-flex align-items-center justify-content-start`}
        onClick={() => SetModal(true)}
      >
        <Icon height={15} width={15} />
        <div className="mx-2 w-100">{Label}</div>
      </div>
    ) : (
      <></>
    );
  };

  return (
    <>
      {enable && (
        <div className="option" ref={optionsRef}>
          <OptionItemSelect
            Enable={SendMessage}
            Label={"Enviar Mensaje"}
            className={"text-light"}
            Icon={WhatsAppIcon}
            SetModal={setSendMessageModal}
          />
          <OptionItemSelect
            Enable={Private}
            Label={"Privado"}
            Icon={LockIcon}
            SetModal={setDeleteModal}
          />
          <OptionItemSelect
            Enable={PraySuccess}
            Label={"Oracion exitosa"}
            Icon={PraySuccessIcon}
          />
          <OptionItemSelect
            Enable={Delete}
            Label={"Eliminar"}
            Icon={DeleteIcon}
            SetModal={setDeleteModal}
            className={"text-danger"}
          />
          <OptionItemSelect
            Enable={DeleteProject}
            Label={"Eliminar Proyecto"}
            Icon={DeleteIcon}
            SetModal={setDeleteProjectModal}
            className={"text-danger"}
          />
        </div>
      )}
      <DeletePostModal
        IdPost={idPost}
        show={deleteModal}
        Title="Eliminar Post"
        onHide={() => setDeleteModal(false)}
      />
      <DeletePostModal
        IdProject={idPost}
        show={deleteProjectModal}
        Title="Eliminar Proyecto"
        onHide={() => setDeleteProjectModal(false)}
      />
      <SendMessageModal
        show={sendMessageModal}
        Title="Enviar Mensaje"
        onHide={() => setSendMessageModal(false)}
      />
      <div className="options-tab" onClick={switchEnable}>
        {OptionsPostIcon}
      </div>
    </>
  );
};

export default OptionsItem;
