import "./login.css";
import React, { useEffect, useState } from "react";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Card, Form, Input, Modal, Spin, Flex, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../../servers/userRequests/postUserRequest";
import ErrorLogin from "../errorAlert/errorLogin";
import UTAMesivtaLetterhead from "../../images/UTA_Mesivta_logo.png";
import ForgotPasswordForm from "../forgotPessword/forgotPassword";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

const UserLogin = () => {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setAuthData } = useAuth();

  const navigate = useNavigate();

  // set loading to false after 3 seconds
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  // Modal functions
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Login function
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        setAuthData({
          isAuthenticated: true,
          userId: response.data.user_id,
          parent_admin_id: response.data.userInfo.parent_admin_id,
          first_name: response.data.userInfo.first_name,
          last_name: response.data.userInfo.last_name,
          role: response.data.userInfo.role,
          email: response.data.userInfo.email,
          yeshiva: response.data.userInfo.yeshiva,
          user_logo: response.data.userInfo.user_logo,
          CC_link: response.data.userInfo.CC_link,
        });
        navigate("/home");
      } else {
        console.error("Login failed with status:", response.status);
        setError("Incorrect username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Incorrect username or password. Please try again.");
    }
    setLoading(false);
  };

  // if (loading) {
  //   return (
  //     <Flex className="loading_flax">
  //       <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  //       Loading...
  //     </Flex>
  //   );
  // }

  // loading screen
  if (loading) {
    return (
      <div>
        <div id="box"></div>
        <div className="loading_text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="login_main_container">
      <div className="login_inner_container">
        <div className="KY_letterhead_img_container">
          <img
            className="KY_letterhead_img"
            alt="UTAMesivtaLetterhead"
            src={UTAMesivtaLetterhead}
          />
        </div>
        {error && <ErrorLogin message={error} />}
        <div className="login_card_container">
          <Card title="Login" className="login_card">
            <Form
              name="normal_login"
              className="login_form"
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input prefix={<MdOutlineEmail />} placeholder="Email..." />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<TbPasswordUser />}
                  placeholder="Password..."
                />
              </Form.Item>

              <Form.Item>
                {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Button
                  type="link"
                  className="login_form_forgot"
                  onClick={showModal}
                >
                  <div>Forgot password</div>
                </Button>
              </Form.Item>

              <Form.Item>
                <div className="login_form_footer">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login_form_button"
                  >
                    Login
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
      <Modal
        title="Forogt Password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ForgotPasswordForm />
      </Modal>
    </div>
  );
};
export default UserLogin;
