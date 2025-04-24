import { Card } from "react-bootstrap";
import "./Post.css"

const PostComponent = ({ date, usuario, Delete, FindUserById }) => {
    const exampleImage =
        "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg";

    return (
        <>
            <div>
                <div className="CardDiv">
                    <Card className="CardPublica">
                        <div className="d-flex justify-content-between">
                            <div
                                className="datosTitular"
                                onClick={() => {
                                    if (FindUserById) {
                                        FindUserById(date.creador)
                                    }
                                }}
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

                            {date.creador === usuario._id && (
                                <div>
                                    <div className="mr-3 mt-3">
                                        <div onClick={() => Delete(date._id)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                className="bi bi-x-lg"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="d-flex flex-column">
                            <div className="m-2 descripcionPublicacion">{date.titulo}</div>
                            <div className="ml-2">{date.contenido}</div>
                            {date.imagenPublicada && (
                                <div className="PublicacionFotoPublicada">
                                    <img src={date.imagenPublicada} alt="" />
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};
export default PostComponent;
