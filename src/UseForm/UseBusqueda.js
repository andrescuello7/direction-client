import { useState, useEffect } from "react";
import axios from "axios";
import { Card, NavDropdown, Spinner, Modal, Button } from "react-bootstrap";
import UseHome from "./UseHome";

const UseBusqueda = () => {
  //UseStates de Aplicacion
  const [usuarioBusqueda, setUsuarioBusqueda] = useState([]);
  const [publicacionesBusqueda, setPublicacionesBusqueda] = useState([]);

  useEffect(() => {
    if (usuarioBusqueda.length !== undefined) {
      UsuarioBusqueda();
    }
    PublicacionBusqueda();
  }, []);

  //Consulta el usuario activo actualmente
  const UsuarioBusqueda = async () => {
    try {
      const { data } = await axios.get(`publicacion/60789f90f033f0395e89d383`);
      setUsuarioBusqueda(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  
  //Consulta de Publicaiones

  const PublicacionBusqueda = async () => {
    try {
      const { data } = await axios.get(`publicacion/usuario/60789f90f033f0395e89d383`);
      setPublicacionesBusqueda(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Aqui se hacemos el map de todas las publicaciones del Usuario buscado

  const MapDataBaseBuscado =
    (publicacionesBusqueda.length === 0 && (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    )) ||
    publicacionesBusqueda.map((date, i) => (
      <div className="CardDiv" key={i}>
        <Card className="CardPublica">
          <div className="d-flex justify-content-between">
            <div className="datosTitular">
              <div>
                <img className="PublicacionFoto" src={date.perfil} alt="" />
              </div>
              <div>{date.proveedor}</div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="m-2 descripcionPublicacion">{date.titulo}</div>
            <div className="ml-2">{date.contenido}</div>
          </div>
        </Card>
      </div>
    ));
  return {
    MapDataBaseBuscado,
    usuarioBusqueda
  };
};
export default UseBusqueda;
