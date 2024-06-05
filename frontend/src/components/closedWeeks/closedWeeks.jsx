import "./closedWeeks.css";
import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import HebrewDatePicker from "../jewishDtaePicker/hebcalDatePicker";

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

const ClosedWeeks = () => {
  const [form] = Form.useForm();
  const [closedWeeks, setClosedWeeks] = useState([""]);

  const handleFormChange = (changedValues, allValues) => {
    // Perform your calculations here based on allValues
    const busPrice = Number(allValues.bus_price) || 0;
    const washPrice = Number(allValues.wash_price) || 0;
    const closedWeeksCount = closedWeeks.length;
    const totalZmanWeeks = closedWeeksCount + 2;

    // Example calculations
    const totalBusGoal = busPrice * closedWeeksCount;
    const totalWashGoal = washPrice * totalZmanWeeks;
    const totalZmanGoal = totalBusGoal + totalWashGoal;

    form.setFieldsValue({
      total_zman_weeks: totalZmanWeeks,
      total_zman_goal: totalZmanGoal,
      total_bus_goal: totalBusGoal,
      total_wash_goal: totalWashGoal,
    });
  };

  const handleSubmit = (values) => {
    // Handle form submission and send data to your backend
    console.log("Form Values:", values);
  };

  const handleAdd = () => {
    setClosedWeeks([...closedWeeks, ""]);
  };

  const handleRemove = (index) => {
    const newClosedWeeks = closedWeeks.filter((_, i) => i !== index);
    setClosedWeeks(newClosedWeeks);
    form.setFieldsValue({ closed_weeks: newClosedWeeks });
  };

  const handleInputChange = (index, event) => {
    const newClosedWeeks = [...closedWeeks];
    newClosedWeeks[index] = event.target.value;
    setClosedWeeks(newClosedWeeks);
    form.setFieldsValue({ closed_weeks: newClosedWeeks });
  };

  const handleDateChange = (day) => {
    form.setFieldsValue({ zman_starts_ends: day });
  };

  return (
    <div className="zman_goal_container">
      <Card title="Zman information form" className="zman_goal_card">
        <Form
          {...formItemLayout}
          form={form}
          variant="filled"
          className="zman_goal_form"
          onValuesChange={handleFormChange}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Choose Zman"
            name="zman"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select
              options={[
                { value: "winter", label: "חורף" },
                { value: "summer", label: "קיץ" },
              ]}
              allowClear
              placeholder="Choose zman"
            />
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
            <HebrewDatePicker onChange={handleDateChange} />
          </Form.Item>

          <Form.Item label="Closed Weeks" required>
            {closedWeeks.map((week, index) => (
              <Space key={index} align="baseline">
                <Form.Item
                  name={["closed_weeks", index]}
                  rules={[
                    {
                      required: true,
                      message: "Please input!",
                    },
                  ]}
                >
                  <Input
                    value={week}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Enter closed weeks..."
                  />
                </Form.Item>
                {closedWeeks.length > 1 && (
                  <MinusCircleOutlined onClick={() => handleRemove(index)} />
                )}
              </Space>
            ))}
            <Button type="dashed" onClick={handleAdd} icon={<PlusOutlined />}>
              Add Closed Week
            </Button>
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

          <Form.Item label="Zman Weeks" name="total_zman_weeks">
            <Input disabled={true} value={closedWeeks.length + 2} />
          </Form.Item>

          <Form.Item label="Zman Goal" name="total_zman_goal">
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item label="Bus Goal" name="total_bus_goal">
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item label="Wash Goal" name="total_wash_goal">
            <Input prefix={<BsCurrencyDollar />} disabled={true} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 9,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="submit_goal_form_btn"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ClosedWeeks;
