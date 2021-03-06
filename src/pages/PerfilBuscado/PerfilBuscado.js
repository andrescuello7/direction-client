import UseBusqueda from "../../UseForm/UseBusqueda";
import PortadaBuscada from "../../components/PortadaBuscada/PortadaBuscada";

const Perfil = () => {
  const { MapDataBaseBuscado } = UseBusqueda();
  return (
    <div className="ColorDePerfil">
      <div>
        <PortadaBuscada />
      </div>
      <div>{MapDataBaseBuscado}</div>
    </div>
  );
};
export default Perfil;
