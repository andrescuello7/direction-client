import { beforeUpload, getBase64 } from "../utils/index";
import UseHome from "../UseForm/UseHome";
import { useState } from "react";
import axios from "axios";

const UsePerfil = () => {
  const token = localStorage.getItem("token");
  const { usuario } = UseHome();
  const [input, setInput] = useState({});
  const exampleImage =
    "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg";

  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = { ...input, [name]: value };
    setInput(changedInput);
  };
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
  const onChangeDate = async (e) => {
    const headers = { "x-auth-token": token };
    try {
      const data = await axios.put(
        "usuario",
        { input },
        {
          headers,
        }
      );
      console.log("DATA ENTRANTE", data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(input)
  return {
    HandleChange,
    onChangeImg,
    exampleImage,
    onChangeDate,
    token,
  };
};
export default UsePerfil;
