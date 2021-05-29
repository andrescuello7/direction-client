import { useState, useEffect } from "react";
import { getBase644, beforeUpload4 } from "../utils/index";
import UseHome from "../UseForm/UseHome";
import axios from "axios";

const UsePostPublic = () => {
  //States of Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //States
  const { proveedor, usuario, setPublicacionActual, publicacionActual } =
    UseHome();
  const [base64, setBase64] = useState("");
  const [input, setInput] = useState({});
  const [validation, setValidation] = useState(false);
  const token = localStorage.getItem("token");

  //Funcions
  const HandleChange = (e) => {
    const { name, value } = e.target;
    const changedInput = {
      ...input,
      [name]: value,
      proveedor: proveedor,
      perfil: usuario.imagen,
    };
    setInput(changedInput);
  };

  //Codigo para foto base 64
  const onChangeImg = async (e) => {
    const img = e.target.files[0];
    const base64img = await getBase644(img);
    const pack = { ...input, imagenPublicada: base64img };
    setBase64(base64img);
    setInput(pack);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { "x-auth-token": token };
      await axios.post("publicacion", input, { headers });
      setPublicacionActual(true);
    } catch (error) {
      console.log(error);
      setValidation(true);
    }
  };
  const onInputClick = (event) => {
    event.target.value = "";
  };
  return {
    publicacionActual,
    onInputClick,
    HandleChange,
    HandleSubmit,
    handleClose,
    onChangeImg,
    handleShow,
    validation,
    base64,
    input,
    show,
  };
};
export default UsePostPublic;
