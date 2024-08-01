import "./buses.css";
import { Card, Checkbox, Divider, Modal } from "antd";
import { EditOutlined, DollarOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditUser from "../editUser/editUser";
import PaymentOptions from "../paymentsOptions/paymentsOptions";
import { TbCreditCardPay } from "react-icons/tb";
import PaymentForm from "../payments/paymentForm";
import DeleteUser from "../deleteUser/deleteUser";
import StudentBalance from "../balance/balance";
import StudentBalanceInfo from "../studentBalanceInfo/studentBalanceInfo";

const UserCard = ({ student, payment, isSelected, handleCheckboxChange }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isCCModalVisible, setIsCCModalVisible] = useState(false);

  const URL = "https://secure.cardknox.com/congmesivta";

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

  return (
    <div className="main_card_container">
      <Card
        title={
          <div className="student_title_container">
            <div>
              {student.first_name ? student.first_name : "N/A"}{" "}
              {student.last_name ? student.last_name : "N/A"}
            </div>
            <div className="student_title_delete_options">
              <div>
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(student.student_id)}
                >
                  Archive
                </Checkbox>
              </div>
              <div>
                <DeleteUser student={student} />
              </div>
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
          <div>{student.age ? student.age : "N/A"}</div>
        </div>
        <div className="user_info_container">
          <div>Address 1</div>
          <div>{student.address1 ? student.address1 : "N/A"}</div>
        </div>
        <div className="user_info_container">
          <div>Address 2</div>
          <div>{student.address2 ? student.address2 : "N/A"}</div>
        </div>
        <div className="user_info_container">
          <div>City</div>
          <div>{student.city ? student.city : "N/A"}</div>
        </div>
        <div className="user_info_container">
          <div>State</div>
          <div>{student.state ? student.state : "N/A"}</div>
        </div>
        <div className="user_info_container">
          <div>Zip Code</div>
          <div>{student.zip_code ? student.zip_code : "N/A"}</div>
        </div>
        <div className="user_info_container">
          <div>Phone Number</div>
          <div>
            {student.phone
              ? student.phone.replace(/^(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
              : "N/A"}
          </div>
        </div>
        <Divider orientation="left">Balance</Divider>
        <div className="balance_container">
          <div>
            <StudentBalance payment={payment} />
          </div>
          <div>
            <StudentBalanceInfo payment={payment} />
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
