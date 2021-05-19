import "./Publicacion.css";
import axios from "axios";
import { useState, useEffect } from "react";
import UseHome from "../../UseForm/UseHome";

const Publicacion = () => {
  const [input, setInput] = useState({});
  const token = localStorage.getItem("token");
  const { proveedor, usuario } = UseHome();

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value, "proveedor": proveedor , "perfil": usuario.imagen};
    setInput(changedInput);
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { "x-auth-token": token };
      await axios.post("publicacion", input, { headers });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-2 ModalPublicacion">
      <form onSubmit={HandleSubmit}>
        <div>
          <input
            onChange={(e) => HandleChange(e)}
            placeholder="Titulo..."
            type="text"
            name="titulo"
            maxLength="30"
          />
        </div>
        <div>
          <textarea
            onChange={(e) => HandleChange(e)}
            placeholder="Publicacion..."
            type="text"
            name="contenido"
          />
        </div>
        <hr />
        <div>
          <button type="submit ml-5" className="btn btn-primary">
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};
export default Publicacion;
