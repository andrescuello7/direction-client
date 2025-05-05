import "../Portada.css";

import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { ImageIcon } from "../../../../utils/svg";

const FormChangeUserModal = ({
  show,
  handleClose,
  HandleChange,
  handlePic,
  UpdateInfoUser,
  input,
  saveLoading,
}) => {
  return (
    <div>
      <Form>
        <Modal
          contentClassName="modalUpdateUser"
          show={show}
          onHide={handleClose}
        >
          <Modal.Body>
            <Modal.Title className="mb-4 text-center">
              <b>Actualizar Datos</b>
            </Modal.Title>
            <div className="pl-2">
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="usuario"
                  type="text"
                  placeholder="Nombre de Usuario"
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="facebook"
                  type="text"
                  placeholder="Facebook"
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="celular"
                  type="number"
                  placeholder="Celular"
                  onChange={HandleChange}
                />
              </div>
              <div className="upload-wrapper">
                <label htmlFor="file-upload" className="custom-upload-button">
                  <ImageIcon height={20} width={20} />{" "}
                  <div className="mx-2">Subir Imagen</div>
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
            </div>
            <div className="w-100 d-flex justify-content-end">
              <Button
                className="mx-2 btn btn-primary"
                onClick={() => UpdateInfoUser({ input, handleClose })}
              >
                <b>Guardar Cambios</b>
                {saveLoading && (
                  <Spinner
                    className="spinnerSize"
                    animation="border"
                    variant="light"
                  />
                )}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Form>
    </div>
  );
};

export default FormChangeUserModal;
