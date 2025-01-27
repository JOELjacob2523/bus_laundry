import "./details.css";
import ClosedWeeks from "../closedWeeks/closedWeeks";
import PrintStudentInfo from "../printStudentInfo/printStudentInfo";
import Withdrawals from "../withdrawals/withdrawals";
import { Helmet } from "react-helmet";

const Details = () => {
  return (
    <div className="main_details_container">
      <Helmet>
        <title>Details - KJ Mesivta Bus & Laundry</title>
      </Helmet>
      <div className="card_container">
        <div>
          {/* Closed week component */}
          <ClosedWeeks />
        </div>
        <div>
          {/* Withdrawal component */}
          <Withdrawals />
        </div>
        <div>
          {/* Print student info component */}
          <PrintStudentInfo />
        </div>
      </div>
    </div>
  );
};

export default Details;
