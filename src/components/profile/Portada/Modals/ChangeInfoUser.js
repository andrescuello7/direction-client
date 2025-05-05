import "../Portada.css";

import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { SaveIcon } from "../../../../utils/svg";
import { exampleImage } from "../../../../utils/values";

const FormChangeUserModal = ({
  show,
  handleClose,
  HandleChange,
  handlePic,
  UpdateInfoUser,
  CurrentUser,
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
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Modal.Title className="mb-4 text-center">
              <b>Actualizar Datos</b>
              <div className="upload-wrapper">
                <label htmlFor="file-upload">
                  <div className="BoxPhoto">
                    <img
                      className="PortadaFoto"
                      src={CurrentUser?.imagen || exampleImage}
                      alt=""
                    />
                    <div className="diagonal"></div>
                  </div>
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
            </Modal.Title>
            <div className="pl-2">
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="instagram"
                  type="text"
                  value={input.instagram ?? CurrentUser?.instagram}
                  placeholder="Instagram"
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="whatsapp"
                  type="number"
                  value={input.celular ?? CurrentUser?.celular}
                  placeholder="Whatsapp"
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="facebook"
                  type="text"
                  value={input.facebook ?? CurrentUser?.facebook}
                  placeholder="Facebook"
                  onChange={HandleChange}
                />
              </div>
              <hr className="bg-secondary" />
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="usuario"
                  type="text"
                  value={input.usuario ?? CurrentUser?.usuario}
                  placeholder="Usuario"
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2">
                <textarea
                  className="form-control changeDescription"
                  name="descripcion"
                  type="text"
                  value={input.descripcion ?? CurrentUser?.descripcion}
                  placeholder="Descripcion"
                  onChange={HandleChange}
                />
              </div>
              <hr className="bg-secondary" />
            </div>
            <div className="w-100 d-flex justify-content-end">
              <Button
                variant="btn btn-outline-primary"
                className="mx-2 d-flex align-items-center"
                onClick={() => UpdateInfoUser({ input, handleClose })}
              >
                <SaveIcon />
                <b className="ml-2">Guardar</b>
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
