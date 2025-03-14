import "./profile.css";
import React, { useEffect, useState } from "react";
import { updateUserProfile } from "../../servers/userRequests/postUserRequest";
import {
  getStudentLoginInfo,
  verifyAdminPassword,
} from "../../servers/userRequests/getUserRequest";
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
  Space,
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

const Profile = ({ authData, setAuthData, toggleDarkMode }) => {
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
  const [userInfo, setUserInfo] = useState("");

  const [form] = Form.useForm();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const savedMode = localStorage.getItem("darkMode");
  //   if (savedMode) {
  //     setIsDarkMode(savedMode === "true");
  //     document.body.className =
  //       savedMode === "true" ? "dark_mode" : "light_mode";
  //   }
  // }, []);

  // fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentLoginInfo(authData.userId);
        setUserInfo(data);
      } catch (err) {
        console.error(err);
        navigate("/error500");
      }
    };
    fetchData();
  }, [authData.userId, navigate]);

  // handle form submission
  const onFinish = async (values) => {
    try {
      const formData = { ...values, role: value || userInfo.role };
      await updateUserProfile(formData);
      setUserInfo((prev) => ({ ...prev, ...formData }));
      form.setFieldsValue(formData);
      setIsDisabled(true);
      setShowButtons(false);
      setIsModalOpen(false);
      setAuthData((prev) => ({ ...prev, ...formData }));
      message.success("User updated successfully", 2);
    } catch (error) {
      console.error("Error updating student:", error);
      navigate("/error500");
    }
  };

  // set target value
  const onRadioChange = (e) => {
    setValue(e.target.value);
  };

  // modal functions
  const showPermissionModal = () => {
    setIsPermissionModalOpen(true);
  };

  // verify admin password
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

  // cancel permission modal
  const handlePermissionCancel = () => {
    setIsPermissionModalOpen(false);
    setKey(key + 1);
  };

  // show modal
  const showModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  // cancel modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setModalType("");
    setIsDisabled(true);
    setKey(key + 1);
  };

  // handle edit profile
  const handleEditUserProfile = () => {
    setIsDisabled(false);
    setShowButtons(true);
    authData.role === "Administrator" && setIsVerified(true);
  };

  // cancel edit profile
  const handleCancelEditUserProfile = () => {
    setIsDisabled(true);
    setShowButtons(false);
  };

  // handle menu click
  const handleMenuClick = (e) => {
    if (e.key === "1") {
      showModal("profile");
    } else if (e.key === "2") {
      showModal("settings");
    } else if (e.key === "3") navigate("/");
  };

  return (
    <div>
      <div style={{ paddingBottom: "7px" }}>
        <Dropdown
          menu={{
            items,
            onClick: handleMenuClick,
            style: { width: "175px" },
          }}
          arrow={true}
          placement="bottomLeft"
          className="dropdown"
        >
          <Space>
            <Avatar size={36} icon={<UserOutlined />} className="profile" />
          </Space>
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
                  form={form}
                  validateMessages={validateMessages}
                  initialValues={userInfo}
                  onFinish={onFinish}
                  key={key}
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

                    <div className="profile_data_container">
                      <div>Yeshiva:</div>
                      <div className="profile_input">
                        <Form.Item
                          name="yeshiva"
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
                              <Radio value="Manager">Manager</Radio>
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
            Permission denied, Please enter admin password to continue. If you
            do not have the password, please contact your administrator. Thank
            you!
          </div>
          <div className="permission_input_container">
            <Input.Password
              key={key}
              placeholder="Admin Password..."
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
