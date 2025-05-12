import Options from "./Options/Options";
import { exampleImage } from "../../utils/values";
import { Card, Image } from "react-bootstrap";
import "./Post.css";

const PrayComponent = ({ date }) => {
  return (
    <>
      <div className="CardDiv">
        <Card className="CardPublica">
          <div className="d-flex justify-content-between align-items-start">
            <Image
              className="rounded-circle"
              width={24}
              height={24}
              src={date?.Creator?.Photo || exampleImage}
              alt=""
            />
            <div className="d-flex justify-content-between flex-column w-100">
              <b className="mx-2 mb-1 titlePublicacion">
                {date?.From ?? "Anonimo"}
              </b>
              <div className="d-flex flex-column">
                <div className="mx-2 descripcionPublicacion">
                  {date?.Description}
                </div>
              </div>
            </div>
            <Options idPost={date?._id} Delete={true} PraySuccess={true} />
          </div>
        </Card>
      </div>
    </>
  );
};
export default PrayComponent;
