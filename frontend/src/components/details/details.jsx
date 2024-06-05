import "./details.css";
import { Link } from "react-router-dom";
import ClosedWeeks from "../closedWeeks/closedWeeks";
import ZmanGoal from "../zmanGoal/zmanGoal";

const Details = () => {
  return (
    <div className="main_details_container">
      <div className="main_detials_inner">
        <ClosedWeeks />
        {/* <ZmanGoal /> */}
      </div>
    </div>
  );
};

export default Details;
