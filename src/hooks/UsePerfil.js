import UseHome from "../hooks/UseHome";
import axios from "axios";

const UsePerfil = () => {
  const exampleImage = "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg";
  const token = localStorage.getItem("token");
  const { usuario } = UseHome();

  //Codigo de imagenes
  const handlePic = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'wkuf5yo4')

    // fetch(`${process.env.REACT_API_CLOUDINARY}/v1_1/five-drive/upload`, {
    fetch('https://api.cloudinary.com/v1_1/five-drive/upload', {
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
