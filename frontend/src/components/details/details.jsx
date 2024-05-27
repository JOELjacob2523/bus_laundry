import "./details.css";
import { Link } from "react-router-dom";
import ClosedWeeks from "../closedWeeks/closedWeeks";
import ZmanGoal from "../zmanGoal/zmanGoal";

const Details = () => {
  let pay = "https://secure.cardknox.com/congmesivta";
  return (
    <div className="main_details_container">
      <ClosedWeeks />
      <ZmanGoal />
      <div>add amount of goal for buses</div>
      <div>add amount of goal for wash</div>
      <div>
        <Link to={pay} target="_blank">
          Make a payment
        </Link>
      </div>
    </div>
  );
};

export default Details;
