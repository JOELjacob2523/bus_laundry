import "./payments.css";
import React from "react";
import { DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import items from "./paymentItems";

const PaymentOptions = () => {
  return (
    <div>
      <div>
        <Dropdown
          menu={{
            items,
          }}
        >
          <div className="payment_option_icon_container">
            <Avatar
              icon={<EllipsisOutlined />}
              className="payment_option_icon"
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
export default PaymentOptions;
