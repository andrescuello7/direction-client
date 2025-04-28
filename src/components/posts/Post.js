import "./Post.css";
import UsePostPublic from "../../hooks/posts/usePosts";
import { Card } from "react-bootstrap";
import { exampleImage } from "../../utils/values";
import Options from "./Options/Options";
import { useState } from "react";

const PostComponent = ({ date, usuario, FindUserById }) => {
  const { addCommentToPost } = UsePostPublic();
  const [viewComments, setViewComments] = useState(false);
  const switchEnable = () => setViewComments(!viewComments);

  return (
    <>
      <div className="CardDiv">
        <Card className="CardPublica">
          <div className="d-flex justify-content-between">
            <div
              className="datosTitular"
              onClick={() => {
                if (FindUserById && date?.creador?._id) {
                  FindUserById(date?.creador?._id);
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
            {date?.creador?._id === usuario?._id && (
              <Options idPost={date?._id} />
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
              src={usuario?.imagen || exampleImage}
              alt=""
            />
            <input
              className="m-0 form-control"
              placeholder="Agregar Comentario..."
              onKeyDown={(event) =>
                addCommentToPost({
                  event,
                  userId: usuario?._id,
                  post: date
                })
              }
            />
          </div>
          {date?.comments?.length > 0 ? (
            !viewComments ? (
              <div className="addComment" onClick={switchEnable}>
                Ver los {date?.comments?.length} comentarios
              </div>
            ) : (
              <div className="mt-2">
                {date?.comments.map((item, i) => (
                  <div key={i} className="comment">
                    <img
                      className="PublicacionFoto"
                      src={item?.creador?.imagen || exampleImage}
                      alt=""
                    />
                    <div className="text-light mr-1">
                      {item?.creador?.usuario}
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            )
          ) : (
            <></>
          )}
        </Card>
      </div>
    </>
  );
};
export default PostComponent;
