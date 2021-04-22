import { beforeUpload, getBase64 } from "../utils/index";
import UseHome from "../UseForm/UseHome";
import { useState } from "react";
import axios from "axios";

const UsePerfil = () => {
  const token = localStorage.getItem("token");
  const { usuario } = UseHome();
  const exampleImage =
    "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg";

  //Codigo para foto base 64
  const onChangeImg = async (e) => {
    const img = e.target.files[0];
    if (!beforeUpload(img)) return;
    const base64 = await getBase64(img);
    const headers = { "x-auth-token": token };
    axios
      .put(
        `usuario/${usuario._id}`,
        { imagen: base64 },
        {
          headers,
        }
      )
      .then((response) => console.log(response.data));
  };
  return {
    onChangeImg,
    exampleImage,
    token,
  };
};
export default UsePerfil;
