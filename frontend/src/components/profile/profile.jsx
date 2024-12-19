import "./profile.css";
import React, { useEffect, useState } from "react";
import { updateUserProfile } from "../../servers/userRequests/postUserRequest";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Radio,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import items from "../header/headerItems";
import { useNavigate } from "react-router-dom";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-disable no-template-curly-in-string */

const Profile = ({ userInfo, setUserInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
      document.body.className =
        savedMode === "true" ? "dark_mode" : "light_mode";
    }
  }, []);

  const onFinish = async (values) => {
    try {
      const formData = { ...values, role: value };
      await updateUserProfile(formData);
      setUserInfo(formData);
      setIsDisabled(true);
      setShowButtons(false);
      setIsModalOpen(false);
      message.success("User updated successfully", 1.5);
    } catch (error) {
      console.error("Error updating student:", error);
      navigate("/error500");
    }
  };

  const onRadioChange = (e) => {
    setValue(e.target.value);
  };

  const showModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setModalType("");
    setIsDisabled(true);
  };

  const handleEditUserProfile = () => {
    setIsDisabled(false);
    setShowButtons(true);
  };

  const handleCancelEditUserProfile = () => {
    setIsDisabled(true);
    setShowButtons(false);
  };

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      showModal("profile");
    } else if (e.key === "2") {
      showModal("settings");
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.className = newMode ? "dark_mode" : "light_mode";
  };

  return (
    <div>
      <div>
        <Dropdown
          menu={{
            items,
            onClick: handleMenuClick,
          }}
          placement="bottomLeft"
          className="dropdown"
        >
          <Avatar size={48} icon={<UserOutlined />} className="profile" />
        </Dropdown>
      </div>
      <Modal
        title={modalType === "profile" ? "My Profile" : "Settings"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {modalType === "profile" ? (
          <div>
            <Card>
              <div className="main_profile_container">
                <Form
                  validateMessages={validateMessages}
                  initialValues={userInfo}
                  onFinish={onFinish}
                >
                  <div className="edit_profile_btn">
                    <Button
                      type="primary"
                      onClick={handleEditUserProfile}
                      style={{ width: "200px" }}
                    >
                      Edit Profile
                    </Button>
                  </div>
                  <div>
                    <div className="profile_data_container">
                      <Form.Item name="user_id" hidden={true}>
                        <Input />
                      </Form.Item>
                      <div>First Name:</div>
                      <div className="profile_input">
                        <Form.Item
                          name="first_name"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input disabled={isDisabled} />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="profile_data_container">
                      <div>Last Name:</div>
                      <div className="profile_input">
                        <Form.Item
                          name="last_name"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input disabled={isDisabled} />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="profile_data_container">
                      <div>Email:</div>
                      <div className="profile_input">
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input disabled={isDisabled} />
                        </Form.Item>
                      </div>
                    </div>
                    {isDisabled && (
                      <div className="profile_data_container">
                        <div>Role:</div>
                        <div className="profile_input">
                          <Form.Item
                            name="role"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input disabled />
                          </Form.Item>
                        </div>
                      </div>
                    )}
                  </div>
                  {showButtons && (
                    <div>
                      <div className="profile_role_container">
                        <div>Set Role:</div>
                        <div>
                          <Radio.Group
                            name="role"
                            value={value}
                            onChange={onRadioChange}
                          >
                            <Radio value="Administrator">Administrator</Radio>
                            <Radio value="User">User</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                      <div className="profile_confirm_edit_container">
                        <div>
                          <Button onClick={handleCancelEditUserProfile}>
                            Cancel
                          </Button>
                        </div>
                        <div>
                          <Button type="primary" htmlType="submit">
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Form>
              </div>
            </Card>
          </div>
        ) : modalType === "settings" ? (
          <div>
            <div className="settings_mode_container">
              <div>Set Mode:</div>
              <div>
                <Button onClick={toggleDarkMode}>
                  {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Profile;
