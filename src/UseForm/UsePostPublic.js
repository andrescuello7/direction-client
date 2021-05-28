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
  const [publicacionActual, setPublicacionActual] = useState(false);
  const [base64, setBase64] = useState("");
  const [input, setInput] = useState({});
  const [validation, setValidation] = useState(false);
  const [publicacionEntrante, setPublicacionEntrante] = useState({});
  const token = localStorage.getItem("token");
  const { proveedor, usuario } = UseHome();

  useEffect(() => {
    PublicarDataEntrante();
  }, [input, base64]);

  useEffect(() => {
    if (publicacionActual === true){
      Publicacion()
    }
  }, [publicacionActual]);

  //Subir
  const PublicarDataEntrante = () => {
    const datos = {
      ...input,
      imagenPublicada: base64,
    };
    setPublicacionEntrante(datos);
  };

  const Publicacion = async () => {
    try {
      await axios.get("publicacion");
      console.log('funcion')
    } catch (error) {
      console.log(error);
    }
  };
  
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
    if (!beforeUpload4(img)) return;
    const base64img = await getBase644(img);
    setBase64(base64img);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { "x-auth-token": token };
      await axios.post("publicacion", publicacionEntrante, { headers });
      setPublicacionActual(true)
    } catch (error) {
      console.log(error);
      setValidation(true)
    }
  };
  return {
    publicacionActual,
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
