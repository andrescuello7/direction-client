import "./Options.css";
import { DeleteIcon, OptionsPostIcon, LockIcon } from "../../../utils/svg";
import { deletePosts } from "../../../services/posts.services";
import { useState } from "react";

const OptionsItem = ({ idPost }) => {
  const [enable, setEnable] = useState(false);
  const switchEnable = () => setEnable(!enable);

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
            onClick={() => deletePosts({ idPost: idPost })}
          >
            <DeleteIcon height={18} width={18} className="mr-2 " />
            <div>Eliminar</div>
          </div>
        </div>
      )}
      <div className="mt-3 mx-2 options-tab" onClick={switchEnable}>
        {OptionsPostIcon}
      </div>
    </>
  );
};

export default OptionsItem;
