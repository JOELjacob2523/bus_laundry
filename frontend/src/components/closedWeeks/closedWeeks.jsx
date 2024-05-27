import "./closedWeeks.css";
import React from "react";
import { Button, Card, DatePicker, Form, Input } from "antd";

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
const ClosedWeeks = () => (
  <div className="closed_weeks_container">
    <Card title="Closed weeks" className="closed_weeks_card">
      <Form
        {...formItemLayout}
        variant="filled"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Input"
          name="Input"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          label="RangePicker"
          name="RangePicker"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <RangePicker />
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 17,
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
export default ClosedWeeks;
