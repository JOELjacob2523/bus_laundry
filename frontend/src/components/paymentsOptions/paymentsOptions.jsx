import "./paymentsOptions.css";
import {
  Button,
  Form,
  Input,
  message,
  Spin,
  Modal,
  Radio,
  Divider,
} from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
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
  const [value, setValue] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
        content: "Payment added successfully",
        footer: null,
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.error("Error adding payment:", error);
      Modal.error({
        title: "This is an error message",
        content: "Failed to add payment",
        footer: null,
      });
    }
  };

  const onRadioChange = (e) => {
    console.log("redio checked", e.target.value);
    setValue(e.target.value);
  };

  if (loading) {
    return <Spin fullscreen={true} tip="Loading..." />;
  }

  if (!userInfo) return <div>User not found</div>;

  return (
    <>
      {/* {contextHolder} */}
      <Form
        {...layout}
        onFinish={onFinish}
        className="edit_user_form"
        validateMessages={validateMessages}
        initialValues={userInfo}
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

        <div className="payment_group_container">
          <Divider>Payment towards</Divider>

          <Radio.Group
            name="radio_group"
            value={value}
            onChange={onRadioChange}
          >
            <Radio value={1}>באס</Radio>
            <Radio value={2}>וואשן</Radio>
            <Radio value={3}>באס און וואשן</Radio>
          </Radio.Group>
        </div>

        <Form.Item name="cash" label="Cash">
          <Input
            className="cash_input"
            prefix={<BsCurrencyDollar />}
            placeholder="Enter cash amount..."
          />
        </Form.Item>

        <Form.Item name="check" label="Check">
          <Input
            className="check_input"
            prefix={<BsCurrencyDollar />}
            placeholder="Enter check amount..."
          />
        </Form.Item>

        <Form.Item name="credit_card" label="Credit Card">
          <Input
            className="credit_card_input"
            prefix={<BsCurrencyDollar />}
            placeholder="Enter credit card amount..."
          />
        </Form.Item>

        <Divider></Divider>

        <Form.Item label="Total amount paid">
          <Input value={`?`} className="total_input" />
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
