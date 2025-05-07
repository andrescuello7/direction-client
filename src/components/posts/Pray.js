import { DeleteIconX } from "../../utils/svg";
import { deletePrays } from "../../services/prayes.services";
import { Card } from "react-bootstrap";
import "./Post.css";

const PrayComponent = ({ date }) => {
  const DeletePray = async () => {
    await deletePrays({ idPray: date?._id })
    window.location.href = "/profile"
  }

  return (
    <>
      <div className="CardDiv">
        <Card className="CardPublica">
          <div className="d-flex mb-3 justify-content-between">
            <div className="m-2 titlePublicacion">{date?.From ?? "Anonimo"}</div>
            <div onClick={DeletePray}><DeleteIconX /></div>
          </div>
          <div className="ml-2 descripcionPublicacion">{date?.Description}</div>
        </Card>
      </div>
    </>
  );
};
export default PrayComponent;
