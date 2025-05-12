import { MailboxPray, PostOption, KanbanPray } from "../../../utils/svg";
import "./Options.css";

const OptionsProfile = ({ option, setOption }) => {
  return (
    <div className="sectionProfileOptions">
      <div className="sectionProfileOptionsButtons">
        <div
          className={`optionButton ${option === "PROJECT" && "text-light border-top"}`}
          onClick={() => setOption("PROJECT")}
        >
          <KanbanPray height={15} width={15} />
          <div className="mx-1">PROYECTOS</div>
        </div>
        <div
          className={`optionButton ${option === "POSTS" && "text-light border-top"}`}
          onClick={() => setOption("POSTS")}
        >
          <PostOption height={15} width={15} />
          <div className="mx-1">PUBLICACIONES</div>
        </div>
        <div
          className={`optionButton ${option === "PRAY" && "text-light border-top"}`}
          onClick={() => setOption("PRAY")}
        >
          <MailboxPray height={15} width={15} />
          <div className="mx-1">ORACIONES</div>
        </div>
      </div>
    </div>
  );
};

export default OptionsProfile;
