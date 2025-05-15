import Options from "../common/Options/OptionsToPosts/Options";
import { Card } from "react-bootstrap";
import { BookIcon } from "../../utils/svg";
import "./Post.css";

const ProjectComponent = ({ date }) => {
  const ViewStates = ({ State }) => {
    return (
      <div className="d-flex align-items-center ht-100 mx-1 mt-2 text-secondary">
        <div
          className={`pointProject mb-1 ${
            State === "TODO"
              ? "bg-primary"
              : State === "IN_PROGRESS"
              ? "bg-warning"
              : State === "DONE"
              ? "bg-success"
              : "bg-danger"
          }`}
        ></div>
        <div className="mx-2 stateProject">
          {State === "TODO"
            ? "No Empezo"
            : State === "IN_PROGRESS"
            ? "En Progreso"
            : State === "DONE"
            ? "Completado"
            : "Cancelado"}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="CardDiv">
        <Card className="CardPublica">
          <div className="d-flex justify-content-between align-items-start">
            <div className="mt-1">
              <BookIcon className={"text-secondary"} height={15} width={15} />
            </div>
            <div className="d-flex justify-content-between flex-column w-100">
              <div className="m-2 text-primary titlePublicacion">
                {date?.Title}
              </div>
              <div className="text-secondary descripcionPublicacion">
                {date?.Description}
              </div>
            </div>
            <Options idPost={date?._id} DeleteProject={true} SendMessage={true} />
          </div>
          <ViewStates State={date?.State} />
        </Card>
      </div>
    </>
  );
};
export default ProjectComponent;
