import { useState, useEffect } from "react";
import UseHome from "../hooks/UseHome";
import axios from "axios";

const UsePostPublic = () => {
  //States of Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //States
  const {
    proveedor,
    usuario,
    setPublicacionActual,
    publicacionActual } = UseHome();
  const [input, setInput] = useState({});
  const [validation, setValidation] = useState(false);
  const token = localStorage.getItem("token");
  const [imagenPublicada, setImagenPublicada] = useState("")

  //Codigo de imagenes
  const handlePic = async (e) => {
    const pic = e.target.files[0];
    const changedInput = { ...input, imagenPublicada: imagenPublicada };
    setInput(changedInput);

    const formData = new FormData()
    formData.append('file', pic)
    formData.append('upload_preset', 'wkuf5yo4')
    fetch('https://api.cloudinary.com/v1_1/five-drive/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => setImagenPublicada(res.url))
  }

  useEffect(() => {
    const changedInput = { ...input, imagenPublicada: imagenPublicada };
    setInput(changedInput);
  }, [imagenPublicada])

  const handleUpload = () => {
    handleClose()
  }

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

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { "x-auth-token": token };
      await axios.post("publicacion", input, { headers });
      setPublicacionActual(true);

      // TODO: other fn for reload 
      window.location.href = "/";
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
    handleUpload,
    handlePic,
    handleShow,
    validation,
    input,
    show,
  };
};
export default UsePostPublic;
