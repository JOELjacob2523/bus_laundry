import "./zmanGoal.css";
import React from "react";
import {
  Button,
  Cascader,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  TreeSelect,
} from "antd";

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
const ZmanGoal = () => (
  <div className="zman_goal_container">
    <Card title="Zman Goal">
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

        <Form.Item
          label="InputNumber"
          name="InputNumber"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Select"
          name="Select"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="Cascader"
          name="Cascader"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Cascader />
        </Form.Item>

        <Form.Item
          label="TreeSelect"
          name="TreeSelect"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <TreeSelect />
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 16,
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
export default ZmanGoal;
