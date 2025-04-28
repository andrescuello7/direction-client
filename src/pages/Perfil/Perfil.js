import UseHome from "../../hooks/home/useHome";
import UseBusqueda from "../../hooks/search/useSearch";
import BannerProfile from "../../components/profile/Portada/Portada";
import PostComponent from "../../components/posts/Post";
import { useLocation } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

const Perfil = () => {
  const { PublicacionBusqueda, publicacionesBusqueda, usuarioBusqueda } = UseBusqueda();
  const { usuario, fetchUser } = UseHome();
  const location = useLocation();
  let findUserById = location?.pathname.replace("/profile/", "");
  let userFindById = usuarioBusqueda;

  useEffect(() => {
    findDateUser()
  }, [])

  const findDateUser = async () => {
    if (findUserById === "/profile") {
      userFindById = await fetchUser();
      PublicacionBusqueda({ idFindUser: userFindById?._id })
      return;
    }
    PublicacionBusqueda({ idFindUser: findUserById })
  }

  return (
    <div className="ColorDePerfil">
      <BannerProfile usuario={userFindById} whoami={findUserById === "/profile"} />
      <div className="mt-5 w-100 d-flex flex-column-reverse"> {
        publicacionesBusqueda.length > 0 &&
        publicacionesBusqueda.map((date, i) =>
          <PostComponent
            date={date}
            usuario={usuario}
            key={i} />) ||
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Spinner
            animation="border"
            variant="primary" />
        </div>
      }
      </div>
    </div>
  );
};

export default Perfil;
