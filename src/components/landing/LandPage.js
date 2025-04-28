import UseHome from "../../hooks/home/useHome";
import Publicacion from "./Publicacion/Publicacion";

const LandPage = () => {
  const { PostsToComponent } = UseHome();
  const token = localStorage.getItem("token");

  return (
    <div className="body">
      <div className="mx-2">
        {token && (
          <div className="w-100 d-flex justify-content-center">
            <Publicacion />
          </div>
        )}
        <div className="w-100 d-flex flex-column-reverse">
          <PostsToComponent />
        </div>
      </div>
    </div>
  );
};
export default LandPage;
