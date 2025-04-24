import "./Publicacion.css";
import { Modal, Button, Form } from "react-bootstrap";
import { ImageIcon } from "../../utils/svg";
import UsePostPublic from "../../hooks/UsePostPublic";

const Publicacion = () => {
  const {
    HandleSubmit,
    handleUpload,
    HandleChange,
    handleClose,
    handleShow,
    handlePic,
    validation,
    base64,
    show,
  } = UsePostPublic();
  return (
    <div className="p-2 ModalPublicacion">
      <form onSubmit={HandleSubmit}>
        <div>
          <input
            onChange={(e) => HandleChange(e)}
            placeholder="Titulo"
            type="text"
            name="titulo"
            maxLength="30"
          />
        </div>
        <div>
          <textarea
            onChange={(e) => HandleChange(e)}
            placeholder="Descripcion"
            type="text"
            name="contenido"
          />
        </div>
        {validation === true && (
          <div className="ml-2 text-danger">
            <p>No se puede publicar, modifica los datos!</p>
          </div>
        )}
        <div className="w-100 d-flex justify-content-center">
          {base64 && (
            <div>
              <img className="PublicacionFotoImg" src={base64} alt="" />
            </div>
          )}
        </div>
        <hr />
        <div className="d-flex justify-content-between ml-2 mr-2">
          <Button variant="outline-secondary" onClick={handleShow}>
            {ImageIcon}
          </Button>
          <button type="submit" className="btn btn-outline-light">
            Publicar
          </button>
        </div>
      </form>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <div>
              <div className="w-100 d-flex justify-content-center mb-3">
                <h4 className="text-center">Seleccionar Imagen a subir</h4>
              </div>
              <div>
                <Form.Group
                  controlId="formFileMultiple"
                  className="w-100 d-flex justify-content-center mb-3"
                >
                  <Form.Control
                    name="img"
                    accept="image/png, image/jpeg"
                    type="file"
                    onChange={handlePic}
                    multiple
                  />
                </Form.Group>
              </div>
              <div className="w-100 d-flex justify-content-center">
                {base64 && (
                  <div>
                    <img className="PublicacionFotoImg" src={base64} alt="" />
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-100 d-flex justify-content-between">
              <Button variant="primary" onClick={handleUpload}>
                Seleccionar
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default Publicacion;
