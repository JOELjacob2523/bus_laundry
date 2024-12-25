import { Button, message, Modal } from "antd";
import "./deleteWithdrawal.css";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";
import { deleteWithdrawalInfo } from "../../../servers/postRequest";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const DeleteWithdrawal = ({ withdrawal, setWithdrawals }) => {
  const [visible, setVisible] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteWithdrawalInfo(withdrawal.withdrawal_id);
      setVisible(false);
      setWithdrawals((prev) =>
        prev.filter((w) => w.withdrawal_id !== withdrawal.withdrawal_id)
      );
      message.success("Withdrawal deleted successfully", 1.5);
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  return (
    <div>
      <RiDeleteBin5Line
        onClick={() => setVisible(true)}
        className="delete_withdrawal_icon"
      />

      <Modal
        title={
          <div className="title_header">
            <CgDanger className="delete_icon" /> Confirm Deletion
          </div>
        }
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <div>
          <div>
            ?דו ביזט זיכער אז דו ווילסט אויסמעקן $
            {formatNumber(withdrawal.amount)} פון די חשבון
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteWithdrawal;
