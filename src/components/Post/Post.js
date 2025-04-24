import "./Post.css"
import { Card } from "react-bootstrap";
import { exampleImage } from "../../utils/values";
import { DeleteIcon } from "../../utils/svg";

const PostComponent = ({ date, usuario, Delete, FindUserById }) => {

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
                                            {DeleteIcon}
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
                        <hr />
                        <div className="w-100 commentForm">
                            <input className="m-0 form-control" placeholder="Comentar..."/>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};
export default PostComponent;
