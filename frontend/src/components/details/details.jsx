import "./details.css";
import ClosedWeeks from "../closedWeeks/closedWeeks";
import { Button, Card } from "antd";
import { FaPlus } from "react-icons/fa";
import PrintStudentInfo from "../printStudentInfo/printStudentInfo";

const Details = () => {
  return (
    <div className="main_details_container">
      <div className="main_detials_inner">
        <div className="card_container">
          <div>
            <ClosedWeeks />
          </div>
          <div>
            <Card
              title={<div className="modal_title">באצאלן אינפארמאציע</div>}
              className="zman_goal_card"
            >
              <div className="zman_goal_description">
                דרוק דא ארויסצונעמען באס / וואשן געלט
              </div>
              <Button className="add_zman_goal_btn">
                <FaPlus />
              </Button>
            </Card>
          </div>
          <div>
            <PrintStudentInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
