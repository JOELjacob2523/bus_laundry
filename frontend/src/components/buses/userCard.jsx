import "./buses.css";
import { Card, Modal, Checkbox, Popconfirm } from "antd";
import {
  EditOutlined,
  DollarOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import EditUser from "../editUser/editUser";
import PaymentOptions from "../paymentsOptions/paymentsOptions";
import { TbCreditCardPay } from "react-icons/tb";
import PaymentForm from "../payments/paymentForm";

const UserCard = ({ user }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isCCModalVisible, setIsCCModalVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

  const onCheckboxChange = (e) => {
    setIsDeleteVisible(true);
    setIsChecked(e.target.checked);
  };

  const handleDeleteOk = () => {
    setIsDeleteVisible(false);
    setIsChecked(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteVisible(false);
    setIsChecked(false);
  };

  const setVisible = (visible) => {
    setIsDeleteVisible(visible);
    setIsChecked(false);
  };

  return (
    <div>
      <Card
        title={
          <div className="title_container">
            <div>
              {user.first_name} {user.last_name}
            </div>
            <div>
              <Checkbox checked={isChecked} onChange={onCheckboxChange}>
                Delete
              </Checkbox>

              <Popconfirm
                visible={isDeleteVisible}
                onVisibleChange={setVisible}
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}
                okText="Delete"
                placement="topRight"
                title="Delete the user"
                description="Are you sure you want to delete this user?"
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
              ></Popconfirm>
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
