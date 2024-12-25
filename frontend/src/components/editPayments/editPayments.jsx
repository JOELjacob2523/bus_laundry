import "./editPaymetns.css";
import React, { useState, useEffect } from "react";
import { Button, Empty, Form, Input, message, Select, Spin } from "antd";
import { getPaymentInfoByStudentId } from "../../servers/getRequest";
import { updateUserPaymentInfo } from "../../servers/postRequest";
import { useNavigate } from "react-router-dom";
import { CiCalendarDate, CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineCash, HiOutlineCreditCard } from "react-icons/hi";

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

const EditUserPayment = ({ studentId, token, payment, updatePayment }) => {
  const [userPaymentInfo, setUserPaymentInfo] = useState(null);
  const [value, setValue] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPaymentInfoByStudentId(studentId, token);
        if (data && data.student_id) {
          setUserPaymentInfo(data);
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
          acc.payment_type = formatPaymentType(pay.payment_type);
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
    };

    calculateAggregatedPayment();
  }, [payment]);

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
        1.5
      );
    } catch (error) {
      console.error("Error updating student:", error);
      navigate("/error500");
    }
  };

  if (loading) {
    return <Spin spinning="loading" tip="Loading..." fullscreen={true} />;
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
        <Button type="primary" onClick={handlePaymentEditClick}>
          Edit Payments
        </Button>
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
            <div>Cash:</div>
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
            <div>Check:</div>
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
            <div>Credit Card:</div>
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
            <div>Payment Type:</div>
            <div>
              {isEditingPayment ? (
                <Form.Item name="payment_type" rules={[{ required: true }]}>
                  <Select
                    options={[
                      { value: "bus", label: "באס" },
                      { value: "wash", label: "וואשן" },
                      { value: "bus_wash", label: "באס און וואשן" },
                    ]}
                    onChange={(value) => setValue(value)}
                    disabled={paymentDisabled}
                    style={{ width: "200px" }}
                  />
                </Form.Item>
              ) : (
                <Input
                  value={aggregatedPayment.payment_type}
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
                  <div>Bus Amount:</div>
                  <div>
                    <Form.Item
                      name="bus_amount"
                      rules={[
                        { required: value === "bus" || value === "bus_wash" },
                      ]}
                    >
                      <Input
                        placeholder="Enter bus amount..."
                        style={{ width: "200px" }}
                      />
                    </Form.Item>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="edit_user_form_item_container">
              {aggregatedPayment.bus_amount > 0 ? (
                <div>
                  <div>Bus Amount:</div>
                  <Input
                    value={
                      aggregatedPayment.bus_amount
                        ? `$${aggregatedPayment.bus_amount.toFixed(2)}`
                        : "N/A"
                    }
                    disabled
                    style={{ width: "200px" }}
                  />
                </div>
              ) : null}
            </div>
          )}
          {isEditingPayment ? (
            <div>
              {value === "wash" || value === "bus_wash" ? (
                <div className="edit_user_form_item_container">
                  <div>Wash Amount:</div>
                  <div>
                    <Form.Item
                      name="wash_amount"
                      rules={[
                        { required: value === "wash" || value === "bus_wash" },
                      ]}
                    >
                      <Input
                        placeholder="Enter wash amount..."
                        style={{ width: "200px" }}
                      />
                    </Form.Item>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="edit_user_form_item_container">
              {aggregatedPayment.wash_amount > 0 ? (
                <div>
                  <div>Wash Amount:</div>
                  <Input
                    value={
                      aggregatedPayment.wash_amount
                        ? `$${aggregatedPayment.wash_amount.toFixed(2)}`
                        : "N/A"
                    }
                    disabled
                    style={{ width: "200px" }}
                  />
                </div>
              ) : null}
            </div>
          )}
          <div className="edit_user_form_item_container">
            <div>Date Created:</div>
            <div>
              <Input
                value={aggregatedPayment.pay_date || "N/A"}
                disabled
                prefix={<CiCalendarDate />}
              />
            </div>
          </div>
          <div className="edit_user_form_item_container">
            <div>Total:</div>
            <div>
              {isEditingPayment ? (
                <Form.Item name="total_paid">
                  <Input disabled style={{ width: "200px" }} />
                </Form.Item>
              ) : (
                <Input
                  value={
                    aggregatedPayment.total_paid > 0
                      ? `$${aggregatedPayment.total_paid.toFixed(2)}`
                      : "N/A"
                  }
                  style={{ width: "200px" }}
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
                <Button type="primary" htmlType="submit" loading={loading}>
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
