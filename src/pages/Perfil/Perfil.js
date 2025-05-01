import UsePerfil from "../../hooks/profile/usePerfil";
import BannerProfile from "../../components/profile/Portada/Portada";
import OptionsProfile from "../../components/profile/Options/Options";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Perfil.css";

const Perfil = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [options, setOptions] = useState("POSTS");

  const location = useLocation();
  const { GetUserAndPostLogged, PostsToComponent, GetUserAndPostById } =
    UsePerfil();
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
      <OptionsProfile option={options} setOption={setOptions} />
      <div className="mt-2 w-100 d-flex flex-column-reverse">
        {options === "POSTS" ? (
          <PostsToComponent postsList={posts} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
