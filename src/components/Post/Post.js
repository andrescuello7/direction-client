import "./Post.css";
import UsePostPublic from "../../hooks/UsePostPublic";
import { Card } from "react-bootstrap";
import { exampleImage } from "../../utils/values";
import { DeleteIcon } from "../../utils/svg";

const PostComponent = ({ date, usuario, Delete, FindUserById }) => {
  const { AddCommentToPost } = UsePostPublic();

  console.log(usuario);

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
                    FindUserById(date.creador);
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
                    <div onClick={() => Delete(date._id)}>{DeleteIcon}</div>
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
            <div className="mt-4 w-100 commentForm">
              <img
                className="PublicacionFoto"
                src={usuario.imagen || exampleImage}
                alt=""
              />
              <input
                className="m-0 form-control"
                placeholder="Agregar Comentario..."
                onKeyDown={(e) => AddCommentToPost({ event: e, date })}
              />
            </div>
            {date?.comments?.length > 0 ? (
              <div className="mt-2">
                <hr className="bg-secondary" />
                {date?.comments.map((item, i) => (
                  <div key={i} className="comment">
                    <b className="text-light">{date.proveedor}:</b> {item.text}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};
export default PostComponent;
