const validateRegister = (values) => {
  let errors = {};
  if (!values.usuario) {
    errors.usuario = "El nombre es obligatorio";
  } else if (values.usuario.length > 30) {
    errors.usuario = "El nombre no puede tener más de 30 caracteres";
  }
};

export default validateRegister;
