import "./buses.css";
import { Card, Divider, Modal } from "antd";
import { EditOutlined, DollarOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditUser from "../editUser/editUser";
import PaymentOptions from "../paymentsOptions/paymentsOptions";
import { TbCreditCardPay } from "react-icons/tb";
import PaymentForm from "../payments/paymentForm";
import DeleteUser from "../deleteUser/deleteUser";

const UserCard = ({ student, payment }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isCCModalVisible, setIsCCModalVisible] = useState(false);

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

  const totalPayments = payment.reduce(
    (acc, pay) => acc + parseFloat(pay.total_paid),
    0
  );

  return (
    <div className="main_card_container">
      <Card
        title={
          <div className="title_container">
            <div>
              {student.first_name} {student.last_name}
            </div>
            <div>
              <DeleteUser student={student} />
            </div>
          </div>
        }
        bordered={false}
        actions={[
          <EditOutlined onClick={showEditModal} />,
          <DollarOutlined onClick={showPaymentModal} />,
          <TbCreditCardPay onClick={showCCModal} />,
        ]}
      >
        <div className="user_info_container">
          <div>Age</div>
          <div>{student.age}</div>
        </div>
        <div className="user_info_container">
          <div>Address 1</div>
          <div>{student.address1}</div>
        </div>
        <div className="user_info_container">
          <div>Address 2</div>
          <div>{student.address2}</div>
        </div>
        <div className="user_info_container">
          <div>City</div>
          <div>{student.city}</div>
        </div>
        <div className="user_info_container">
          <div>State</div>
          <div>{student.state}</div>
        </div>
        <div className="user_info_container">
          <div>Zip Code</div>
          <div>{student.zip_code}</div>
        </div>
        <Divider orientation="left">Balance</Divider>
        <div className="payment_info_container">
          {payment.length === 0 ? (
            <div>No payments found</div>
          ) : (
            <div>${totalPayments}</div>
          )}
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
          <EditUser studentId={student.student_id} token={student.token} />
        </Modal>
        <Modal
          title="Payment Options"
          open={isPaymentModalVisible}
          onOk={handlePaymentOk}
          onCancel={handlePaymentCancel}
          footer={null}
        >
          <PaymentOptions
            studentId={student.student_id}
            token={student.token}
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
