import "./Publicacion.css";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { ImageIcon } from "../../../utils/svg";
import UsePosts from "../../../hooks/posts/usePosts";

const Publicacion = () => {
  const {
    handleChange,
    handleImageUpload,
    handleCloseModal,
    validationError,
    handlePic,
    handleSubmit,
    showModal,
    formInput,
    saveLoading
  } = UsePosts();

  return (
    <div className="p-2 ModalPublicacion">
      <Form className="content" onSubmit={handleSubmit}>
        <div>
          <textarea
            onChange={(e) => handleChange(e)}
            placeholder="Contenido aqui..."
            value={formInput?.contenido}
            type="text"
            name="Content"
          />
        </div>
        {validationError === true && (
          <div className="ml-2 text-danger">
            <p>No se puede publicar, modifica los datos!</p>
          </div>
        )}
        <div className="w-100 d-flex justify-content-start ml-3">
          {formInput?.Image && (
            <div>
              <img
                className="PublicacionFotoImg"
                src={formInput?.Image}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="optionButtons">
          <div className="upload-wrapper-profile">
            <label htmlFor="file-upload" className="custom-upload-button">
              <ImageIcon height={20} width={20} />{" "}
            </label>
            <input
              id="file-upload"
              name="img"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={(e) => handlePic(e)}
              className="hidden-file-input"
            />
          </div>
          <Button type="submit" variant="btn btn-outline-secondary">
            <b>Publicar</b>
            {saveLoading && (
              <Spinner
                className="spinnerSize"
                animation="border"
                variant="light"
              />
            )}
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
