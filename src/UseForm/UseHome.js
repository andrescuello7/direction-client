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
  const [proveedor, setProveedor] = useState("");
  const [admin, setAdmin] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
  const [identificador, setIdentificador] = useState("");
  const [identBusqueda, setIdentBusqueda] = useState("");
  const token = localStorage.getItem("token");
  const exampleImage =
    "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg";

  useEffect(() => {
    Usuario();
    Publicacion();
  }, []);

  useEffect(() => {
    if (identificador.length !== undefined) {
      Delete();
    }
  }, [identificador]);

  if (identBusqueda.length !== 0) {
    localStorage.setItem("identBusqueda", identBusqueda);
    window.location.href = "/buscar";
  }

  //Consulta el usuario activo actualmente
  const Usuario = async () => {
    try {
      const headers = { "x-auth-token": token };
      const { data } = await axios.get("auth", {
        headers,
      });
      setUsuario(data.usuario);
      setAdmin(data.usuario.estado);
      setProveedor(data.usuario.usuario);
    } catch (error) {
      console.log(error);
    }
  };
  //Consulta de Publicaiones

  const Publicacion = async () => {
    try {
      const { data } = await axios.get("publicacion");
      setPublicaciones(data);
    } catch (error) {
      console.log(error);
    }
  };
  //Funcion de Eliminar Publicacion
  const Delete = async () => {
    try {
      const headers = { "x-auth-token": token };
      await axios.delete(`publicacion/${identificador}`, { headers });
      window.location.href = "/";
    } catch (error) {
      console.log("Error en eliminar datos");
    }
  };

  //Aqui se hacemos el map de todos las publicaciones
  console.log(admin);
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
            <div
              className="datosTitular"
              onClick={() => setIdentBusqueda(date.creador)}
            >
              <div>
                <img className="PublicacionFoto" src={date.perfil || exampleImage} alt="" />
              </div>
              <div>{date.proveedor}</div>
            </div>
            {(date.creador === usuario._id && (
              <div>
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
            )) ||
              (admin === "admin" && (
                <div>
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
              ))}
          </div>
          <div className="d-flex flex-column">
            <div className="m-2 descripcionPublicacion">{date.titulo}</div>
            <div className="ml-2">{date.contenido}</div>
          </div>
        </Card>
      </div>
    ));

  //Aqui hacemos el map y compara con el id del producto y es del usuario

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
                <div className="datosTitular">
                  <div>
                    <img className="PublicacionFoto" src={date.perfil} alt="" />
                  </div>
                  <div>{date.proveedor}</div>
                </div>
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
              <div className="d-flex flex-column">
                <div className="m-2 descripcionPublicacion">{date.titulo}</div>
                <div className="ml-2">{date.contenido}</div>
              </div>
            </Card>
          </div>
        )}
      </div>
    ));
  return {
    MapComparatePublic,
    publicaciones,
    identBusqueda,
    MapDataBase,
    proveedor,
    usuario,
  };
};
export default UseHome;
