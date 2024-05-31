import "./deleteUser.css";
import { Modal, Button } from "antd";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { deleteUserInfo } from "../../servers/postRequest";

const DeleteUser = ({ user }) => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log("Delete confirmed for user:", user.user_id);
    try {
      await deleteUserInfo(user.user_id);
      Modal.success({
        title: "Success",
        content: "User deleted successfully",
        footer: null,
      });
      console.log(`User with ${user.user_id} deleted successfully`);
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.error("Failed to delete user:", error);
      Modal.error({
        title: "Error",
        content: "Failed to delete user",
        footer: null,
      });
    }
  };

  return (
    <div>
      <RiDeleteBin5Line
        onClick={() => setVisible(true)}
        className="delete_icon_outer"
      />
      <Modal
        title={
          <div className="title_header">
            <CgDanger className="delete_icon" /> Confirm Deletion
          </div>
        }
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete '{user.first_name} {user.last_name}' ?
        </p>
      </Modal>
    </div>
  );
};

export default DeleteUser;
