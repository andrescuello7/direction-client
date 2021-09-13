import { getBase64 } from "../utils/index";
import UseHome from "../UseForm/UseHome";
import { useState, useEffect } from "react";
import axios from "axios";

const UsePerfil = () => {
  const token = localStorage.getItem("token");
  const [imagenPublicada, setImagenPublicada] = useState("")
  const [base64, setBase64] = useState("");
  const { usuario } = UseHome();
  const exampleImage =
    "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg";

  useEffect(()=>{
    if(imagenPublicada !== 0){
      onChangeImg()
    }
  },[imagenPublicada])

  //Codigo de imagenes
  const handlePic = async (e) => {
    const file = e.target.files[0];
    const base64img = await getBase64(file);
    setBase64(base64img);

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'wkuf5yo4')
    fetch('https://api.cloudinary.com/v1_1/five-drive/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => setImagenPublicada(res.url))
  }

  //Codigo para foto base 64
  const onChangeImg = async (e) => {
    const headers = { "x-auth-token": token };
    await axios
      .put(
        `usuario/${usuario._id}`,
        { imagen: imagenPublicada },
        {
          headers,
        }
      )
      .then((response) => console.log(response.data));
  };
  return {
    onChangeImg,
    exampleImage,
    handlePic,
    token,
  };
};
export default UsePerfil;
