import UseHome from "../../UseForm/UseHome";
import Publicacion from "../Publicacion/Publicacion";

const LandPage = () => {
  //Declaracion de datos traidos de Hook Home y Token de LocalStorage
  const { MapDataBase } = UseHome();
  const token = localStorage.getItem("token");

  return (
    <div className="body">
      <div>
        {token &&<div className="w-100 d-flex justify-content-center">
          <Publicacion />
        </div>}
        <div className="w-100 d-flex flex-column-reverse">{MapDataBase}</div>
      </div>
    </div>
  );
};
export default LandPage;
