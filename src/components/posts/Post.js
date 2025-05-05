import Options from "./Options/Options";
import { Card, Image } from "react-bootstrap";
import { exampleImage } from "../../utils/values";
import { useState } from "react";
import "./Post.css";

const PostComponent = ({ date, usuario, AddCommentToPost, FindUserById }) => {
  const token = localStorage.getItem("token");
  const [viewComments, setViewComments] = useState(false);
  const switchEnable = () => setViewComments(!viewComments);

  console.log(date);
  
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
              <Image
                className="PublicacionFoto"
                src={date?.creador?.imagen || exampleImage}
                alt=""
              />
              <div className="namePost">{date.proveedor}</div>
            </div>
            {date?.creador?._id === usuario?._id && (
              <Options idPost={date?._id} />
            )}
          </div>
          <div className="d-flex flex-column">
            <div className="ml-5">
              {/* <div className="mt-2 ml-1 titlePublicacion">{date.titulo}</div> */}
              <div className="ml-1 descripcionPublicacion">{date.contenido}</div>
            </div>
            {date.imagenPublicada && (
              <div className="PublicacionFotoPublicada">
                <Image src={date.imagenPublicada} alt="" />
              </div>
            )}
          </div>
          {token && <div className="mt-4 w-100 commentForm">
            <Image
              className="PublicacionFoto"
              src={usuario?.imagen || exampleImage}
              alt=""
            />
            <input
              className="m-0 form-control"
              placeholder="Agregar Comentario..."
              onKeyDown={(event) =>
                AddCommentToPost({
                  event,
                  userId: usuario?._id,
                  post: date
                })
              }
            />
          </div>}
          {date?.comments?.length > 0 ? (
            !viewComments ? (
              <div className="addComment" onClick={switchEnable}>
                Ver los {date?.comments?.length} comentarios
              </div>
            ) : (
              <div>
                {date?.comments.map((item, i) => (
                  <div key={i} className="comment">
                    <Image
                      className="PublicacionFoto"
                      src={item?.creador?.imagen || exampleImage}
                      alt=""
                    />
                    <div className="text-light mr-1">
                      {item?.creador?.usuario}
                    </div>
                    <div>{item.text}</div>
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
