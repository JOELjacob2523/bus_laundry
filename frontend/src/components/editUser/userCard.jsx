import "./editUser.css";
import { Card, Modal } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditUser from "../editUser/editUser";

const UserCard = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card
        title={`${user.first_name} ${user.last_name}`}
        bordered={false}
        actions={[
          <EditOutlined onClick={showModal} />,
          <EllipsisOutlined key="ellipsis" />,
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
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <EditUser userId={user.user_id} token={user.token} />
        </Modal>
      </div>
    </div>
  );
};

export default UserCard;
