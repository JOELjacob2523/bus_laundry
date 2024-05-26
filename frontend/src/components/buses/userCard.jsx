import "./buses.css";
import { Card, Modal } from "antd";
import { EditOutlined, DollarOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditUser from "../editUser/editUser";
import PaymentOptions from "../paymentsOptions/paymentsOptions";

const UserCard = ({ user }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

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

  return (
    <div>
      <Card
        title={`${user.first_name} ${user.last_name}`}
        bordered={false}
        actions={[
          <EditOutlined onClick={showEditModal} />,
          <DollarOutlined onClick={showPaymentModal} />,
        ]}
      >
        <div className="user_info_container">
          <div>Age</div>
          <div>{user.age}</div>
        </div>
        <div className="user_info_container">
          <div>Address 1</div>
          <div>{user.address1}</div>
        </div>
        <div className="user_info_container">
          <div>Address 2</div>
          <div>{user.address2}</div>
        </div>
        <div className="user_info_container">
          <div>City</div>
          <div>{user.city}</div>
        </div>
        <div className="user_info_container">
          <div>State</div>
          <div>{user.state}</div>
        </div>
        <div className="user_info_container">
          <div>Zip Code</div>
          <div>{user.zip_code}</div>
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
          <EditUser userId={user.user_id} token={user.token} />
        </Modal>
        <Modal
          title="Payment Options"
          open={isPaymentModalVisible}
          onOk={handlePaymentOk}
          onCancel={handlePaymentCancel}
          footer={null}
        >
          <PaymentOptions userId={user.user_id} token={user.token} />
        </Modal>
      </div>
    </div>
  );
};

export default UserCard;
