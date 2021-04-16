import axios from "axios";
import { useState, useEffect } from "react";

const Publicacion = () => {
  const [input, setInput] = useState({});

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value };
    setInput(changedInput);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("home", input);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card p-2 PuclicarEmail">
      <form onSubmit={HandleSubmit}>
        <div>
          <input
            onChange={(e) => HandleChange(e)}
            className="w-100 form-control"
            placeholder="Titulo..."
            type="text"
            name="titulo"
          />
        </div>
        <div>
          <input
            onChange={(e) => HandleChange(e)}
            className="w-100 form-control"
            placeholder="Publicaion..."
            type="text"
            name="contenido"
          />
        </div>
        <hr />
        <div>
          <button type="submit" className="btn btn-primary">
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};
export default Publicacion;
