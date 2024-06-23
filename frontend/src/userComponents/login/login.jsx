import "./login.css";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Checkbox, Card, Form, Input, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../servers/userRequests/postUserRequest";
import ErrorLogin from "../errorAlert/errorLogin";

const UserLogin = ({ setIsAuthenticated }) => {
  const [isVisible, setIsVisible] = useState(true);
  // const [isMsgVisible, setIsMsgVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        setIsAuthenticated(true);
        setIsVisible(false);
        navigate("/home");
      } else {
        console.error("Login failed with status:", response.status);
        // setIsMsgVisible(true);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <div>
      <div className="login_main_container">
        {/* <div className="error_msg">
          <ErrorLogin />
        </div> */}
        <div className="login_card_container">
          <Card title="Login" className="login_card">
            <Form
              name="normal_login"
              className="login_form"
              initialValues={{
                remember: true,
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
                <Input prefix={<MdOutlineEmail />} />
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
                <Input.Password prefix={<TbPasswordUser />} />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<TbPasswordUser />} />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login_form_forgot" href="">
                  Forgot password
                </a>
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
                  <div className="signup_link">
                    Dont have an account?{" "}
                    <Link to="/signup">Register now!</Link>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
