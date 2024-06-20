import "./login.css";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Checkbox, Card, Form, Input } from "antd";

const UserLogin = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <div className="login_main_container">
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
              name="first_name"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="First Name"
              />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Last Name"
              />
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
                  Log in
                </Button>
                <div className="signup_link">
                  Dont have an account? <a href="/signup">Register now!</a>
                </div>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default UserLogin;
