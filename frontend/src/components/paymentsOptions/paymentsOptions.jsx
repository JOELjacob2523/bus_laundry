import "./paymentsOptions.css";
import {
  Button,
  Form,
  Input,
  Spin,
  Radio,
  Divider,
  message,
  Empty,
} from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import { getUserInfoById } from "../../servers/getRequest";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { payments } from "../../servers/postRequest";

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

const PaymentOptions = ({
  studentId,
  token,
  handleCancel,
  updatePayment,
  setIsPaymentModalVisible,
  setUserPaymentInfo,
  authData,
}) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState("bus");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfoById(studentId, token);
        if (data && data.student_id) {
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
  }, [studentId, token]);

  // handle form change
  const handleFormChange = (_, allValues) => {
    const cashInput = Number(allValues.cash) || 0;
    const checkInput = Number(allValues.checks) || 0;
    const creditCardInput = Number(allValues.credit_card) || 0;

    form.setFieldsValue({
      total_paid: cashInput + checkInput + creditCardInput,
    });
  };

  // handle form submit
  const onFinish = async (values) => {
    try {
      const formData = { ...values, payment_type: value };
      await payments(formData);
      updatePayment(formData);
      setUserPaymentInfo(formData);
      setIsPaymentModalVisible(false);
      message.success("Payment added successfully", 2);
    } catch (error) {
      console.error("Error adding payment:", error);
      navigate("/error500");
    }
  };

  // handle radio change
  const onRadioChange = (e) => {
    console.log("redio checked", e.target.value);
    setValue(e.target.value);
  };

  // loading spinner
  if (loading) {
    return <Spin fullscreen={true} tip="Loading..." />;
  }

  // user not found
  if (!userInfo)
    return (
      <div>
        <Empty description="User not found" />
      </div>
    );

  return (
    <>
      <Form
        {...layout}
        form={form}
        onValuesChange={handleFormChange}
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={userInfo}
      >
        <Form.Item name="user_id" hidden={true} value={authData.userId}>
          <Input />
        </Form.Item>
        <Form.Item name="student_id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item name="pay_date" hidden={true}>
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
            <Radio value="bus">באס</Radio>
            <Radio value="wash">וואשן</Radio>
            <Radio value="bus_wash">באס און וואשן</Radio>
          </Radio.Group>
        </div>

        <Form.Item name="cash" label="Cash">
          <Input
            className="cash_input"
            prefix={<BsCurrencyDollar />}
            placeholder="Enter cash amount..."
          />
        </Form.Item>

        <Form.Item name="checks" label="Check">
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

        {value === "bus" || value === "bus_wash" ? (
          <Form.Item
            name="bus_amount"
            label="Bus Amount"
            rules={[{ required: value === "bus" || value === "bus_wash" }]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="Enter bus amount..."
            />
          </Form.Item>
        ) : null}

        {value === "wash" || value === "bus_wash" ? (
          <Form.Item
            name="wash_amount"
            label="Wash Amount"
            rules={[{ required: value === "wash" || value === "bus_wash" }]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="Enter wash amount..."
            />
          </Form.Item>
        ) : null}

        <Divider></Divider>

        <Form.Item label="Total amount paid" name="total_paid">
          <Input
            value={``}
            className="total_input"
            disabled={true}
            prefix={<BsCurrencyDollar />}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 16,
          }}
        >
          <div className="payment_option_form_container">
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

export default PaymentOptions;
