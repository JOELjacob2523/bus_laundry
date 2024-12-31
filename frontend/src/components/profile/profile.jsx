import "./profile.css";
import React, { useEffect, useState } from "react";
import { updateUserProfile } from "../../servers/userRequests/postUserRequest";
import { verifyAdminPassword } from "../../servers/userRequests/getUserRequest";
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
import { UserOutlined, EditOutlined } from "@ant-design/icons";
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

const Profile = ({ userInfo, setUserInfo, authData, setStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [value, setValue] = useState("");
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [key, setKey] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const [form] = Form.useForm();

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
      setUserInfo((prev) => ({ ...prev, ...formData }));
      form.setFieldsValue(formData);
      setStatus(value);
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

  const showPermissionModal = () => {
    setIsPermissionModalOpen(true);
  };

  const handlePermissionOk = async () => {
    const response = await verifyAdminPassword(password);
    if (!response) {
      message.error("Please enter the admin password!");
      return;
    }

    if (response) {
      setIsVerified(true);
      setIsPermissionModalOpen(false);
      setKey(key + 1);
      message.success("Password verified successfully!");
    } else {
      message.error("Incorrect password. Please try again.");
    }
  };

  const handlePermissionCancel = () => {
    setIsPermissionModalOpen(false);
    setKey(key + 1);
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
    authData.role === "Administrator" && setIsVerified(true);
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
        key={key}
      >
        {modalType === "profile" ? (
          <div>
            <Card>
              <div className="main_profile_container">
                <Form
                  form={form}
                  validateMessages={validateMessages}
                  initialValues={userInfo}
                  onFinish={onFinish}
                >
                  <div className="edit_profile_btn">
                    <Button onClick={handleEditUserProfile}>
                      <EditOutlined />
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
                      <div>Password:</div>
                      <div className="profile_input">
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                        >
                          <Input.Password disabled={isDisabled} />
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
                          {isVerified ? (
                            <Radio.Group
                              name="role"
                              value={value || userInfo.role}
                              onChange={onRadioChange}
                              disabled={!isVerified}
                            >
                              <Radio value="Administrator">Administrator</Radio>
                              <Radio value="Super Admin">Super Admin</Radio>
                              <Radio value="User">User</Radio>
                            </Radio.Group>
                          ) : (
                            <Button type="dashed" onClick={showPermissionModal}>
                              Set Role
                            </Button>
                          )}
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
            <Card className="settings_card">
              <div className="settings_mode_container">
                <div>Set Mode:</div>
                <div>
                  <Button onClick={toggleDarkMode} type="primary">
                    {isDarkMode
                      ? "Switch to Light Mode"
                      : "Switch to Dark Mode"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ) : null}
      </Modal>
      <Modal
        title="Permission Denied"
        open={isPermissionModalOpen}
        onOk={handlePermissionOk}
        onCancel={handlePermissionCancel}
        footer={null}
        style={{ zIndex: 1000 }}
      >
        <div className="permission_container">
          <div className="permission_text">
            Permission denied, Please enter admin password
          </div>
          <div className="permission_input_container">
            <Input.Password
              key={key}
              placeholder="Admin Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePermissionOk()}
            />
          </div>
          <div className="permission_btn_container">
            <Button onClick={handlePermissionCancel}>Cancel</Button>
            <Button type="primary" onClick={handlePermissionOk}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
