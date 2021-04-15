import { useState, useEffect } from "react";
import axios from "axios";
import { Card, NavDropdown, Spinner } from "react-bootstrap";

const UseHome = () => {
  const [input, setInput] = useState([]);
  const [identificador, setIdentificador] = useState("");

  useEffect(() => {
    Publicacion();
    if (identificador.length !== undefined) {
      Delete();
    }
  }, [identificador]);
  const Publicacion = async () => {
    try {
      const { data } = await axios.get(
        "https://vlog-conteo-app.herokuapp.com/api/home"
      );
      setInput(data);
    } catch (error) {
      console.log(error);
    }
  };
  const Delete = async () => {
    try {
      await axios.delete(
        `https://vlog-conteo-app.herokuapp.com/api/home/${identificador}`
      );
      console.log("Borrado");
    } catch (error) {
      console.log(error);
    }
  };
  const MapDataBase =
    (input.length === 0 && (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    )) ||
    input.map((date, i) => (
      <div className="CardDiv" key={i}>
        <Card className="CardPublica">
          <div className="d-flex justify-content-between">
            <Card.Header>{date.titulo}</Card.Header>
            <div>
              <NavDropdown title="Opciones" id="basic-nav-dropdown">
                <NavDropdown.Item>Editar</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setIdentificador(date._id)}>
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
    ));
  return {
    MapDataBase,
    input,
  };
};
export default UseHome;
