import UsePosts from "../posts/usePosts";
import { getPostByToken } from "../../services/posts.services";
import { getUserByToken } from "../../services/auth.services";
import { getAllPrayes } from "../../services/prayes.services";
import { updateInfoOfAccountByToken } from "../../services/users.services";
import { uploadImage } from "../../services/imgs.services";
import PostComponent from "../../components/posts/Post";
import PrayComponent from "../../components/posts/Pray";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { exampleImage } from "../../utils/values";

import { usePostContext } from "../../context/PostContext";
import { useState } from "react";

const UsePerfil = () => {
  // Context Post
  const [saveLoading, setSaveLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { currentUser } = usePostContext();
  const { addCommentToPost } = UsePosts();

  // Codigo de imagenes
  const handlePic = async (e) => {
    setSaveLoading(true)
    const url = await uploadImage({ event: e });
    await updateInfoOfAccountByToken({ body: { imagen: url } });
    setSaveLoading(false)
    
    // TODO: reload bad
    window.location.href = "/profile";
  };

  const UpdateInfoUser = async ({ input, handleClose }) => {
    try {
      setSaveLoading(true)
      await updateInfoOfAccountByToken({ body: input });
      setSaveLoading(false)
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
      const userLogged = await getUserByToken();

      // TODO: error in save posts in Context
      // addPost(postOfUserLogged);
      
      return {
        prayes: prayesOfUser,
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
      const postsToUserFindById = await axios.get(
        `publicacion/usuario/${idFindUser}`
      );
      const userToFindById = await axios.get(`publicacion/${idFindUser}`);
      return {
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
    return postsList.length > 0 && (
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
    return prayesList.length > 0 && (
      prayesList.map((date, i) => (
        <PrayComponent
          date={date}
          key={i}
        />
      ))
    );
  };

  return {
    saveLoading,
    currentUser,
    GetUserAndPostById,
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
