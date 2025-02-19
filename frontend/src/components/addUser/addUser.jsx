import "./addUser.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Input, message, Select } from "antd";
import { userInfo } from "../../servers/postRequest";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

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

const AddUserForm = ({ handleCancel, onUserAdded, authData }) => {
  const [resetKey, setResetKey] = useState(0);
  const [parentAdminId, setParentAdminId] = useState("");
  const navigate = useNavigate();

  const { fetchStudentData } = useAuth();

  // set the parent admin id
  useEffect(() => {
    authData.role === "Administrator"
      ? setParentAdminId(authData.userId)
      : setParentAdminId(authData.parent_admin_id);
  }, [authData]);

  // handle the form submission
  const onFinish = async (values) => {
    try {
      const formData = { ...values, user_id: parentAdminId };
      const addedUser = await userInfo(formData);
      onUserAdded(addedUser);
      setResetKey((prevKey) => prevKey + 1);
      await fetchStudentData();
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
        <div className="add_user_form_items_container">
          <div style={{ display: "none" }}>
            <Form.Item name="user_id" value={parentAdminId}>
              <Input hidden={true} />
            </Form.Item>
          </div>

          <Form.Item
            name="first_name"
            label="ערשטע נאמען"
            style={{ width: "500px" }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="ערשטע נאמען..." />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="לעצטע נאמען"
            style={{ width: "500px" }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="לעצטע נאמען..." />
          </Form.Item>

          <Form.Item
            name="age"
            label="יארגאנג"
            style={{ width: "500px" }}
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
              placeholder="יארגאנג..."
            />
          </Form.Item>

          <Form.Item
            name="address1"
            label="אדרעסס 1"
            style={{ width: "500px" }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="אדרעסס 1..." />
          </Form.Item>

          <Form.Item
            name="address2"
            label="2 אדרעסס"
            style={{ width: "500px" }}
            rules={[
              {
                // required: true,
              },
            ]}
          >
            <Input placeholder="אדרעסס 2..." />
          </Form.Item>

          <Form.Item
            name="city"
            label="סיטי"
            style={{ width: "500px" }}
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
            label="שטאט"
            style={{ width: "500px" }}
            rules={[
              {
                min: 0,
                max: 10,
                required: true,
              },
            ]}
          >
            <Input placeholder="שטאט..." />
          </Form.Item>

          <Form.Item
            name="zip_code"
            label="זיפ קאוד"
            style={{ width: "500px" }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="זיפ קאוד..." />
          </Form.Item>
        </div>

        <Form.Item
          name="phone"
          label="טעל. נומער"
          style={{ width: "500px", direction: "rtl" }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="טעל. נומער..." />
        </Form.Item>

        <div className="add_user_form_btn_container">
          <Button onClick={handleCancel} style={{ width: "200px" }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" style={{ width: "200px" }}>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddUserForm;
