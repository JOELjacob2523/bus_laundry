import "./details.css";
import ClosedWeeks from "../closedWeeks/closedWeeks";
import PrintStudentInfo from "../printStudentInfo/printStudentInfo";
import Withdrawals from "../withdrawals/withdrawals";

const Details = () => {
  return (
    <div className="main_details_container">
      <div className="card_container">
        <div>
          <ClosedWeeks />
        </div>
        <div>
          <Withdrawals />
        </div>
        <div>
          <PrintStudentInfo />
        </div>
      </div>
    </div>
  );
};

export default Details;
