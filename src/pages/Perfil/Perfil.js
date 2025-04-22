import UseHome from "../../hooks/UseHome";
import BannerProfile from "../../components/Portada/Portada";

const Perfil = () => {
  const { MapComparatePublic } = UseHome();

  return (
    <div className="ColorDePerfil">
      <div>
        <BannerProfile />
      </div>
      <div className="w-100 d-flex flex-column-reverse">{MapComparatePublic}</div>
    </div>
  );
};
export default Perfil;
