import { useState } from "react";
import axios from "axios";

const UseBusqueda = () => {
  const [usuarioBusqueda, setUsuarioBusqueda] = useState([]);
  const [publicacionesBusqueda, setPublicacionesBusqueda] = useState([]);

  //Consulta el usuario activo actualmente
  // const UsuarioBusqueda = async ({idFindUser}) => {
  //   try {
  //     const userToFindById = await axios.get(`publicacion/${idFindUser}`);
  //     setUsuarioBusqueda(userToFindById?.data[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Consulta de Publicaiones
  const PublicacionBusqueda = async ({idFindUser}) => {
    try {
      const postsToUserFindById = await axios.get(`publicacion/usuario/${idFindUser}`);
      const userToFindById = await axios.get(`publicacion/${idFindUser}`);
      setPublicacionesBusqueda(postsToUserFindById?.data);
      setUsuarioBusqueda(userToFindById?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return { 
    publicacionesBusqueda,
    PublicacionBusqueda,
    usuarioBusqueda 
  };
};
export default UseBusqueda;
