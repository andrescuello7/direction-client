import "../../profile/Portada/Portada.css";

import { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner, Image } from "react-bootstrap";
import { WhatsAppIcon, DeleteIconX } from "../../../utils/svg";
import { getAllUsers } from "../../../services/users.services";
import { sendMessageByWhatsApp } from "../../../services/users.services";
import { exampleImage } from "../../../utils/values";

const SendMessageModal = (props) => {
  const [users, setUsers] = useState([]);
  const [showAddColaborators, setShowAddColaborators] = useState(false);

  const [input, setInput] = useState({});
  const [userFindByName, setUserFindByName] = useState("");
  const [save, setSave] = useState(false);

  useEffect(() => {
    GetAllUsers(userFindByName);
  }, [userFindByName, setUserFindByName]);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value };
    setInput(changedInput);
  };

  const GetAllUsers = async (userFindByName) => {
    const data = await getAllUsers({ body: { UserName: userFindByName } });
    if (data) {
      setUsers(data);
    }
  };

  const SendMessageByWhatsApp = async () => {
    setSave(true);
    for (const user of input?.Colaborators) {
      await sendMessageByWhatsApp({
        numbers: user?.PhoneNumber,
        message: input?.Message,
      });
    }
    setSave(false);
  };

  return (
    <>
      <div>
        <Form>
          <Modal
            {...props}
            contentClassName="modalUpdateUser"
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className="d-flex w-100 align-items-end flex-column justify-content-center">
              <Modal.Title className="mb-4 text-start w-100 modalTitle">
                ENVIAR MENSAJE
              </Modal.Title>
              <div className="pl-2 w-100">
                <div className="d-flex mb-2  text-danger">
                  {showAddColaborators ? (
                    <input
                      className="form-control"
                      name="Colaborators"
                      type="text"
                      autoComplete="off"
                      value={input?.Colaborators?.UserName}
                      placeholder="Para..."
                      onClick={() => {
                        setShowAddColaborators(!showAddColaborators);
                      }}
                      onChange={(e) => setUserFindByName(e.target.value)}
                    />
                  ) : (
                    <div
                      className="form-control bg-dark border-dark text-secondary d-flex align-items-center pt-2 pb-2"
                      autoComplete="off"
                      value={input?.Colaborators?.UserName}
                      onClick={() => {
                        setShowAddColaborators(true);
                      }}
                    >
                      {input?.Colaborators?.length > 0 ? (
                        input?.Colaborators?.map((item, i) => (
                          <div
                            key={i}
                            className="mx-1 px-2 pt-1 pb-1 border-light rounded d-flex align-items-center border"
                          >
                            <div className="mx-2 text-light">
                              {item.UserName}
                            </div>
                            <div
                              onClick={() => {
                                setInput({
                                  ...input,
                                  Colaborators: input.Colaborators.filter(
                                    (colab) => colab._id !== item._id
                                  ),
                                });
                              }}
                            >
                              <DeleteIconX
                                className={"text-light"}
                                height={15}
                                width={15}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>{"Para"}</div>
                      )}
                    </div>
                  )}
                  <HandleColaborators
                    input={input}
                    setInput={setInput}
                    setShowAddColaborators={setShowAddColaborators}
                    showAddColaborators={showAddColaborators}
                    users={users}
                  />
                </div>
                <div className="d-flex mb-2">
                  <textarea
                    className="form-control changeDescription"
                    name="Message"
                    type="text"
                    placeholder="Mensaje"
                    onChange={HandleChange}
                  />
                </div>
              </div>
              <div className="w-100 ht-100 d-flex align-items-end justify-content-end">
                <Button
                  // TODO: ERROR in send message
                  disabled={true}
                  variant="btn btn-outline-success"
                  className="d-flex align-items-center justify-content-center"
                  onClick={SendMessageByWhatsApp}
                >
                  <WhatsAppIcon />
                  <b className="mx-2">Enviar</b>
                  {save && (
                    <Spinner
                      className="spinnerSize m-0"
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
    </>
  );
};

const HandleColaborators = ({
  showAddColaborators,
  input,
  users,
  setShowAddColaborators,
  setInput,
}) => {
  const saveUser = ({ user }) => {
    let usersList = input?.Colaborators ?? [];
    usersList.push(user);
    setInput({ ...input, Colaborators: usersList });
    setShowAddColaborators(false);
  };
  return (
    <div
      className={`${
        showAddColaborators ? "d-block" : "d-none"
      } statesAddColaboratosModal`}
    >
      {users.length > 0 &&
        users.map((user, i) => (
          <div
            key={i}
            onClick={() => {
              if (user.PhoneNumber) {
                saveUser({ user: user });
              }
            }}
            className={`${
              user?.PhoneNumber ? "text-primary" : "text-secondary"
            } px-2 pb-1 m-2 d-flex align-items-center`}
          >
            <Image
              className="rounded rounded-5"
              width={20}
              height={20}
              src={user?.Photo ?? exampleImage}
            />
            <div className="mx-2">{user?.UserName}</div>
          </div>
        ))}
    </div>
  );
};

export default SendMessageModal;
