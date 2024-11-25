import "./buses.css";
import { Card, Checkbox, Modal } from "antd";
import { EditOutlined, DollarOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditUser from "../editUser/editUser";
import PaymentOptions from "../paymentsOptions/paymentsOptions";
import { TbCreditCardPay } from "react-icons/tb";
import PaymentForm from "../payments/paymentForm";
import DeleteUser from "../deleteUser/deleteUser";
import UserCardInfo from "../userCardInfo/userCardInfo";

const UserCard = ({ student, payment, isSelected, handleCheckboxChange }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isCCModalVisible, setIsCCModalVisible] = useState(false);

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
        title={
          <div className="student_title_container">
            <div className="student_title_delete_options">
              <div>
                <DeleteUser student={student} />
              </div>
              <div>
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(student.student_id)}
                >
                  Archive
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
            showPaymentModal={showPaymentModal}
            studentId={student.student_id}
          />
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
