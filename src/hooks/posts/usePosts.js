import { useState, useEffect } from "react";
import { usePostContext } from "../../context/PostContext";
import { getAllPosts, savePost } from "../../services/posts.services";
import axios from "axios";

const usePostPublic = () => {
  //Context Post
  const { currentUser, updatePosts } = usePostContext();

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  // States
  const [formInput, setFormInput] = useState({});
  const [validationError, setValidationError] = useState(false);
  const token = localStorage.getItem("token");
  const [uploadedImage, setUploadedImage] = useState("");

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const updatedInput = { ...formInput, imagenPublicada: uploadedImage };
    setFormInput(updatedInput);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wkuf5yo4");

    fetch("https://api.cloudinary.com/v1_1/five-drive/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => setUploadedImage(res.url));
  };

  useEffect(() => {
    const updatedInput = { ...formInput, imagenPublicada: uploadedImage };
    setFormInput(updatedInput);
  }, [uploadedImage]);

  const handleConfirmUpload = () => {
    handleCloseModal();
  };

  // Form Functions
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedInput = {
      ...formInput,
      [name]: value,
      proveedor: currentUser?.usuario,
      perfil: currentUser?.imagen,
    };

    setFormInput(updatedInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await savePost({ body: formInput });
      return true
      
      // TODO: improve reload method
      // const data = await getAllPosts();
      // updatePosts(data);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setValidationError(true);
    }
  };

  const resetInputOnClick = (event) => {
    event.target.value = "";
  };

  const addCommentToPost = async ({ event, post, userId }) => {
    if (event.key === "Enter") {
      try {
        await axios
          .post(
            `publicacion/${post?._id}/comment`,
            {
              creador: userId,
              text: event?.target?.value,
            },
            { headers: { "x-auth-token": token } }
          )
          .then((response) => console.log(response.data));

        // TODO: improve reload method
        window.location.href = "/";
      } catch (error) {
        console.error("Error adding comment to post", error);
      }
    }
  };

  return {
    addCommentToPost,
    resetInputOnClick,
    handleChange,
    handleSubmit,
    handleCloseModal,
    handleConfirmUpload,
    handleImageUpload,
    handleOpenModal,
    validationError,
    formInput,
    showModal,
  };
};

export default usePostPublic;
