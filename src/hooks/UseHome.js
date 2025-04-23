import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spinner, Button } from "react-bootstrap";

const UseHome = () => {
  //UseStates de modal
  const token = localStorage.getItem("token");
  const [publicacionActual, setPublicacionActual] = useState(false);
  //UseStates de Aplicacion
  const [admin, setAdmin] = useState("");
  const [usuario, setUsuario] = useState([]);
  const [proveedor, setProveedor] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
  const [identificador, setIdentificador] = useState("");
  const [identBusqueda, setIdentBusqueda] = useState("");
  const exampleImage = "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg";

  useEffect(() => {
    Usuario();
    Publicacion();
  }, []);

  if (identBusqueda.length !== 0) {
    localStorage.setItem("identBusqueda", identBusqueda);
    window.location.href = "/buscar";
  }

  //Consulta el usuario activo actualmente
  const Usuario = async () => {
    try {
      const headers = { "x-auth-token": token };
      const { data } = await axios.get("auth", {
        headers,
      });
      setUsuario(data.usuario);
      setAdmin(data.usuario.estado);
      setProveedor(data.usuario.usuario);
    } catch (error) {
      console.log(error);
    }
  };
  //Consulta de Publicaiones
  const Publicacion = async () => {
    try {
      const { data } = await axios.get("publicacion");
      setPublicaciones(data);
    } catch (error) {
      console.log(error);
    }
  };
  //Funcion de Eliminar Publicacion
  const Delete = async (idPost) => {
    try {
      const headers = { "x-auth-token": token };
      await axios.delete(`publicacion/${idPost}`, { headers });
      Publicacion();
    } catch (error) {
      console.log("Error en eliminar datos");
    }
  };

  //Aqui se hacemos el map de todos las publicaciones
  const MapDataBase =
    (publicaciones.length === 0 && (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    )) ||
    publicaciones.map((date, i) => (
      <div className="CardDiv" key={i}>
        <Card className="CardPublica">
          <div className="d-flex justify-content-between">
            <div
              className="datosTitular"
              onClick={() => setIdentBusqueda(date.creador)}
            >
              <div>
                <img
                  className="PublicacionFoto"
                  src={date.perfil || exampleImage}
                  alt=""
                />
              </div>
              <div>{date.proveedor}</div>
            </div>
            {(date.creador === usuario._id && (
              <div>
                <div className="m-2">
                  <div onClick={() => Delete(date._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="m-2 bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )) ||
              (admin === "admin" && (
                <div>
                  <div className="m-2">
                    <Button
                      variant="outline-light"
                      onClick={() => setIdentificador(date._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          <div className="d-flex flex-column">
            <div className="m-2 descripcionPublicacion">{date.titulo}</div>
            <div className="ml-2">{date.contenido}</div>
            {date.imagenPublicada && (
              <div className="d-flex justify-content-center">
                <img
                  className="PublicacionFotoPublicada"
                  src={date.imagenPublicada}
                  alt=""
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    ));

  const MapComparatePublic =
    (publicaciones.length === 0 && (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    )) ||
    publicaciones.map((date, i) => (
      <div>
        {date.creador === usuario._id && (
          <div className="CardDiv" key={i}>
            <Card className="CardPublica">
              <div className="d-flex justify-content-between">
                <div className="datosTitular">
                  <div>
                    <img
                      className="PublicacionFoto"
                      src={date.perfil || exampleImage}
                      alt=""
                    />
                  </div>
                  <div>{date.proveedor}</div>
                </div>
                <div className="m-2">
                  <Button
                    variant="outline-light"
                    onClick={() => setIdentificador(date._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="d-flex flex-column  p-5">
                <div className="m-2 descripcionPublicacion">{date.titulo}</div>
                <div className="ml-2">{date.contenido}</div>
                {date.imagenPublicada && (
                  <div className="d-flex justify-content-center">
                    <img
                      className="PublicacionFotoPublicada"
                      src={date.imagenPublicada}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    ));
  return {
    setPublicacionActual,
    MapComparatePublic,
    publicacionActual,
    publicaciones,
    identBusqueda,
    Publicacion,
    MapDataBase,
    proveedor,
    usuario,
  };
};
export default UseHome;
