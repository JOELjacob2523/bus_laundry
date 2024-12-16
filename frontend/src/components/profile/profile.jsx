import "./profile.css";
import React, { useEffect, useState } from "react";
import { getStudentLoginInfo } from "../../servers/userRequests/getUserRequest";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Avatar, Button, Card, Dropdown, Input, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import items from "../header/headerItems";

const Profile = () => {
  const { authData } = useAuth();
  const [userInfo, setUserInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      //get user info by id
      const data = await getStudentLoginInfo(authData.userId);
      setUserInfo(data);
    };
    fetchData();
  }, [authData.userId]);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
      document.body.className =
        savedMode === "true" ? "dark_mode" : "light_mode";
    }
  }, []);

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
                    <div>First Name:</div>
                    <div className="profile_input">
                      <Input
                        value={`${userInfo.first_name}`}
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                  <div className="profile_data_container">
                    <div>Last Name:</div>
                    <div className="profile_input">
                      <Input
                        value={`${userInfo.last_name}`}
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                  <div className="profile_data_container">
                    <div>Email:</div>
                    <div className="profile_input">
                      <Input
                        value={`${userInfo.email}`}
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                </div>
                {showButtons && (
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
                )}
              </div>
            </Card>
          </div>
        ) : modalType === "settings" ? (
          <div>
            <div>
              <Button onClick={toggleDarkMode}>
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Profile;
