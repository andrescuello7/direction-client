import "./Publicacion.css";
import { Modal, Button, Form } from "react-bootstrap";
import { ImageIcon } from "../../../utils/svg";
import UsePosts from "../../../hooks/posts/usePosts";

const Publicacion = () => {
  const {
    handleChange,
    handleImageUpload,
    handleCloseModal,
    validationError,
    handleOpenModal,
    handleSubmit,
    showModal,
    formInput
  } = UsePosts();
  
  return (
    <div className="p-2 ModalPublicacion">
      <Form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={(e) => handleChange(e)}
            placeholder="Titulo"
            type="text"
            value={formInput?.titulo}
            name="titulo"
            maxLength="30"
          />
        </div>
        <div>
          <textarea
            onChange={(e) => handleChange(e)}
            placeholder="Descripcion"
            value={formInput?.contenido}
            type="text"
            name="contenido"
          />
        </div>
        {validationError === true && (
          <div className="ml-2 text-danger">
            <p>No se puede publicar, modifica los datos!</p>
          </div>
        )}
        {/* <div className="w-100 d-flex justify-content-center">
          {base64 && (
            <div>
              <img className="PublicacionFotoImg" src={base64} alt="" />
            </div>
          )}
        </div> */}
        <hr />
        <div className="d-flex justify-content-between ml-2 mr-2">
          <Button variant="outline-secondary" onClick={handleOpenModal}>
            {ImageIcon}
          </Button>
          <Button type="submit" variant="btn btn-outline-secondary">
            Publicar
          </Button>
        </div>
      </Form>
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
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
                    onChange={handleImageUpload}
                    multiple
                  />
                </Form.Group>
              </div>
              <div className="w-100 d-flex justify-content-center">
                {/* {base64 && (
                  <div>
                    <img className="PublicacionFotoImg" src={base64} alt="" />
                  </div>
                )} */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-100 d-flex justify-content-between">
              <Button variant="primary" onClick={handleImageUpload}>
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
