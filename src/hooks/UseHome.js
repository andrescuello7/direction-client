import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import PostComponent from "../components/Post/Post";

const UseHome = () => {
  //UseStates de modal
  const token = localStorage.getItem("token");
  const [publicacionActual, setPublicacionActual] = useState(false);
  
  //UseStates de Aplicacion
  const [usuario, setUsuario] = useState([]);
  const [proveedor, setProveedor] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
  const [identBusqueda, setIdentBusqueda] = useState("");

  useEffect(() => {
    Usuario();
    Publicacion();
  }, []);

  if (identBusqueda.length !== 0) {
    localStorage.setItem("identBusqueda", identBusqueda);
    window.location.href = `/profile/${identBusqueda}`;
  }

  //Consulta el usuario activo actualmente
  const Usuario = async () => {
    try {
      const headers = { "x-auth-token": token };
      const { data } = await axios.get("auth", { headers });
      setUsuario(data.usuario);
      setProveedor(data.usuario.usuario);
      return data?.usuario;
    } catch (error) {
      console.log(error);
      return [];
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
  const Delete = async ({idPost}) => {
    try {
      const headers = { "x-auth-token": token };
      await axios.delete(`publicacion/${idPost}`, { headers });
      Publicacion();
    } catch (error) {
      console.log("Error en eliminar datos");
    }
  };

  //Aqui se hacemos el map de todos las publicaciones
  const MapDataBase =
    (publicaciones.length === 0 && (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner
          animation="border"
          variant="primary" />
      </div>
    )) || publicaciones.map((date, i) =>
      <PostComponent
        date={date}
        usuario={usuario}
        key={i}
        FindUserById={setIdentBusqueda} />);


  return {
    Delete,
    setPublicacionActual,
    publicacionActual,
    publicaciones,
    identBusqueda,
    Publicacion,
    Usuario,
    MapDataBase,
    proveedor,
    usuario,
  };
};
export default UseHome;
