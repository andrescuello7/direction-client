import "../../profile/Portada/Portada.css";

import { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner, Image } from "react-bootstrap";
import { SaveIcon, BookIcon, DeleteIconX } from "../../../utils/svg";
import { getAllUsers } from "../../../services/users.services";
import { addProject } from "../../../services/projects.services";
import { exampleImage, STATES } from "../../../utils/values";

const NewProjectModal = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showStates, setShowStates] = useState(false);
  const [showAddColaborators, setShowAddColaborators] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const SaveProject = async () => {
    setSave(true);
    const body = {
      ...input,
      Colaborators: input?.Colaborators?.map((item) => item?._id),
      State: input?.State?.state,
    };
    await addProject({ body });
    setSave(false);
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="success"
        className="d-flex align-items-center"
        onClick={handleShow}
      >
        <BookIcon className={"text-light"} height={15} width={15} />
        <b className="mx-1">Nuevo</b>
      </Button>
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
            <Modal.Body className="d-flex w-100 align-items-end flex-column justify-content-between">
              <Modal.Title className="mb-4 text-start w-100 modalTitle">
                Crear Nuevo Proyecto
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
                      placeholder="Agregar colaboradores"
                      onClick={() => {
                        setShowAddColaborators(!showAddColaborators);
                        setShowStates(false);
                      }}
                      onChange={(e) => setUserFindByName(e.target.value)}
                    />
                  ) : (
                    <div
                      className="form-control bg-dark border-secondary text-secondary d-flex align-items-center pt-2 pb-2"
                      autoComplete="off"
                      value={input?.Colaborators?.UserName}
                      onClick={() => {
                        setShowAddColaborators(true);
                        setShowStates(false);
                      }}
                    >
                      {input?.Colaborators?.length > 0 ? (
                        input?.Colaborators?.map((item, i) => (
                          <div
                            key={i}
                            className="mx-1 px-2 pt-1 pb-1 border-secondary rounded d-flex align-items-center border"
                          >
                            <div className="mx-2">{item.UserName}</div>
                            <DeleteIconX height={15} width={15} />
                          </div>
                        ))
                      ) : (
                        <div>{"Agregar colaboradores"}</div>
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
                  <input
                    className="form-control"
                    name="State"
                    type="text"
                    placeholder="Estado inicial"
                    autoComplete="off"
                    value={input?.State?.name}
                    onClick={() => {
                      setShowAddColaborators(false);
                      setShowStates(!showStates);
                    }}
                  />
                  <HandleStates
                    input={input}
                    setInput={setInput}
                    setShowStates={setShowStates}
                    showStates={showStates}
                  />
                </div>
                <hr className="bg-secondary" />
                <div className="d-flex mb-2">
                  <input
                    className="form-control"
                    name="Title"
                    type="text"
                    placeholder="Nombre"
                    onChange={HandleChange}
                  />
                </div>
                <div className="d-flex mb-2">
                  <textarea
                    className="form-control changeDescription"
                    name="Description"
                    type="text"
                    placeholder="Descripcion"
                    onChange={HandleChange}
                  />
                </div>
              </div>
              <div className="w-100 ht-100 d-flex align-items-end justify-content-end">
                <Button
                  variant="btn btn-primary"
                  className="d-flex align-items-center justify-content-center"
                  onClick={SaveProject}
                >
                  <SaveIcon />
                  <b className="mx-2">Crear</b>
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
            onClick={() => saveUser({ user: user })}
            className="text-secondary px-2 pb-1 m-2 d-flex align-items-center"
          >
            <Image
              className="rounded rounded-5"
              width={20}
              height={20}
              src={user?.Photo ?? exampleImage}
            />
            <i className="mx-2">{user?.UserName}</i>
          </div>
        ))}
    </div>
  );
};

const HandleStates = ({ input, showStates, setInput, setShowStates }) => {
  return (
    <div className={`${showStates ? "d-block" : "d-none"} statesOptionModal`}>
      {STATES.map((state, i) => (
        <div
          key={i}
          onClick={() => {
            setInput({ ...input, State: state });
            setShowStates(false);
          }}
          className="text-secondary px-2 pb-1 m-2 d-flex align-items-center"
        >
          <div
            className={`${state.color} pointProject rounded rounded-5`}
          ></div>
          <i className="mx-2">{state.name}</i>
        </div>
      ))}
    </div>
  );
};

export default NewProjectModal;
