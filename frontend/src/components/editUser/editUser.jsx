import "./editUser.css";
import { Button, Form, Input, InputNumber, message, Spin, Modal } from "antd";
import { getUserInfoById } from "../../servers/getRequest";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../../servers/postRequest";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

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
/* eslint-enable no-template-curly-in-string */

const EditUser = ({ userId, token }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // if (!userId || !token) {
      //   console.error("Missing userId or token");
      //   setLoading(false);
      //   return;
      // }
      try {
        const data = await getUserInfoById(userId, token);
        if (data && data.user_id) {
          setUserInfo(data);
        } else {
          console.error("Invalid user data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, token]);

  const onFinish = async (values) => {
    try {
      await updateUserInfo(values);
      Modal.success({
        title: "This is an success message",
        content: "User updated successfully",
        footer: null,
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.error("Error updating user:", error);
      Modal.error({
        title: "This is an error message",
        content: "Failed to update user",
        footer: null,
      });
    }
  };

  if (loading) {
    return <Spin fullscreen={true} tip="Loading..." />;
  }

  if (!userInfo) return <div>User not found</div>;

  return (
    <>
      {contextHolder}
      <Form
        {...layout}
        onFinish={onFinish}
        className="edit_user_form"
        validateMessages={validateMessages}
        initialValues={userInfo}
        action="/update_user_info"
        method="POST"
      >
        <Form.Item name="user_id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              type: "number",
              min: 10,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="address1"
          label="Address 1"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address2"
          label="Address 2"
          rules={[
            {
              // required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="state"
          label="State"
          rules={[
            {
              min: 0,
              max: 10,
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="zip_code"
          label="Zip Code"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUser;
