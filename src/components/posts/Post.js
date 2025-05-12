import Options from "./Options/Options";
import { Card, Image } from "react-bootstrap";
import { exampleImage } from "../../utils/values";
import { useState } from "react";
import { Chat } from "react-bootstrap-icons";
import "./Post.css";

const PostComponent = ({ date, usuario, AddCommentToPost, FindUserById }) => {
  const token = localStorage.getItem("token");
  const [viewComments, setViewComments] = useState(false);
  const [addComments, setAddComments] = useState(false);
  const switchEnable = () => setViewComments(!viewComments);
  const switchEnableAddComments = () => setAddComments(!addComments);

  const findUser = () => {
    if (FindUserById && date?.Creator?._id) {
      FindUserById(date?.Creator?._id);
    }
  };

  return (
    <>
      <div className="CardDiv">
        <Card className="CardPublica">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Image
                className="PublicacionFoto"
                src={date?.Creator?.Photo || exampleImage}
                alt=""
              />
            </div>
            <div className="d-flex justify-content-between flex-column w-100">
              <div
                className="datosTitular namePost text-light"
                onClick={findUser}
              >
                {date?.Creator?.UserName}
              </div>
              <div className="d-flex flex-column">
                <div className="descripcionPublicacion">{date.Content}</div>
                {date.Image && (
                  <div className="PublicacionFotoPublicada">
                    <Image src={date.Image} alt="" />
                  </div>
                )}
              </div>
              <div className="d-flex mt-3">
                <div onClick={switchEnableAddComments}>
                  <Chat width={20} height={20} />
                </div>
                {date?.Comments?.length > 0 && (
                  <div className="addComment" onClick={switchEnable}>
                    Ver los {date?.Comments?.length} comentarios
                  </div>
                )}
              </div>
              <>
                {date?.Comments?.length > 0 && viewComments && (
                  <div>
                    {date?.Comments.map((item, i) => (
                      <div key={i} className="comment p-0 pt-2">
                        <Image
                          className="rounded-circle"
                          src={item?.Creator?.Photo || exampleImage}
                          width={25}
                          height={25}
                          alt=""
                        />
                        <div className="text-light mx-1">
                          {item?.Creator?.UserName}
                        </div>
                        <div>{item.Text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            </div>
            {date?.Creator?._id === usuario?._id && (
              <Options idPost={date?._id} Delete={true} Private={true} />
            )}
          </div>
          <>
            {token && addComments && (
              <div className="mt-3 mx-1 w-100 commentForm">
                <Image
                  className="rounded-circle"
                  src={usuario?.Photo || exampleImage}
                  width={30}
                  height={30}
                  alt=""
                />
                <input
                  className="m-0 px-2 pb-0 pt-0 form-control"
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
          </>
        </Card>
      </div>
    </>
  );
};
export default PostComponent;
