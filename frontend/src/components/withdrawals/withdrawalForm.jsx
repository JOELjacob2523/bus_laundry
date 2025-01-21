import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, message } from "antd";
import { HDate, HebrewDateEvent } from "@hebcal/core";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { withdrawalInfo } from "../../servers/postRequest";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

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

const WithdrawalForm = ({ keyNumber }) => {
  const [date, setDate] = useState(new Date().toLocaleString());
  const [hebrewDate, setHebrewDate] = useState("");
  const [userId, setUserId] = useState("");
  const [isvisible, setIsVisible] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [customValue, setCustomValue] = useState("");

  const navigate = useNavigate();
  const { authData } = useAuth();

  const [form] = Form.useForm();

  useEffect(() => {
    const updateDates = async () => {
      setUserId(authData.parent_admin_id);
      setDate(new Date().toLocaleString());

      const hd = new HDate(new Date());
      const ev = new HebrewDateEvent(hd);
      const HD = ev.render("he-x-NoNikud");
      setHebrewDate(HD);
    };

    form.setFieldsValue({
      date,
      hebrew_date: hebrewDate,
      user_id: userId,
    });

    updateDates();
  }, [authData.parent_admin_id, date, form, hebrewDate, userId]);

  const onSelectChange = (value) => {
    setSelectedValue(value);
    setIsVisible(value === "Change");
  };

  const onInputChange = (e) => {
    setCustomValue(e.target.value);
  };

  const onFinish = async (values) => {
    try {
      const valueToSave =
        selectedValue === "Change" ? customValue : selectedValue;
      const formData = { ...values, withdrawal_to: valueToSave };
      await withdrawalInfo(formData);
      message.success("Withdrawal info added successfully", 1.5, () =>
        navigate("/home")
      );
    } catch (error) {
      console.error("Error adding withdrawal info:", error);
      navigate("/error500");
    }
  };

  return (
    <div>
      <Card>
        <Form
          {...layout}
          form={form}
          key={keyNumber}
          initialValues={{
            date,
            hebrew_date: hebrewDate,
            user_id: userId,
          }}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="amount"
            label=":סכום"
            colon={false}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input prefix={<BsCurrencyDollar />} placeholder="...סכום" />
          </Form.Item>
          <Form.Item
            name="withdrawal_to"
            label=":ארויס פאר"
            colon={false}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={[
                { value: "באס", label: "באס" },
                { value: "ספרינטער", label: "ספרינטער" },
                { value: "קאר/מיני ווען", label: "קאר/מיני ווען" },
                { value: "וואשן", label: "וואשן" },
                {
                  value: "Change",
                  label: (
                    <div>
                      Change:{" "}
                      <span style={{ fontSize: "10px" }}>
                        ( שרייב אריין פאר וועם די געלט גייט )
                      </span>
                    </div>
                  ),
                },
              ]}
              onChange={onSelectChange}
              suffixIcon={<IoPersonSharp />}
              placeholder="...קלויב אויס פאר וועם"
            />
            {isvisible && (
              <div style={{ paddingTop: "25px" }}>
                <Input onChange={onInputChange} placeholder="...ארויס פאר" />
              </div>
            )}
          </Form.Item>
          <Form.Item name="date" label=":דאטום" colon={false}>
            <Input value={date} disabled prefix={<CiCalendarDate />} />
          </Form.Item>
          <Form.Item name="hebrew_date" label=":אידישע דאטום" colon={false}>
            <Input value={hebrewDate} disabled prefix={<CiCalendarDate />} />
          </Form.Item>
          <Form.Item name="user_id">
            <Input value={userId} hidden />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 21,
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
export default WithdrawalForm;
