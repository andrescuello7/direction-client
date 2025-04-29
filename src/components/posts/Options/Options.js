import "./Options.css";
import DeletePostModal from "./DeletePostModal";
import { DeleteIcon, OptionsPostIcon, LockIcon } from "../../../utils/svg";
import { useState } from "react";

const OptionsItem = ({ idPost }) => {
  const [enable, setEnable] = useState(false);
  const switchEnable = () => setEnable(!enable);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      {enable && (
        <div className="option">
          <div className="px-2 pb-2 w-100 d-flex align-items-center justify-content-start">
            <LockIcon height={18} width={18} open={false} />
            <div className="mx-2">Privado</div>
          </div>
          <div
            className="px-2 w-100 d-flex align-items-center text-danger justify-content-start"
            onClick={() => setDeleteModal(true)}
          >
            <DeleteIcon height={18} width={18} className="mr-2 " />
            <div>Eliminar</div>
          </div>
        </div>
      )}
      <div className="options-tab" onClick={switchEnable}>
        {OptionsPostIcon}
      </div>

      <DeletePostModal
        IdPost={idPost}
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
      />
    </>
  );
};

export default OptionsItem;
