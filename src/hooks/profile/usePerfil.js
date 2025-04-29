import UsePosts from "../posts/usePosts";
import { getPostByToken } from "../../services/posts.services";
import { getUserByToken } from "../../services/auth.services";
import { updateInfoOfAccountByToken } from "../../services/users.services";
import { uploadImage } from "../../services/imgs.services";
import PostComponent from "../../components/posts/Post";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { exampleImage } from "../../utils/values";

import { usePostContext } from "../../context/PostContext";

const UsePerfil = () => {
  // Context Post
  const token = localStorage.getItem("token");
  const { currentUser } = usePostContext();
  const { addCommentToPost } = UsePosts();

  // Codigo de imagenes
  const handlePic = async (e) => {
    const url = await uploadImage({ event: e });
    await updateInfoOfAccountByToken({ body: { imagen: url } });
    
    // TODO: reload bad
    window.location.href = "/profile";
  };

  const UpdateInfoUser = async ({ input, handleClose }) => {
    try {
      await updateInfoOfAccountByToken({ body: input });
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
      const userLogged = await getUserByToken();

      // TODO: error in save posts in Context
      // addPost(postOfUserLogged);
      return {
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
    return postsList.length === 0 ? (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    ) : (
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

  return {
    GetUserAndPostById,
    PostsToComponent,
    GetUserAndPostLogged,
    UpdateInfoUser,
    exampleImage,
    handlePic,
    token,
  };
};
export default UsePerfil;
