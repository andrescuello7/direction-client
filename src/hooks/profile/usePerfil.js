import UsePosts from "../posts/usePosts";
import { getPostByToken } from "../../services/posts.services";
import { getUserByToken } from "../../services/auth.services";
import { getAllPrayes } from "../../services/prayes.services";
import {
  getAllProjects,
  getProjectsByUserId,
} from "../../services/projects.services";
import { updateInfoOfAccountByToken } from "../../services/users.services";
import { uploadImage } from "../../services/imgs.services";
import PostComponent from "../../components/posts/Post";
import PrayComponent from "../../components/posts/Pray";
import ProjectComponent from "../../components/posts/Project";

import { exampleImage } from "../../utils/values";
import { usePostContext } from "../../context/PostContext";
import { useState } from "react";

import axios from "axios";

const UsePerfil = () => {
  // Context Post
  const [saveLoading, setSaveLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { currentUser } = usePostContext();
  const { addCommentToPost } = UsePosts();

  // Codigo de imagenes
  const handlePic = async (e) => {
    setSaveLoading(true);
    const url = await uploadImage({ event: e });
    await updateInfoOfAccountByToken({ body: { imagen: url } });
    setSaveLoading(false);

    // TODO: reload bad
    window.location.href = "/profile";
  };

  const UpdateInfoUser = async ({ input, handleClose }) => {
    try {
      setSaveLoading(true);
      await updateInfoOfAccountByToken({ body: input });
      setSaveLoading(false);
      handleClose();

      // TODO: reload bad
      window.location.href = "/profile";
    } catch (error) {
      console.log(error);
    }
  };

  const GetUserAndPostLogged = async () => {
    try {
      const postOfUserLogged = await getPostByToken();
      const prayesOfUser = await getAllPrayes();
      const getProjects = await getAllProjects();
      const userLogged = await getUserByToken();

      // TODO: error in save posts in Context
      // addPost(postOfUserLogged);

      return {
        prayes: prayesOfUser,
        projects: getProjects,
        posts: postOfUserLogged,
        user: userLogged,
      };
    } catch (error) {
      console.log(error);
      return {
        posts: [],
        user: {},
      };
    }
  };

  const GetUserAndPostById = async ({ idFindUser }) => {
    try {
      const getProjects = await getProjectsByUserId({ idUser: idFindUser });
      const postsToUserFindById = await axios.get(`posts/user/${idFindUser}`);
      const userToFindById = await axios.get(`posts/${idFindUser}`);
      return {
        projects: getProjects,
        posts: postsToUserFindById?.data,
        user: userToFindById?.data[0],
      };
    } catch (error) {
      console.log(error);
      return {
        posts: [],
        user: {},
      };
    }
  };

  const PostsToComponent = ({ postsList }) => {
    return (
      postsList.length > 0 &&
      postsList.map((date, i) => (
        <PostComponent
          date={date}
          usuario={currentUser}
          key={i}
          AddCommentToPost={addCommentToPost}
        />
      ))
    );
  };

  const PrayToComponent = ({ prayesList }) => {
    return (
      prayesList.length > 0 &&
      prayesList.map((date, i) => <PrayComponent date={date} key={i} />)
    );
  };

  const ProjectsToComponent = ({ list }) => {
    return (
      list.length > 0 &&
      list.map((date, i) => <ProjectComponent date={date} key={i} />)
    );
  };

  return {
    saveLoading,
    currentUser,
    GetUserAndPostById,
    ProjectsToComponent,
    PostsToComponent,
    PrayToComponent,
    GetUserAndPostLogged,
    UpdateInfoUser,
    exampleImage,
    handlePic,
    token,
  };
};
export default UsePerfil;
