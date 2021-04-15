import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const UseHome = () => {
  const [input, setInput] = useState([]);

  useEffect(() => {
    Publicacion();
  }, []);
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
  const MapDataBase = input.map((date, i) => (
    <div className="CardDiv" key={i}>
      <Card className="CardPublica">
        <Card.Header>{date.titulo}</Card.Header>
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
