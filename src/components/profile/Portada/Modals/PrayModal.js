import "../Portada.css";

import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { MailboxPray } from "../../../../utils/svg";
import { savePrayes } from "../../../../services/prayes.services";

const FormPrayModal = ({ prayShow, handlePrayClose, usuario }) => {
  const [input, setInput] = useState({});
  const [save, setSave] = useState(false);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, to: usuario?._id, [name]: value };
    setInput(changedInput);
  };

  const SavePrayFromUser = async () => {
    setSave(true);
    await savePrayes({ body: input, idUser: usuario?._id });
    setSave(false);
    handlePrayClose();
  };

  return (
    <div>
      <Form>
        <Modal
          contentClassName="modalUpdateUser"
          show={prayShow}
          onHide={() => handlePrayClose()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Modal.Title>
              <div className="w-100 d-flex mb-3 justify-content-center">
                <MailboxPray height={30} width={30} />
                <b className="ml-2">Pedido de Oracion</b>
              </div>
              <hr className="bg-secondary" />
              <div className="ml-2 mt-3 mb-2 d-flex justify-content-between">
                <b>{usuario?.usuario}</b>
                <div className="w-25 d-flex justify-content-end">
                  <Button
                    className="mx-2 btn btn-success"
                    onClick={SavePrayFromUser}
                  >
                    <b>Enviar</b>
                    {save && (
                      <Spinner
                        className="spinnerSize"
                        animation="border"
                        variant="light"
                      />
                    )}
                  </Button>
                </div>
              </div>
            </Modal.Title>
            <div className="d-flex flex-column">
              <textarea
                className="form-control prayFormInput m-0 mb-3 mt-3"
                name="description"
                type="text"
                placeholder="Porque queres que este orando?"
                onChange={HandleChange}
              />
              <input
                className="form-control prayFormInput"
                name="from"
                type="text"
                placeholder="De parte de quien? (Opcional)"
                onChange={HandleChange}
              />
            </div>
          </Modal.Body>
        </Modal>
      </Form>
    </div>
  );
};

export default FormPrayModal;
