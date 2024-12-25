import "./detailedWithdrawals.css";
import React, { useState, useEffect } from "react";
import { Button, Descriptions, Form, Input, message } from "antd";
import { getAllWithdrawalInfo } from "../../servers/getRequest";
import { updateWithdrawalInfo } from "../../servers/postRequest";
import { EditOutlined } from "@ant-design/icons";
import DeleteWithdrawal from "./deleteWithdrawal/deleteWithdrawal";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const WithdrawalsDetials = ({
  handleEdit,
  isEditing,
  setIsEditing,
  showButtons,
  setShowButtons,
  handleEditCancel,
}) => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllWithdrawalInfo();
      setWithdrawals(data);
    }
    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      await updateWithdrawalInfo(values);
      setWithdrawals((prev) =>
        prev.map((w) => {
          if (w.withdrawal_id === values.withdrawal_id) {
            return { ...w, ...values };
          }
          return w;
        })
      );
      setIsEditing(false);
      setShowButtons(false);
      message.success("Withdrawal updated successfully", 1.5);
    } catch (error) {
      console.error("Failed to update withdrawal:", error);
    }
  };

  return (
    <div>
      <Descriptions title="געלט ארויס דעטאלן" layout="vertical" bordered>
        {withdrawals.map((withdrawal, index) => (
          <Descriptions.Item
            key={index}
            label={
              <div className="withdrawal_display_container">
                <div className="withdrawal_display_container_inner">
                  <div style={{ paddingTop: "3px" }}>
                    <EditOutlined
                      onClick={handleEdit}
                      className="withdrawal_edit_icon"
                    />
                  </div>
                  <div>
                    <DeleteWithdrawal
                      withdrawal={withdrawal}
                      setWithdrawals={setWithdrawals}
                    />
                  </div>
                </div>
                <div className="withdrawal_display_container_inner">
                  <strong>{withdrawal.withdrawal_to}</strong>
                  <div>:ארויס פאר</div>
                </div>
              </div>
            }
            span={3}
          >
            <Form initialValues={withdrawal} onFinish={onFinish}>
              <Form.Item name="withdrawal_id" hidden></Form.Item>
              {isEditing ? (
                <div className="withdrawal_display_container">
                  <div>
                    <Form.Item name="amount">
                      <Input />
                    </Form.Item>
                  </div>
                  <div>:סכום</div>
                </div>
              ) : (
                <div className="withdrawal_display_container">
                  <div>
                    <strong>${formatNumber(withdrawal.amount)}</strong>
                  </div>
                  <div>:סכום</div>
                </div>
              )}
              <div className="withdrawal_display_container">
                <div>{withdrawal.hebrew_date}</div>
                <div>:אידישע דאטום</div>
              </div>
              <div className="withdrawal_display_container">
                <div>{withdrawal.date}</div>
                <div>:דאטום</div>
              </div>
              {showButtons && (
                <div className="edit_payment_btn_container">
                  <div>
                    <Button onClick={handleEditCancel}>Cancel</Button>
                  </div>
                  <div>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );
};
export default WithdrawalsDetials;
