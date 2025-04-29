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
      size="lg"
      contentClassName="modalDeletePost" 
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h5 className="fw-bolder mt-3"><b>Eliminar Post</b></h5>
        <p>Seguro que quiere eliminar el Post despues no podra recuperarlo.</p>
        <div className="mt-4 d-flex justify-content-between">
            <Button
            variant="btn btn-outline-light"
            className="fw-bolder"
            onClick={props.onHide}
            >
            <b>Cerrar</b>
            </Button>
            <Button
            variant="btn btn-danger"
            className="fw-bold"
            onClick={DeletePost}
            >
            <b>Borrar{" "}<DeleteIcon /></b>
            </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default DeletePostModal;
