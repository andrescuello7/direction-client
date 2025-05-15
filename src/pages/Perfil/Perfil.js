import UsePerfil from "../../hooks/profile/usePerfil";
import BannerProfile from "../../components/profile/Portada/Portada";
import NewProjectModal from "../../components/common/Modals/NewProjectModal";
import OptionsProfile from "../../components/common/Options/OptionsTabProfile/Options";
import { useLocation } from "react-router-dom";
import { SearchIcon } from "../../utils/svg";
import { useEffect, useState } from "react";
import "./Perfil.css";

const Perfil = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [prayes, setPrayes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [options, setOptions] = useState("POSTS");

  const location = useLocation();
  let findUserById = location?.pathname?.replace("/profile/", "");

  const {
    PrayToComponent,
    PostsToComponent,
    ProjectsToComponent,
    GetUserAndPostLogged,
    GetUserAndPostById,
    currentUser,
  } = UsePerfil();

  useEffect(() => {
    findDateUser();
  }, []);

  const findDateUser = async () => {
    if (findUserById === "/profile") {
      if (currentUser !== null) setUser(currentUser);
      const { posts, user, prayes, projects } = await GetUserAndPostLogged();
      setUser(user);
      setPosts(posts);
      setPrayes(prayes);
      setProjects(projects);
      return;
    }
    const { posts, user, projects } = await GetUserAndPostById({
      idFindUser: findUserById,
    });
    setUser(user);
    setPosts(posts);
    setProjects(projects);
  };

  const PostsComponents = ({ options }) => {
    switch (options) {
      case "PRAY":
        return <PrayToComponent prayesList={prayes} />;
      case "PROJECT":
        return <ProjectsToComponent list={projects} />;
      default:
        return <PostsToComponent postsList={posts} />;
    }
  };

  const OptionsDesing = ({}) => {
    return (
      options === "PROJECT" && (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
          <div className="optionsProjects mt-5">
            <div className="searchIcon">
              <div className="form-control w-100 inputSearch">
                <SearchIcon height={20} width={20} />
                <input
                  autoComplete="off"
                  className="mx-3 w-100"
                  placeholder="Buscar..."
                />
              </div>
            </div>
            <NewProjectModal />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="ColorDePerfil">
      <OptionsProfile option={options} setOption={setOptions} />
      <BannerProfile usuario={user} whoami={findUserById === "/profile"} />
      <OptionsDesing options={options} />
      <div className="mt-2 w-100 d-flex flex-column-reverse">
        <PostsComponents options={options} />
      </div>
    </div>
  );
};

export default Perfil;
