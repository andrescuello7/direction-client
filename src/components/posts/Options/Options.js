import "./Options.css";
import DeletePostModal from "./DeletePostModal";
import {
  DeleteIcon,
  OptionsPostIcon,
  LockIcon,
  PraySuccessIcon,
} from "../../../utils/svg";
import { useState } from "react";
import { Button } from "react-bootstrap";

const OptionsItem = ({ idPost, Private, Delete, PraySuccess }) => {
  const [enable, setEnable] = useState(false);
  const switchEnable = () => setEnable(!enable);
  const [deleteModal, setDeleteModal] = useState(false);

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
        <div className="option">
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
        </div>
      )}
      <DeletePostModal
        IdPost={idPost}
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
      />
      <div className="options-tab" onClick={switchEnable}>
        {OptionsPostIcon}
      </div>
    </>
  );
};

export default OptionsItem;
