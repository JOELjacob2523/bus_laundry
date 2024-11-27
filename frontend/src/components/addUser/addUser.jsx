import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Input, InputNumber, message } from "antd";
import { userInfo } from "../../servers/postRequest";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./addUser.css";

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

const FirstName = ({ handleCancel, onUserAdded }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await userInfo(values);
      message.success({
        content: "Student added successfully",
        duration: 5,
        onClose: navigate(0),
      });
    } catch (error) {
      console.error("Error adding user:", error);
      navigate("/error500");
    }
  };

  // const onFinish = async (values) => {
  //   try {
  //     const addedUser = await userInfo(values); // Assuming this returns the newly added user data
  //     console.log(addedUser);
  //     messageApi.open({
  //       type: "success",
  //       content: "Student added successfully",
  //     });

  //     // Update parent state dynamically
  //     onUserAdded(addedUser);

  //     // Optionally navigate or close modal if needed
  //     handleCancel();
  //   } catch (error) {
  //     console.error("Error adding user:", error);
  //     navigate("/error500");
  //   }
  // };

  return (
    <>
      <Form
        {...layout}
        onFinish={onFinish}
        className="add_user_form"
        validateMessages={validateMessages}
        action="student/student_info"
        method="POST"
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
          <Input />
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
          <Input />
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
          name="phone"
          label="Phone Number"
          rules={[
            {
              // required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 16,
          }}
        >
          <div className="add_user_form_container">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default FirstName;
