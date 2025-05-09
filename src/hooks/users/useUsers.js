import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  getAllPosts,
  savePost,
  saveCommentInPost,
} from "../../services/posts.services";
import { usePostContext } from "../../context/PostContext";
import { getUserByToken } from "../../services/auth.services";
import PostComponent from "../../components/posts/Post";

const useHome = () => {
  // Context Post
  const { posts, addPost, updateUser, currentUser } = usePostContext();

  // States
  const [formInput, setFormInput] = useState({});
  const [uploadedImage, setUploadedImage] = useState("");
  const [validationError, setValidationError] = useState(false);

  const [identBusqueda, setIdentBusqueda] = useState("");
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

  useEffect(() => {
    const updatedInput = { ...formInput, imagenPublicada: uploadedImage };
    setFormInput(updatedInput);
  }, [uploadedImage]);

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

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const updatedInput = { ...formInput, imagenPublicada: uploadedImage };
    setFormInput(updatedInput);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_API_CLOUDINARY_KEY);

    fetch(`${process.env.REACT_APP_API_CLOUDINARY}/v1_1/five-drive/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => setUploadedImage(res.url));
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
      return true;
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
    return posts.length > 0 && (
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
    identBusqueda,
    publicacionActual,
    validationError,
    currentUser,
    fetchUser,
    fetchPosts,
    handleSubmit,
    handleChange,
    handleOpenModal,
    addCommentToPost,
    resetInputOnClick,
    handleConfirmUpload,
    setPublicacionActual,
    handleImageUpload,
    PostsToComponent,
  };
};

export default useHome;
