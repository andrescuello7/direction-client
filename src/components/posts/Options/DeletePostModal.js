import { Button, Modal } from "react-bootstrap";
import { deletePosts } from "../../../services/posts.services";
import { DeleteIcon } from "../../../utils/svg";

function DeletePostModal(props) {
  const DeletePost = async () => {
    await deletePosts({ idPost: props.IdPost });
    window.location.href = "/";
  };

  return (
    <Modal
      {...props}
      size="sm"
      contentClassName="modalDeletePost"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h5 className="fw-bolder mt-2 mb-5">
          <b>Eliminar Post</b>
        </h5>
        <div className="mt-4 d-flex justify-content-between">
          <Button
            variant="w-50 btn btn-outline-danger"
            className="fw-bolder"
            onClick={props.onHide}
          >
            <b>Cancelar</b>
          </Button>
          <Button
            variant="btn btn-danger d-flex align-items-center"
            className="fw-bold"
            onClick={DeletePost}
          >
            <DeleteIcon height={15} width={15} />
            <b className="ml-1">Borrar Post</b>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default DeletePostModal;
