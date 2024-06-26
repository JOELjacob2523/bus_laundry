import "./forgotPassword.css";
import React, { useState } from "react";
import { sendEmail } from "../../servers/userRequests/postUserRequest";
import { Button, Card, Form, Input, message } from "antd";
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

const ForgotPasswordForm = ({ onEmailSent }) => {
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      await sendEmail(email);
      messageApi.open({
        type: "Success",
        content: "Email sent. Please check your email for instructions.",
      });
      onEmailSent();
    } catch (error) {
      console.error("Error sending email:", error);
      navigate("/error500");
    }
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <div className="forgot_password_head_container">
          <div className="forgot_password_head_1">Forgot Password?</div>{" "}
          <div className="forgot_password_head_2">
            Please enter your email to reset your password!
          </div>
        </div>
        <Form onFinish={handleSubmit} validateMessages={validateMessages}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="submit_forgot_password_btn"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
