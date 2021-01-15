import { useEffect, useState } from "react";
import { getStorageArray } from "../utils";

const useForm = (submit) => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [saveUser, setSaveUser] = useState({});
  const { usuario, contraseña } = user;
  const nameUserDate = getStorageArray("usuario");
  const array = nameUserDate.find((n) => (n = {}));

  function usuariodatos() {
    if (user.name === array.name && user.password === array.password) {
      window.location.href = "http://localhost:3000/home";
    } else {
      alert("Datos invalido");
    }
  }

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target["name"];
    const objeto = { ...user, [name]: value };
    setUser(objeto);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSaveUser(user);
    usuariodatos();
  };

  return {
    handleOnChange,
    handleSubmit,
    saveUser,
    user,
    nameUserDate,
    array,
  };
};
export default useForm;
