import Options from "./Options/Options";
import { Card, Image } from "react-bootstrap";
import { exampleImage } from "../../utils/values";
import { useState } from "react";
import { Chat, Cha } from "react-bootstrap-icons";
import "./Post.css";

const PostComponent = ({ date, usuario, AddCommentToPost, FindUserById }) => {
  const token = localStorage.getItem("token");
  const [viewComments, setViewComments] = useState(false);
  const [addComments, setAddComments] = useState(false);
  const switchEnable = () => setViewComments(!viewComments);
  const switchEnableAddComments = () => setAddComments(!addComments);

  return (
    <>
      <div className="CardDiv">
        <Card className="CardPublica">
          <div className="d-flex justify-content-between">
            <div
              className="datosTitular"
              onClick={() => {
                if (FindUserById && date?.Creator?._id) {
                  FindUserById(date?.Creator?._id);
                }
              }}
            >
              <Image
                className="PublicacionFoto"
                src={date?.Creator?.Photo || exampleImage}
                alt=""
              />
              <div className="namePost text-light">
                {date?.Creator?.UserName}
              </div>
            </div>
            {date?.Creator?._id === usuario?._id && (
              <Options idPost={date?._id} />
            )}
          </div>
          <div className="d-flex flex-column">
            <div className="mx-5">
              <div className="mx-2 descripcionPublicacion">{date.Content}</div>
            </div>
            {date.Image && (
              <div className="PublicacionFotoPublicada">
                <Image src={date.Image} alt="" />
              </div>
            )}
          </div>
          <div className="d-flex">
            <div
              className="d-flex align-items-center"
              onClick={switchEnableAddComments}
            >
              <Chat className="mx-1 mt-2" width={25} height={25} />
            </div>
            {date?.Comments?.length > 0 && (
              <div className="addComment" onClick={switchEnable}>
                Ver los {date?.Comments?.length} comentarios
              </div>
            )}
          </div>

          {token && addComments && (
            <div className="mt-4 w-100 commentForm">
              <Image
                className="PublicacionFoto"
                src={usuario?.Photo || exampleImage}
                alt=""
              />
              <input
                className="m-0 form-control"
                placeholder="Agregar Comentario..."
                onKeyDown={(event) =>
                  AddCommentToPost({
                    event,
                    userId: usuario?._id,
                    post: date,
                  })
                }
              />
            </div>
          )}

          {date?.Comments?.length > 0 && viewComments && (
            <>
              <div>
                {date?.Comments.map((item, i) => (
                  <div key={i} className="comment">
                    <Image
                      className="PublicacionFoto"
                      src={item?.Creator?.Photo || exampleImage}
                      alt=""
                    />
                    <div className="text-light mr-1">
                      {item?.Creator?.UserName}
                    </div>
                    <div>{item.Text}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
};
export default PostComponent;
