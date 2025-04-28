import UseHome from "../home/useHome";
import axios from "axios";
import { REACT_APP_API_CLOUDINARY, REACT_APP_API_CLOUDINARY_KEY, exampleImage } from "../../utils/values";

const UsePerfil = () => {
  const token = localStorage.getItem("token");
  const { usuario } = UseHome();

  // Codigo de imagenes
  const handlePic = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', REACT_APP_API_CLOUDINARY_KEY)

    fetch(`${REACT_APP_API_CLOUDINARY}/v1_1/five-drive/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        onChangeImg(res?.url)
      })
  }

  //Codigo para foto base 64
  const onChangeImg = async (photoUrl) => {
    try {
      await axios
      .put(
        `usuario/${usuario._id}`,
        { imagen: photoUrl },
        { headers: { "x-auth-token": token } }
      )
      .then((response) => console.log(response.data));

      // TODO: error in reload change this
      window.location.href = "/profile"
    } catch (error) {
      console.error("Error in change dates of user", error);
    }
  };
  return {
    onChangeImg,
    exampleImage,
    handlePic,
    token,
  };
};
export default UsePerfil;
