import React from "react";
import Axios from "axios";
import CardPeli from "./CardPeli";
import { useState, useEffect } from "react";

export default function Api_Pelis() {
  const [peli, setPeli] = useState([]);
  const [input, setInput] = useState("");
  const [ouput, setOuput] = useState("harry");
  useEffect(() => {
    axiosPeli();
    setOuput(ouput);
  }, [ouput]);

  const axiosPeli = async () => {
    try {
      const datos = await Axios.get(
        `http://www.omdbapi.com/?apikey=446f8c0f&s=${ouput}`
      );
      setPeli(datos.data.Search);
    } catch (error) {
      console.log(error);
    }
  };
  const guardar = (e) => {
    setInput(e.target.value);
  };
  const subir = () => {
    setOuput(input);
  };
  const mapKey = peli.map((peli, i) => (
    <CardPeli Title={peli.Title} Imagen={peli.Poster} />
  ));
  return (
    <div>
      <div className="busquedaInput">
        <div className="pod">
          <input
            className="pad"
            type="text"
            placeholder="Pelicula..."
            onChange={guardar}
          />
          <button className="btn btn-outline-primary" onClick={subir}>
            Buscar
          </button>
        </div>
      </div>
      <div className="CardKeyPeli">{mapKey}</div>
    </div>
  );
}
