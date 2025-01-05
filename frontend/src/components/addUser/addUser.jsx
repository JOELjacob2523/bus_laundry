import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Input, message, Select } from "antd";
import { userInfo } from "../../servers/postRequest";
import React, { useState } from "react";
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

const AddUserForm = ({ handleCancel, onUserAdded }) => {
  const [resetKey, setResetKey] = useState(0);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const addedUser = await userInfo(values);
      onUserAdded(addedUser);
      setResetKey((prevKey) => prevKey + 1);
      handleCancel();
      message.success("Student added successfully", 2);
    } catch (error) {
      console.error("Error adding user:", error);
      navigate("/error500");
    }
  };

  return (
    <>
      <Form
        {...layout}
        onFinish={onFinish}
        className="add_user_form"
        validateMessages={validateMessages}
        key={resetKey}
        action="student/student_info"
        method="POST"
      >
        <Form.Item
          name="first_name"
          label=":ערשטע נאמען"
          colon={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="...ערשטע נאמען" />
        </Form.Item>
        <Form.Item
          name="last_name"
          label=":לעצטע נאמען"
          colon={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="...לעצטע נאמען" />
        </Form.Item>
        <Form.Item
          name="age"
          label=":יארגאנג"
          colon={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "שיעור צעירים", label: "שיעור צעירים" },
              { value: "'שיעור א", label: "'שיעור א" },
              { value: "'שיעור ב", label: "'שיעור ב" },
            ]}
            placeholder="...יארגאנג"
          />
        </Form.Item>
        <Form.Item
          name="address1"
          label=":אדרעסס 1"
          colon={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="... אדרעסס 1" />
        </Form.Item>

        <Form.Item
          name="address2"
          label=":2 אדרעסס"
          colon={false}
          rules={[
            {
              // required: true,
            },
          ]}
        >
          <Input placeholder="... אדרעסס 2" />
        </Form.Item>

        <Form.Item
          name="city"
          label=":סיטי"
          colon={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="... סיטי" />
        </Form.Item>

        <Form.Item
          name="state"
          label=":שטאט"
          colon={false}
          rules={[
            {
              min: 0,
              max: 10,
              required: true,
            },
          ]}
        >
          <Input placeholder="... שטאט" />
        </Form.Item>

        <Form.Item
          name="zip_code"
          label=":זיפ קאוד"
          colon={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="... זיפ קאוד" />
        </Form.Item>

        <Form.Item
          name="phone"
          label=":טעל. נומער"
          colon={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="... טעל. נומער" />
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

export default AddUserForm;
