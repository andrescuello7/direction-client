import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllPosts } from "../../services/posts.services";
import { getUserByToken } from "../../services/auth.services";
import PostComponent from "../../components/posts/Post";
import { usePostContext } from "../../context/PostContext";

const useHome = () => {
  //Context Post
  const {
    posts,
    currentUser,
    updatePosts,
    addPost,
    updateUser,
  } = usePostContext();

  const [identBusqueda, setIdentBusqueda] = useState("");
  const [publicacionActual, setPublicacionActual] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  useEffect(() => {
    if (identBusqueda.length !== 0) {
      localStorage.setItem("identBusqueda", identBusqueda);
      window.location.href = `/profile/${identBusqueda}`;
    }
  }, [identBusqueda]);

  const fetchUser = async () => {
    try {
      const user = await getUserByToken();
      updateUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      addPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  const PostsToComponent = () => {
    return posts.length === 0 ? (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    ) : (
      posts[0].map((date, i) => (
        <PostComponent
          date={date}
          usuario={currentUser}
          key={i}
          FindUserById={setIdentBusqueda}
        />
      ))
    );
  };

  return {
    setPublicacionActual,
    publicacionActual,
    posts,
    identBusqueda,
    fetchPosts,
    fetchUser,
    PostsToComponent,
    currentUser,
  };
};

export default useHome;
