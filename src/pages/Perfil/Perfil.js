import UseHome from "../../hooks/UseHome";
import UseBusqueda from "../../hooks/UseBusqueda";
import BannerProfile from "../../components/Portada/Portada";
import PostComponent from "../../components/Post/Post";
import { useLocation } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

const Perfil = () => {
  const { PublicacionBusqueda, publicacionesBusqueda, usuarioBusqueda } = UseBusqueda();
  const { Delete, usuario, Usuario } = UseHome();
  const location = useLocation();
  let findUserById = location?.pathname.replace("/profile/", "");
  let _user = usuarioBusqueda;

  useEffect(async () => {
    if (findUserById === "/profile") {
      _user = await Usuario();
      PublicacionBusqueda({ idFindUser: _user?._id })
      console.log(_user);
      return;
    }
    PublicacionBusqueda({ idFindUser: findUserById })
  }, [])

  return (
    <div className="ColorDePerfil">
      <BannerProfile usuario={_user} />
      <div className="mt-5 w-100 d-flex flex-column-reverse">{
        publicacionesBusqueda.length === 0 &&
        publicacionesBusqueda.length === 0 &&
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Spinner
            animation="border"
            variant="primary" />
        </div> || publicacionesBusqueda.map((date, i) =>
          <PostComponent
            date={date}
            usuario={usuario}
            key={i}
            Delete={Delete} />)
      }
      </div>
    </div>
  );
};

export default Perfil;
