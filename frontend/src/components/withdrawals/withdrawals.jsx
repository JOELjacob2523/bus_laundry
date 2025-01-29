import "./withdrawals.css";
import React, { useState } from "react";
import { Button, Card, Drawer } from "antd";
import { BiMoneyWithdraw } from "react-icons/bi";
import WithdrawalForm from "./withdrawalForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

const Withdrawals = () => {
  const [open, setOpen] = useState(false);
  const [keyNumber, setKeyNumber] = useState(0);
  const navigate = useNavigate();
  const { authData } = useAuth();

  const showDrawer = () => {
    try {
      setOpen(true);
    } catch (err) {
      console.log("Error", err);
      navigate("/error500");
    }
  };
  const closeDrawer = () => {
    setOpen(false);
    setKeyNumber(keyNumber + 1);
  };

  return (
    <>
      <div>
        <Card
          title={<div className="modal_title">באצאלן אינפארמאציע</div>}
          className="zman_goal_card"
        >
          <div className="zman_goal_description">
            דרוק דא ארויסצונעמען באס / וואשן געלט
          </div>
          <Button
            className="add_zman_goal_btn"
            onClick={showDrawer}
            disabled={authData.role === "User"}
          >
            <BiMoneyWithdraw />
          </Button>
        </Card>
      </div>
      <Drawer
        title={<div className="modal_title">באצאלן אינפארמאציע</div>}
        width={700}
        open={open}
        onClose={closeDrawer}
        footer={null}
        className="withdrawals_drawer"
      >
        <div className="withdrawal_form">
          {<WithdrawalForm keyNumber={keyNumber} />}
        </div>
      </Drawer>
    </>
  );
};
export default Withdrawals;
