import "../../../assets/styles/modalPray.css";

import { Modal, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { MailboxPray } from "../../../utils/svg";
import { savePrayes } from "../../../services/prayes.services";

const FormPrayModal = ({ prayShow, handlePrayClose, usuario }) => {
  const [input, setInput] = useState({});
  const [save, setSave] = useState(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, To: usuario?._id, [name]: value };
    setInput(changedInput);
  };

  const SavePrayFromUser = async () => {
    setSave(true);
    await savePrayes({ body: input, idUser: usuario?._id });
    setSave(false);
    handlePrayClose();
  };

  return (
    <Form>
      <Modal
        contentClassName="qr-modal-container"
        show={prayShow}
        onHide={() => handlePrayClose()}
        centered
      >
        <Modal.Body>
          <div className="d-flex flex-column align-items-center text-white">
            <div className="mb-3 text-center">
              <MailboxPray height={30} width={30} />
              <h5 className="mt-2">Pedido de Oración</h5>
              <p className="text-secondary small">
                Escribí tu pedido y lo enviaremos en oración.
              </p>
            </div>

            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
              <Form.Control
                className="form-control-dark mb-3"
                name="From"
                type="text"
                placeholder="¿Para quién es? (opcional)"
                onChange={HandleChange}
              />
              <Form.Control
                className="form-control-dark mb-3"
                as="textarea"
                rows={4}
                name="Description"
                placeholder="¿Por qué querés que esté orando?"
                onChange={HandleChange}
              />
            </div>

            <button
              className="btn btn-primary mt-2 w-100 d-flex justify-content-center align-items-center"
              onClick={SavePrayFromUser}
              disabled={save}
            >
              <b>Enviar</b>
              {save && (
                <Spinner
                  className="ms-2 spinner-border-sm"
                  animation="border"
                  variant="light"
                />
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Form>
  );
};

export default FormPrayModal;
