import React, { useEffect, useState } from "react";
import { Button, Modal, Collapse, theme, Divider, Empty, Spin } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "./userCardInfo.css";
import { getUserInfoById } from "../../servers/getRequest";
import EditUser from "../editUser/editUser";
import EditUserPayment from "../editPayments/editPayments";
import { useAuth } from "../AuthProvider/AuthProvider";

const UserCardInfo = ({
  student,
  payment,
  showPaymentModal,
  studentId,
  updatePayment,
  userPaymentInfo,
  setUserPaymentInfo,
}) => {
  const { authData } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [userDisabled, setUserDisabled] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = theme.useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfoById(studentId, token);
        if (data && data.student_id) {
          setUserInfo(data);
        } else {
          console.error("Invalid user data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId, token]);

  const handleEditClick = () => {
    setUserDisabled(false);
    setShowButtons(true);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setUserDisabled(true);
    setShowButtons(false);
    setIsEditing(false);
  };

  if (loading) {
    return <Spin spinning="loading" tip="Loading..." fullscreen={true} />;
  }

  if (!userInfo)
    return (
      <div>
        <Empty description="User not found" />
      </div>
    );

  const URL =
    "https://secure.cardknox.com/kedishesyoel?AmountLocked=0&xCommand=cc%3Asale";

  const parseValue = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatPaymentType = (paymentType) => {
    if (!paymentType) return "N/A";
    return paymentType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" & ");
  };

  const aggregatedPayment = payment.reduce(
    (acc, pay) => {
      acc.cash += parseValue(pay.cash);
      acc.checks += parseValue(pay.checks);
      acc.credit_card += parseValue(pay.credit_card);
      acc.payment_type = formatPaymentType(pay.payment_type);
      acc.pay_date = acc.pay_date || pay.pay_date || "N/A";
      acc.total_paid += parseValue(pay.total_paid);
      return acc;
    },
    {
      cash: 0,
      checks: 0,
      credit_card: 0,
      total_paid: 0,
      payment_type: "N/A",
    }
  );

  const creditCardPay = () => {
    return window.open(URL, "_blank");
  };

  return (
    <div>
      <div className="user_info_btn">
        <Button
          type="link"
          onClick={() => setModalOpen(true)}
          style={{ color: "black" }}
        >
          <div style={{ fontFamily: "OYoelTovia", fontSize: "20px" }}>
            דרוק פאר אינפארמאציע פון הב'{" "}
            <strong style={{ fontFamily: "OYoelToviaBold" }}>
              {student.first_name} {student.last_name}
            </strong>
          </div>
        </Button>
      </div>
      <Modal
        title={
          <div className="user_info_title">
            {student.first_name ? student.first_name : "N/A"}{" "}
            {student.last_name ? student.last_name : "N/A"}
          </div>
        }
        centered
        width={800}
        open={modalOpen}
        // onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <div>
          <Divider></Divider>
          {authData.role === "Administrator" ||
          authData.role === "Super Admin" ? (
            <div className="user_info_options_btn_container">
              <div className="user_info_options_btn">
                <Button type="primary" onClick={handleEditClick}>
                  Edit User
                </Button>
              </div>
              {aggregatedPayment.total_paid > 0 ? null : (
                <div className="user_info_options_btn">
                  <Button type="primary" onClick={() => showPaymentModal()}>
                    Make a payment
                  </Button>
                </div>
              )}

              <div className="user_info_options_btn">
                <Button type="primary" onClick={creditCardPay}>
                  Pay with CC
                </Button>
              </div>
            </div>
          ) : null}
          <Divider></Divider>
          <div className="user_info_main_container">
            <EditUser
              studentId={studentId}
              student={student}
              handleEditCancel={handleEditCancel}
              showButtons={showButtons}
              disabled={userDisabled}
              isEditing={isEditing}
              setUserDisabled={setUserDisabled}
              setShowButtons={setShowButtons}
              setModalOpen={setModalOpen}
            />
          </div>
        </div>

        <div>
          <Divider></Divider>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{
              background: token.colorBgContainer,
            }}
            items={[
              {
                // key: "1",
                label: "Payment Information",
                children:
                  aggregatedPayment.total_paid === 0 ? (
                    <div>
                      <Empty description="No payments found" />
                    </div>
                  ) : (
                    <div>
                      <div>
                        <EditUserPayment
                          studentId={studentId}
                          student={student}
                          payment={payment}
                          updatePayment={updatePayment}
                          userPaymentInfo={userPaymentInfo}
                          setUserPaymentInfo={setUserPaymentInfo}
                        />
                      </div>
                    </div>
                  ),
              },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserCardInfo;
