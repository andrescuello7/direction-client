import "../../profile/Portada/Portada.css";

import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { SaveIcon } from "../../../utils/svg";
import { exampleImage } from "../../../utils/values";

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
            <Modal.Title className="mb-4 text-center modalTitle">
              Actualizar Datos
              <div className="upload-wrapper">
                <label htmlFor="file-upload">
                  <div className="BoxPhoto">
                    <img
                      className="PortadaFoto"
                      src={CurrentUser?.Photo || exampleImage}
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
                  name="Instagram"
                  type="text"
                  value={input.Instagram ?? CurrentUser?.Instagram}
                  placeholder="Instagram"
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2  text-danger">
                <input
                  className="form-control"
                  name="PhoneNumber"
                  type="number"
                  value={input.PhoneNumber ?? CurrentUser?.PhoneNumber}
                  placeholder="Whatsapp"
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="Facebook"
                  type="text"
                  value={input.Facebook ?? CurrentUser?.Facebook}
                  placeholder="Facebook"
                  onChange={HandleChange}
                />
              </div>
              <hr className="bg-secondary" />
              <div className="d-flex mb-2">
                <input
                  className="form-control"
                  name="UserName"
                  type="text"
                  value={input.UserName ?? CurrentUser?.UserName}
                  placeholder="Usuario"
                  onChange={HandleChange}
                />
              </div>
              <div className="d-flex mb-2">
                <textarea
                  className="form-control changeDescription"
                  name="Description"
                  type="text"
                  value={input.Description ?? CurrentUser?.Description}
                  placeholder="Descripcion"
                  onChange={HandleChange}
                />
              </div>
              <hr className="bg-secondary" />
            </div>
            <div className="w-100 d-flex justify-content-end">
              <Button
                variant="btn btn-primary"
                className="mx-2 d-flex align-items-center"
                onClick={() => UpdateInfoUser({ input, handleClose })}
              >
                <SaveIcon />
                <b className="mx-1">Guardar</b>
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
