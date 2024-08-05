import "./deleteUser.css";
import { Modal, Button } from "antd";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { deleteUserInfo } from "../../servers/postRequest";

const DeleteUser = ({ student }) => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log("Delete confirmed for student:", student.student_id);
    try {
      await deleteUserInfo(student.student_id);
      Modal.success({
        title: "Success",
        content: "Student deleted successfully",
        footer: null,
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.error("Failed to delete student:", error);
      Modal.error({
        title: "Error",
        content: "Failed to delete student",
        footer: null,
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
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
        open={visible}
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
        <div>
          ? "דו ביזט זיכער אז דו ווילסט אויסמעקן "{student.first_name}{" "}
          {student.last_name}
        </div>
      </Modal>
    </div>
  );
};

export default DeleteUser;
