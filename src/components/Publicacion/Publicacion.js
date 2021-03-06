import "./Publicacion.css";
import { Modal, Button, Form } from "react-bootstrap";
import UsePostPublic from "../../UseForm/UsePostPublic";

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
            placeholder="Titulo..."
            type="text"
            name="titulo"
            maxLength="30"
          />
        </div>
        <div>
          <textarea
            onChange={(e) => HandleChange(e)}
            placeholder="Publicacion..."
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
          <Button variant="outline-light" onClick={handleShow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-card-image"
              viewBox="0 0 16 16"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
            </svg>
          </Button>
          <button type="submit" className="btn btn-outline-primary">
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
