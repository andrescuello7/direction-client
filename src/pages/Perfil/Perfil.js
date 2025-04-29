import UsePerfil from "../../hooks/profile/usePerfil";
import BannerProfile from "../../components/profile/Portada/Portada";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Perfil = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const { GetUserAndPostLogged, PostsToComponent, GetUserAndPostById } = UsePerfil();
  let findUserById = location?.pathname?.replace("/profile/", "");

  useEffect(() => {
    findDateUser();
  }, []);

  const findDateUser = async () => {
    if (findUserById === "/profile") {
      const { posts, user } = await GetUserAndPostLogged();
      setPosts(posts);
      setUser(user);
      return;
    }
    const { posts, user } = await GetUserAndPostById({
      idFindUser: findUserById,
    });
    setPosts(posts);
    setUser(user);
  };

  return (
    <div className="ColorDePerfil">
      <BannerProfile usuario={user} whoami={findUserById === "/profile"} />
      <div className="mt-2 w-100 d-flex flex-column-reverse">
        {" "}
        <PostsToComponent postsList={posts} />
      </div>
    </div>
  );
};

export default Perfil;
