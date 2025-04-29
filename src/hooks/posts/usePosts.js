import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  getAllPosts,
  savePost,
  saveCommentInPost,
} from "../../services/posts.services";
import { uploadImage } from "../../services/imgs.services";
import { usePostContext } from "../../context/PostContext";
import { getUserByToken } from "../../services/auth.services";
import PostComponent from "../../components/posts/Post";

const usePosts = () => {
  // Context Post
  const { posts, addPost, updateUser, currentUser } = usePostContext();

  // States
  const [formInput, setFormInput] = useState({
    titulo: "",
    contenido: "",
    imagenPublicada: "",
  });

  const [identBusqueda, setIdentBusqueda] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [publicacionActual, setPublicacionActual] = useState(false);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

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

  // Codigo de imagenes
  const handlePic = async (e) => {
    const url = await uploadImage({ event: e });
    const updatedInput = { ...formInput, imagenPublicada: url };
    setFormInput(updatedInput);
  };

  const resetInputOnClick = (event) => {
    event.target.value = "";
  };

  const handleConfirmUpload = () => {
    handleCloseModal();
  };

  // Form Functions
  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedInput = {
      ...formInput,
      [name]: value,
      perfil: currentUser?.imagen,
      proveedor: currentUser?.usuario,
    };

    setFormInput(updatedInput);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await savePost({ body: formInput });
      fetchPosts();
      setFormInput({ titulo: "", contenido: "", imagenPublicada: "" });
    } catch (error) {
      console.error(error);
      setValidationError(true);
    }
  };

  const addCommentToPost = async ({ event, post, userId }) => {
    if (event.key === "Enter") {
      try {
        await saveCommentInPost({
          body: {
            creador: userId,
            text: event?.target?.value,
          },
          idPost: post?._id,
        });
        fetchPosts();
      } catch (error) {
        console.error("Error adding comment to post", error);
      }
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
          AddCommentToPost={addCommentToPost}
          FindUserById={setIdentBusqueda}
        />
      ))
    );
  };

  return {
    posts,
    showModal,
    formInput,
    identBusqueda,
    publicacionActual,
    validationError,
    currentUser,
    handlePic,
    fetchUser,
    fetchPosts,
    handleSubmit,
    handleChange,
    handleOpenModal,
    addCommentToPost,
    resetInputOnClick,
    handleConfirmUpload,
    setPublicacionActual,
    PostsToComponent,
  };
};

export default usePosts;
