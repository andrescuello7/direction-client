import { MailboxPray, PostOption } from "../../../utils/svg";
import "./Options.css";

const OptionsProfile = ({ option, setOption }) => {
  return (
    <div className="sectionProfileOptions">
      <div className="sectionProfileOptionsButtons">
        <div
          className={`optionButton ${option === "POSTS" && "text-light border-top"}`}
          onClick={() => setOption("POSTS")}
        >
          <PostOption height={20} width={20} />{" "}
          <div className="ml-1">PUBLICACIONES</div>
        </div>
        <div
          className={`optionButton ${option === "PRAY" && "text-light border-top"}`}
          onClick={() => setOption("PRAY")}
        >
          <MailboxPray height={20} width={20} />{" "}
          <div className="ml-1">ORACIONES</div>
        </div>
      </div>
    </div>
  );
};

export default OptionsProfile;
