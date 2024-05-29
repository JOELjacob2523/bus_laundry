import "./closedWeeks.css";
import React, { useState } from "react";
import { Button, Card, DatePicker, Divider, Form, Input } from "antd";

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
const ClosedWeeks = () => {
  const [inputValue, setInputValue] = useState("");
  const [dataArray, setDataArray] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddData = () => {
    if (inputValue.trim() !== "") {
      setDataArray([...dataArray, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className="closed_weeks_container">
      <Card title="Closed weeks" className="closed_weeks_card">
        <Form
          {...formItemLayout}
          variant="filled"
          style={
            {
              // maxWidth: 600,
            }
          }
        >
          <Form.Item
            label="Closed Weeks"
            name="Input"
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
            wrapperCol={{
              offset: 17,
              // span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleAddData}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: 20 }}>
          <Divider>Closed Weeks</Divider>
          <ul>
            {dataArray.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};
export default ClosedWeeks;
