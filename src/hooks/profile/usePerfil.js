import UsePosts from "../posts/usePosts";
import { getPostByToken } from "../../services/posts.services";
import { getUserByToken } from "../../services/auth.services";
import PostComponent from "../../components/posts/Post";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import {
  REACT_APP_API_CLOUDINARY,
  REACT_APP_API_CLOUDINARY_KEY,
  exampleImage,
} from "../../utils/values";

import { usePostContext } from "../../context/PostContext";

const UsePerfil = () => {
  // Context Post
  const token = localStorage.getItem("token");
  const { currentUser } = usePostContext();
  const { addCommentToPost } = UsePosts();

  // Codigo de imagenes
  const handlePic = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", REACT_APP_API_CLOUDINARY_KEY);

    fetch(`${REACT_APP_API_CLOUDINARY}/v1_1/five-drive/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        onChangeImg(res?.url);
      });
  };

  //Codigo para foto base 64
  const onChangeImg = async (photoUrl) => {
    try {
      await axios
        .put(
          `usuario/${currentUser._id}`,
          { imagen: photoUrl },
          { headers: { "x-auth-token": token } }
        )
        .then((response) => console.log(response.data));

      // TODO: error in reload change this
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error in change dates of user", error);
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
    onChangeImg,
    exampleImage,
    handlePic,
    token,
  };
};
export default UsePerfil;
