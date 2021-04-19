import { useState, useEffect } from "react";
import axios from "axios";
import { Card, NavDropdown, Spinner, Modal, Button } from "react-bootstrap";

const UseHome = () => {
  //UseStates de modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //UseStates de Aplicacion
  const [usuario, setUsuario] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [identificador, setIdentificador] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    Publicacion();
    Usuario();
    if (identificador.length !== undefined) {
      Delete();
    }
  }, [identificador]);

  //Consulta el usuario activo actualmente

  const Usuario = async () => {
    try {
      const headers = { "x-auth-token": token };
      const { data } = await axios.get("auth", {
        headers,
      });
      setUsuario(data.usuario);
    } catch (error) {
      console.log(error);
    }
  };

  //Consulta de Publicaiones

  const Publicacion = async () => {
    try {
      const { data } = await axios.get("home");
      setPublicaciones(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion de Eliminar Publicacion

  const Delete = async () => {
    try {
      const headers = { "x-auth-token": token };
      await axios.delete(`home/${identificador}`, { headers });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  //Aqui se hacemos el map de todos las publicaciones

  const MapDataBase =
    (publicaciones.length === 0 && (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    )) ||
    publicaciones.map((date, i) => (
      <div className="CardDiv" key={i}>
        <Card className="CardPublica">
          <div className="d-flex justify-content-between">
            <Card.Header className="descripcionPublicacion">{date.titulo}</Card.Header>
            {date.creador === usuario._id && (
              <div>
                <NavDropdown title="Opciones" id="basic-nav-dropdown">
                  <NavDropdown.Item>Editar</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setIdentificador(date._id)}>
                    Eliminar
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </div>
          <Card.Body>
            <div>
              <i>{date.contenido}</i>
            </div>
          </Card.Body>
        </Card>
      </div>
    ));

  //Aqui hacemos el map y compara con el id del producto y el del usuario

  const MapComparatePublic =
    (publicaciones.length === 0 && (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    )) ||
    publicaciones.map((date, i) => (
      <div>
        {date.creador === usuario._id && (
          <div className="CardDiv" key={i}>
            <Card className="CardPublica">
              <div className="d-flex justify-content-between">
                <Card.Header className="descripcionPublicacion">{date.titulo}</Card.Header>
                <div>
                  <NavDropdown title="Opciones" id="basic-nav-dropdown">
                    <NavDropdown.Item>Editar</NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => setIdentificador(date._id)}
                    >
                      Eliminar
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div>
              <Card.Body>
                <Card.Text>{date.contenido}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    ));

  return {
    MapDataBase,
    MapComparatePublic,
    usuario,
    publicaciones,
  };
};
export default UseHome;
