import "./zmanGoal.css";
import React, { useState } from "react";
import { Button, Card, DatePicker, Divider, Form, Input, Select } from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import JewishDatePicker from "../jewishDtaePicker/jewishDatePicker";

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const ZmanGoal = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="zman_goal_container">
      <Card
        title="Zman information form"
        className="zman_goal_card"
        style={{
          maxWidth: 600,
        }}
      >
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Choose Zman"
            name="zman_name"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "winter",
                  label: "חורף",
                },
                {
                  value: "summer",
                  label: "קיץ",
                },
              ]}
              allowClear
              placeholder="Choose zman"
            ></Select>
          </Form.Item>
          <Form.Item
            label="Zman starts/ends"
            name="zman_starts_ends"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <RangePicker
              placeholder={["zman start...", "zman ends..."]}
              variant="outlined"
              format={"MM/DD/YYYY"}
            />
            <JewishDatePicker />
          </Form.Item>

          <Form.Item
            label="Closed Weeks"
            name="closed_weeks"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter closed weeks..."
              // style={{ direction: "rtl" }}
            />
          </Form.Item>

          <Form.Item
            label="Bus Round Trip Price"
            name="bus_price"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="Enter bus round trip price..."
            />
          </Form.Item>

          <Form.Item
            label="Wash Bag Price"
            name="wash_price"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="Enter wash price..."
            />
          </Form.Item>

          <Divider>Total</Divider>

          <Form.Item
            label="Zman Goal"
            name="zman_goal"
            rules={[
              {
                // required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Bus Goal"
            name="bus_goal"
            rules={[
              {
                // required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item
            label="Wash Goal"
            name="wash_goal"
            rules={[
              {
                // required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 18,
              // span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default ZmanGoal;
