import "./deleteUser.css";
import { Modal, Button, message } from "antd";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { deleteUserInfo } from "../../servers/postRequest";
import { useAuth } from "../AuthProvider/AuthProvider";

const DeleteUser = ({ student, setFilteredUserInfo }) => {
  const [visible, setVisible] = useState(false);
  const { authData } = useAuth();

  const navigate = useNavigate();

  // hendle delete user
  const handleDelete = async () => {
    try {
      await deleteUserInfo(student.student_id);
      setFilteredUserInfo((prev) =>
        prev.filter((user) => user.student_id !== student.student_id)
      );
      message.success("Student deleted successfully", 2);
    } catch (error) {
      console.error("Failed to delete student:", error);
      navigate("/error500");
    }
  };

  return (
    <div>
      {authData.role === "Administrator" || authData.role === "Manager" ? (
        <RiDeleteBin5Line
          onClick={() => setVisible(true)}
          className="delete_icon_outer"
        />
      ) : null}
      <Modal
        title={
          <div className="title_header">
            <CgDanger className="delete_icon" /> באשטעטיג אויסמעקן
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
          {student.last_name} <br />! מען וועט נישט קענען צוריקקערן די
          אינפארמאציע
        </div>
      </Modal>
    </div>
  );
};

export default DeleteUser;
