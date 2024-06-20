import "./details.css";
import ClosedWeeks from "../closedWeeks/closedWeeks";
import { Button, Drawer, Card } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Details = () => {
  const [zmanGoalOpen, setZmanGoalOpen] = useState(false);

  const showDrawer = () => {
    setZmanGoalOpen(true);
  };
  const onClose = () => {
    setZmanGoalOpen(false);
  };

  return (
    <div className="main_details_container">
      <div className="main_detials_inner">
        <Card
          title={<div className="modal_title">זמן אינפארמאציע</div>}
          className="zman_goal_card"
        >
          <div className="zman_goal_description">
            דרוק דא אריינצולייגן זמן אינפארמאציע
          </div>
          <Button onClick={showDrawer} className="add_zman_goal_btn">
            <FaPlus />
          </Button>
        </Card>

        <div>
          <Drawer
            title={<div className="modal_title">זמן אינפארמאציע</div>}
            width={800}
            open={zmanGoalOpen}
            onClose={onClose}
            footer={null}
            className="zman_goal_drawer"
          >
            <ClosedWeeks />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Details;
