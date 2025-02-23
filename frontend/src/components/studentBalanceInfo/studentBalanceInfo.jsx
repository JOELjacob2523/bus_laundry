import "./studentBalanceInfo.css";
import React from "react";
import { Divider, Popover, Space, Input } from "antd";
import { FiInfo } from "react-icons/fi";

// Component to display the payment information of a student
// It aggregates the payment information and displays it in a popover
const StudentBalanceInfo = ({ payment }) => {
  const parseValue = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Format the payment type to be more readable
  const formatPaymentType = (paymentType) => {
    if (!paymentType) return "N/A";
    return paymentType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" & ");
  };

  // Aggregate the payment information
  const aggregatedPayment = payment.reduce(
    (acc, pay) => {
      acc.cash += parseValue(pay.cash);
      acc.checks += parseValue(pay.checks);
      acc.credit_card += parseValue(pay.credit_card);
      acc.payment_type = formatPaymentType(pay.payment_type);
      acc.pay_date = acc.pay_date || pay.pay_date || "N/A";
      acc.total_paid += parseValue(pay.total_paid);
      return acc;
    },
    {
      cash: 0,
      checks: 0,
      credit_card: 0,
      total_paid: 0,
      payment_type: "N/A",
    }
  );

  // Content of the popover
  const content = (
    <div className="main_content_container">
      <div className="content_container">
        <div className="content_inner">
          <div>
            <strong>Cash:</strong>{" "}
          </div>
          <div>
            {" "}
            <Input value={`$${aggregatedPayment.cash.toFixed(2)}`} />
          </div>
        </div>
        <div className="content_inner">
          <div>
            <strong>Check:</strong>{" "}
          </div>
          <div>
            <Input value={`$${aggregatedPayment.checks.toFixed(2)}`} />
          </div>
        </div>
        <div className="content_inner">
          <div>
            <strong>Credit Card:</strong>
          </div>
          <div>
            <Input value={`$${aggregatedPayment.credit_card.toFixed(2)}`} />
          </div>
        </div>
        <div className="content_inner">
          <div>
            <strong>Payment Type:</strong>
          </div>{" "}
          <div>
            <Input value={aggregatedPayment.payment_type} />{" "}
          </div>
        </div>
        <div className="content_inner">
          <div>
            <strong>Date:</strong>
          </div>
          <div>
            <Input value={aggregatedPayment.pay_date || "N/A"} />{" "}
          </div>
        </div>
      </div>
      <Divider />
      <div className="total_balance_info">
        <strong>Total:</strong>
        <Input value={`$${aggregatedPayment.total_paid.toFixed(2)}`} />
      </div>
    </div>
  );

  return (
    <div>
      <Space>
        <Popover
          content={content}
          title="Payment Information"
          trigger="click"
          className="balance_info_popover"
        >
          <FiInfo />
        </Popover>
      </Space>
    </div>
  );
};

export default StudentBalanceInfo;
