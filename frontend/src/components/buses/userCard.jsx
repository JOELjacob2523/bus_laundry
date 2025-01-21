import "./buses.css";
import { Card, Checkbox, Divider, Modal } from "antd";
import { EditOutlined, DollarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import EditUser from "../editUser/editUser";
import PaymentOptions from "../paymentsOptions/paymentsOptions";
import { TbCreditCardPay } from "react-icons/tb";
import PaymentForm from "../payments/paymentForm";
import DeleteUser from "../deleteUser/deleteUser";
import UserCardInfo from "../userCardInfo/userCardInfo";
import StudentBalance from "../balance/balance";
import { getPaymentInfoByStudentId } from "../../servers/getRequest";

const UserCard = ({
  student,
  payment,
  isSelected,
  handleCheckboxChange,
  updatePayment,
  setFilteredUserInfo,
  authData,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isCCModalVisible, setIsCCModalVisible] = useState(false);
  const [userPaymentInfo, setUserPaymentInfo] = useState(null);

  useEffect(() => {
    if (!student.student_id) return;
    const fetchData = async () => {
      try {
        const data = await getPaymentInfoByStudentId(student.student_id);
        if (data && data.student_id) {
          setUserPaymentInfo(data);
        } else {
          console.error("Invalid user data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [student.student_id]);

  const URL =
    "https://secure.cardknox.com/kedishesyoel?AmountLocked=0&xCommand=cc%3Asale";

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const showPaymentModal = () => {
    setIsPaymentModalVisible(true);
  };

  const handlePaymentOk = () => {
    setIsPaymentModalVisible(false);
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalVisible(false);
  };

  const showCCModal = () => {
    setIsCCModalVisible(true);
  };

  const handleCCOk = () => {
    setIsCCModalVisible(false);
  };

  const handleCCCancel = () => {
    setIsCCModalVisible(false);
  };

  const creditCardPay = () => {
    return window.open(URL, "_blank");
  };

  return (
    <div className="main_card_container">
      <Card
        type="inner"
        title={
          <div className="student_title_container">
            <div className="student_title_delete_options">
              <div>
                <DeleteUser
                  student={student}
                  setFilteredUserInfo={setFilteredUserInfo}
                />
              </div>
              <div>
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(student.student_id)}
                >
                  לייג אין די ארכיוון
                </Checkbox>
              </div>
            </div>
          </div>
        }
        bordered={false}
        // actions={[
        //   <EditOutlined onClick={showEditModal} />,
        //   <DollarOutlined onClick={showPaymentModal} />,
        //   // <TbCreditCardPay onClick={showCCModal} />,
        //   <TbCreditCardPay onClick={creditCardPay} />,
        // ]}
      >
        <div>
          <UserCardInfo
            student={student}
            payment={payment}
            updatePayment={updatePayment}
            showPaymentModal={showPaymentModal}
            studentId={student.student_id}
            userPaymentInfo={userPaymentInfo}
            setUserPaymentInfo={setUserPaymentInfo}
          />
        </div>
        <Divider orientation="left">Balance</Divider>
        <div className="balance_container">
          <div>
            <StudentBalance payment={payment} />
          </div>
        </div>
      </Card>
      <div className="edit_modal_container">
        <Modal
          title="Edit User"
          open={isEditModalVisible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
          footer={null}
        >
          <EditUser
            studentId={student.student_id}
            token={student.token}
            student={student}
            handleCancel={handleEditCancel}
          />
        </Modal>
        <Modal
          title="Payment Options"
          open={isPaymentModalVisible}
          onOk={handlePaymentOk}
          onCancel={handlePaymentCancel}
          zIndex={1050}
          footer={null}
        >
          <PaymentOptions
            studentId={student.student_id}
            token={student.token}
            handleCancel={handlePaymentCancel}
            updatePayment={updatePayment}
            setIsPaymentModalVisible={setIsPaymentModalVisible}
            setUserPaymentInfo={setUserPaymentInfo}
            authData={authData}
          />
        </Modal>
        <Modal
          title="Payment Options"
          open={isCCModalVisible}
          onOk={handleCCOk}
          onCancel={handleCCCancel}
          footer={null}
        >
          <PaymentForm />
        </Modal>
      </div>
    </div>
  );
};

export default UserCard;
