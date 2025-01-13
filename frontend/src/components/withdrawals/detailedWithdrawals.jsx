import "./detailedWithdrawals.css";
import React, { useState, useEffect } from "react";
import { Button, Descriptions, Empty, Form, Input, message } from "antd";
import { getAllWithdrawalInfoByAdminId } from "../../servers/getRequest";
import { updateWithdrawalInfo } from "../../servers/postRequest";
import { EditOutlined } from "@ant-design/icons";
import DeleteWithdrawal from "./deleteWithdrawal/deleteWithdrawal";
import { useAuth } from "../AuthProvider/AuthProvider";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const WithdrawalsDetials = ({
  handleEdit,
  showButtons,
  setShowButtons,
  handleEditCancel,
  currentlyEditingId,
  setCurrentlyEditingId,
}) => {
  const [withdrawals, setWithdrawals] = useState([]);

  const { authData } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const adminIdData = await getAllWithdrawalInfoByAdminId(
        authData.parent_admin_id
      );
      setWithdrawals(adminIdData);
    }
    fetchData();
  }, [authData.parent_admin_id]);

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
      setCurrentlyEditingId(null);
      setShowButtons(false);
      message.success("Withdrawal updated successfully", 1.5);
    } catch (error) {
      console.error("Failed to update withdrawal:", error);
    }
  };

  return (
    <div>
      {withdrawals && withdrawals.length > 0 ? (
        <Descriptions title="געלט ארויס דעטאלן" layout="vertical" bordered>
          {withdrawals.map((withdrawal, index) => (
            <Descriptions.Item
              key={index}
              label={
                <div
                  className={
                    authData.role === "Administrator"
                      ? "withdrawal_display_container_admin"
                      : "withdrawal_display_container"
                  }
                >
                  {authData.role === "Administrator" && (
                    <div
                      className={
                        authData.role === "Administrator"
                          ? "withdrawal_display_container_inner_admin"
                          : "withdrawal_display_container_inner"
                      }
                    >
                      <div style={{ paddingTop: "3px" }}>
                        <EditOutlined
                          onClick={() => handleEdit(withdrawal.withdrawal_id)}
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
                  )}
                  <div
                    className={
                      authData.role === "Administrator"
                        ? "withdrawal_display_container_inner_admin"
                        : "withdrawal_display_container_inner"
                    }
                  >
                    <strong>{withdrawal.withdrawal_to}</strong>
                    <div>:ארויס פאר</div>
                  </div>
                </div>
              }
              span={3}
            >
              <Form initialValues={withdrawal} onFinish={onFinish}>
                <Form.Item name="withdrawal_id" hidden></Form.Item>
                {currentlyEditingId === withdrawal.withdrawal_id ? (
                  <div className="withdrawal_display_container_inner">
                    <div>
                      <Form.Item name="amount">
                        <Input />
                      </Form.Item>
                    </div>
                    <div>:סכום</div>
                  </div>
                ) : (
                  <div className="withdrawal_display_container_inner">
                    <div>
                      <strong>${formatNumber(withdrawal.amount)}</strong>
                    </div>
                    <div>:סכום</div>
                  </div>
                )}
                <div className="withdrawal_display_container_inner">
                  <div>{withdrawal.hebrew_date}</div>
                  <div>:אידישע דאטום</div>
                </div>
                <div className="withdrawal_display_container_inner">
                  <div>{withdrawal.date}</div>
                  <div>:דאטום</div>
                </div>
                {showButtons &&
                  currentlyEditingId === withdrawal.withdrawal_id && (
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
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};
export default WithdrawalsDetials;
