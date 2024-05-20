import "./editUser.css";
import { Button, Form, Input, InputNumber, message } from "antd";
import { getUserInfo } from "../../servers/getRequest";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const EditUser = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const onFinish = () => {
    try {
      messageApi.open({
        type: "success",
        content: "User added successfully",
      });
      setTimeout(() => {
        navigate("/buses");
      }, 2000);
    } catch (error) {
      console.error("Error adding user:", error);
      messageApi.open({
        type: "error",
        content: "Failed to add user",
      });
    }
  };

  return (
    <>
      {contextHolder}
      {/* {userInfo.map((user, index) => (
        <div key={index}> */}
      <Form
        {...layout}
        onFinish={onFinish}
        className="edit_user_form"
        validateMessages={validateMessages}
      >
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
      {/* </div>
      ))} */}
    </>
  );
};

export default EditUser;
