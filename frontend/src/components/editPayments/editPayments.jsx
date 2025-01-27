import "./editPaymetns.css";
import React, { useState, useEffect } from "react";
import { Button, Empty, Flex, Form, Input, message, Select, Spin } from "antd";
import { updateUserPaymentInfo } from "../../servers/postRequest";
import { useNavigate } from "react-router-dom";
import { CiCalendarDate, CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineCash, HiOutlineCreditCard } from "react-icons/hi";
import { useAuth } from "../AuthProvider/AuthProvider";
import { LoadingOutlined } from "@ant-design/icons";

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

const EditUserPayment = ({
  payment,
  updatePayment,
  userPaymentInfo,
  setUserPaymentInfo,
}) => {
  const { authData } = useAuth();
  const [value, setValue] = useState("");
  const [paymentTypeValue, setPaymentTypeValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentDisabled, setPaymentDisabled] = useState(true);
  const [showPaymentButtons, setShowPaymentButtons] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [aggregatedPayment, setAggregatedPayment] = useState({
    cash: 0,
    checks: 0,
    credit_card: 0,
    total_paid: 0,
    payment_type: "N/A",
    pay_date: "N/A",
  });
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // parse the value
  const parseValue = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatPaymentType = (paymentType) => {
    if (!paymentType) return "N/A";
    return paymentType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" & ");
  };

  useEffect(() => {
    const calculateAggregatedPayment = () => {
      const aggregated = payment.reduce(
        (acc, pay) => {
          acc.cash += parseValue(pay.cash);
          acc.checks += parseValue(pay.checks);
          acc.credit_card += parseValue(pay.credit_card);
          acc.payment_type = pay.payment_type || acc.payment_type || "N/A";
          acc.pay_date = acc.pay_date || pay.pay_date || "N/A";
          acc.total_paid += parseValue(pay.total_paid);
          acc.bus_amount += parseValue(pay.bus_amount);
          acc.wash_amount += parseValue(pay.wash_amount);
          return acc;
        },
        {
          cash: 0 || null,
          checks: 0 || null,
          credit_card: 0 || null,
          total_paid: 0,
          bus_amount: 0,
          wash_amount: 0,
          payment_type: "N/A",
        }
      );
      setAggregatedPayment(aggregated);
      if (isEditingPayment === true) {
        setValue(aggregated.payment_type);
      }
    };

    calculateAggregatedPayment();
  }, [payment, isEditingPayment]);

  useEffect(() => {
    if (aggregatedPayment.payment_type === "bus") {
      setPaymentTypeValue("באס");
    } else if (aggregatedPayment.payment_type === "wash") {
      setPaymentTypeValue("וואשן");
    } else if (aggregatedPayment.payment_type === "bus_wash") {
      setPaymentTypeValue("באס און וואשן");
    } else {
      setPaymentTypeValue("N/A");
    }
  }, [aggregatedPayment]);

  const handlePaymentEditClick = () => {
    setPaymentDisabled(false);
    setShowPaymentButtons(true);
    setIsEditingPayment(true);
  };

  const handlePaymentEditCancel = () => {
    setPaymentDisabled(true);
    setShowPaymentButtons(false);
    setIsEditingPayment(false);
  };

  const handleFormChange = (_, allValues) => {
    const cashInput = Number(allValues.cash) || 0;
    const checkInput = Number(allValues.checks) || 0;
    const creditCardInput = Number(allValues.credit_card) || 0;

    form.setFieldsValue({
      total_paid: cashInput + checkInput + creditCardInput,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateUserPaymentInfo(values);
      updatePayment(values);
      setUserPaymentInfo(values);
      handlePaymentEditCancel();
      setLoading(false);
      message.success(
        `Payment for ${userPaymentInfo.first_name} ${userPaymentInfo.last_name} updated successfully`,
        2
      );
    } catch (error) {
      console.error("Error updating student:", error);
      navigate("/error500");
    }
  };

  if (loading) {
    <Flex className="loading_flax">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />{" "}
      Loading...
    </Flex>;
  }

  if (!userPaymentInfo)
    return (
      <div>
        <Empty description="User not found" />
      </div>
    );

  return (
    <div className="edit_payment_container">
      <div className="edit_payment_btn_div">
        {authData.role === "Administrator" || authData.role === "Manager" ? (
          <Button type="primary" onClick={handlePaymentEditClick}>
            טויש פעימענט
          </Button>
        ) : null}
      </div>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        onValuesChange={handleFormChange}
        validateMessages={validateMessages}
        initialValues={userPaymentInfo}
      >
        <div className="edit_user_payment_form">
          <Form.Item name="student_id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item name="pay_date" hidden={true}>
            <Input />
          </Form.Item>
          <div className="edit_user_form_item_container">
            <div style={{ textAlign: "right", paddingRight: "5px" }}>:קעש</div>
            <div>
              {isEditingPayment ? (
                <Form.Item name="cash">
                  <Input
                    disabled={paymentDisabled}
                    style={{ width: "175px" }}
                  />
                </Form.Item>
              ) : (
                <Input
                  value={
                    aggregatedPayment.cash > 0
                      ? `$${aggregatedPayment.cash.toFixed(2)}`
                      : "N/A"
                  }
                  style={{ width: "175px" }}
                  prefix={<HiOutlineCash />}
                  disabled
                />
              )}
            </div>
          </div>
          <div className="edit_user_form_item_container">
            <div style={{ textAlign: "right", paddingRight: "5px" }}>:טשעק</div>
            <div>
              {isEditingPayment ? (
                <Form.Item name="checks">
                  <Input
                    disabled={paymentDisabled}
                    style={{ width: "175px" }}
                  />
                </Form.Item>
              ) : (
                <Input
                  value={
                    aggregatedPayment.checks > 0
                      ? `$${aggregatedPayment.checks.toFixed(2)}`
                      : "N/A"
                  }
                  style={{ width: "175px" }}
                  prefix={<CiMoneyCheck1 />}
                  disabled
                />
              )}
            </div>
          </div>
          <div className="edit_user_form_item_container">
            <div style={{ textAlign: "right", paddingRight: "5px" }}>
              :קרעדיט קארד
            </div>
            <div>
              {isEditingPayment ? (
                <Form.Item name="credit_card">
                  <Input
                    disabled={paymentDisabled}
                    style={{ width: "175px" }}
                  />
                </Form.Item>
              ) : (
                <Input
                  value={
                    aggregatedPayment.credit_card > 0
                      ? `$${aggregatedPayment.credit_card.toFixed(2)}`
                      : "N/A"
                  }
                  style={{ width: "175px" }}
                  prefix={<HiOutlineCreditCard />}
                  disabled
                />
              )}
            </div>
          </div>
          <div className="edit_user_form_item_container">
            <div style={{ textAlign: "right", paddingRight: "5px" }}>
              :באצאלט פאר
            </div>
            <div>
              {isEditingPayment ? (
                <Form.Item name="payment_type" rules={[{ required: true }]}>
                  <Select
                    options={[
                      { value: "bus", label: "באס" },
                      { value: "wash", label: "וואשן" },
                      { value: "bus_wash", label: "באס און וואשן" },
                    ]}
                    onChange={(newValue) => setValue(newValue)}
                    disabled={paymentDisabled}
                    value={value}
                    style={{ width: "200px" }}
                  />
                </Form.Item>
              ) : (
                <Input
                  // value={formatPaymentType(aggregatedPayment.payment_type)}
                  value={paymentTypeValue}
                  disabled
                  style={{ width: "200px" }}
                />
              )}
            </div>
          </div>

          {isEditingPayment ? (
            <div className="edit_user_form_item_container">
              {value === "bus" || value === "bus_wash" ? (
                <div>
                  <div style={{ textAlign: "right", paddingRight: "5px" }}>
                    :באס סכום
                  </div>
                  <Form.Item
                    name="bus_amount"
                    rules={[
                      { required: value === "bus" || value === "bus_wash" },
                    ]}
                    // initialValue={aggregatedPayment.bus_amount || ""}
                  >
                    <Input
                      placeholder="Enter bus amount..."
                      style={{ width: "200px" }}
                    />
                  </Form.Item>
                </div>
              ) : null}

              {value === "wash" || value === "bus_wash" ? (
                <div style={{ paddingTop: "20px" }}>
                  <div style={{ textAlign: "right", paddingRight: "5px" }}>
                    :וואשן סכום
                  </div>
                  <Form.Item
                    name="wash_amount"
                    rules={[
                      { required: value === "wash" || value === "bus_wash" },
                    ]}
                    // initialValue={aggregatedPayment.wash_amount || ""}
                  >
                    <Input
                      placeholder="Enter wash amount..."
                      style={{ width: "200px" }}
                    />
                  </Form.Item>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="edit_user_form_item_container">
              {aggregatedPayment.bus_amount > 0 && (
                <div>
                  <div style={{ textAlign: "right", paddingRight: "5px" }}>
                    :באס סכום
                  </div>
                  <Input
                    value={`$${aggregatedPayment.bus_amount.toFixed(2)}`}
                    disabled
                    style={{ width: "200px" }}
                  />
                </div>
              )}

              {aggregatedPayment.wash_amount > 0 && (
                <div style={{ paddingTop: "20px" }}>
                  <div style={{ textAlign: "right", paddingRight: "5px" }}>
                    :וואשן סכום
                  </div>
                  <Input
                    value={`$${aggregatedPayment.wash_amount.toFixed(2)}`}
                    disabled
                    style={{ width: "200px" }}
                  />
                </div>
              )}
            </div>
          )}

          <div className="edit_user_form_item_container">
            <div style={{ textAlign: "right", paddingRight: "5px" }}>
              :דאטום באצאלט
            </div>
            <div>
              <Input
                value={aggregatedPayment.pay_date || "N/A"}
                disabled
                prefix={<CiCalendarDate />}
              />
            </div>
          </div>
          <div className="edit_user_form_item_container">
            <div style={{ textAlign: "right", paddingRight: "5px" }}>
              :סך הכל
            </div>
            <div>
              {isEditingPayment ? (
                <Form.Item name="total_paid">
                  <Input disabled style={{ width: "350px" }} />
                </Form.Item>
              ) : (
                <Input
                  value={
                    aggregatedPayment.total_paid > 0
                      ? `$${aggregatedPayment.total_paid.toFixed(2)}`
                      : "N/A"
                  }
                  style={{ width: "350px" }}
                  disabled
                />
              )}
            </div>
          </div>
        </div>
        <div className="edit_user_form_container">
          {showPaymentButtons && (
            <Form.Item className="edit_user_form_btns">
              <div>
                <Button onClick={handlePaymentEditCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  // loading={loading}
                >
                  Save
                </Button>
              </div>
            </Form.Item>
          )}
        </div>
      </Form>
    </div>
  );
};

export default EditUserPayment;
