import "./updateZmanInfo.css";
import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Select,
  Space,
  message,
} from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import HebrewDatePicker from "../jewishDtaePicker/hebcalDatePicker";
import { updateZmanGoalInfo } from "../../servers/postRequest";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import SedraSelect from "../sedraSelect/sedraSelect";

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

const UpdateClosedWeeks = ({ setIsZmanInfoEditing, setIsModalVisible }) => {
  const [form] = Form.useForm();
  const [selectedSedras, setSelectedSedras] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { zmanGoalData, fetchZmanGoalData } = useAuth();

  // Calculate the number of weeks between two dates
  const calculateWeeksBetweenDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMilliseconds = endDate - startDate;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.ceil(diffInDays / 7);
  };

  // Calculate the total weeks and goals based on the form values
  const handleFormChange = (_, allValues) => {
    const busPrice = Number(allValues.bus_price) || 0;
    const vanPrice = Number(allValues.van_price) || 0;
    const washPrice = Number(allValues.wash_price) || 0;
    // const closedWeeksCount = selectedSedras.length;
    const closedWeeksCount = allValues.closed_weeks.length;

    let totalZmanWeeks = 0;
    if (
      allValues.zman_starts_ends?.start?.date &&
      allValues.zman_starts_ends?.end?.date
    ) {
      totalZmanWeeks = calculateWeeksBetweenDates(
        allValues.zman_starts_ends.start.date,
        allValues.zman_starts_ends.end.date
      );
    }

    // Calculate the total goals
    const totalBusGoal = busPrice * closedWeeksCount;
    const totalVanGoal = vanPrice * closedWeeksCount;
    const totalWashGoal = washPrice * totalZmanWeeks;

    // Set the form values
    form.setFieldsValue({
      total_zman_weeks: totalZmanWeeks,
      total_bus_goal: totalBusGoal,
      total_van_goal: totalVanGoal,
      total_wash_goal: totalWashGoal,
    });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await updateZmanGoalInfo(values);
      setLoading(false);
      setIsModalVisible(false);
      setIsZmanInfoEditing(false);
      fetchZmanGoalData();
      message.success("Zman goal updated successfully", 2, () =>
        navigate("/home")
      );
    } catch (error) {
      console.error("Error updating zman goal:", error);
      navigate("/error500");
    }
  };

  // handle the date change
  const handleDateChange = (dateRange) => {
    form.setFieldsValue({ zman_starts_ends: dateRange });
  };

  // Add a new sedra to the selected sedras
  const handleAddSedra = () => {
    setSelectedSedras([...selectedSedras, ""]);
  };

  // Remove a sedra from the selected sedras
  const handleRemoveSedra = (index) => {
    const updatedSedras = [...selectedSedras];
    updatedSedras.splice(index, 1);
    setSelectedSedras(updatedSedras);
    form.setFieldsValue({ closed_weeks: updatedSedras });
  };

  // Handle the form submission failure
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="update_zman_goal_container">
      <Card
        title={<div style={{ direction: "rtl" }}>טוישן זמן אינפארמאציע</div>}
        type="inner"
        className="update_zman_goal_card"
      >
        <Form
          {...formItemLayout}
          form={form}
          initialValues={zmanGoalData[0]}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          variant="filled"
          className="update_zman_goal_form"
          onValuesChange={handleFormChange}
        >
          <Form.Item name="user_id" style={{ display: "none" }}>
            <Input hidden={true} />
          </Form.Item>

          <Divider orientation="start" style={{ paddingBottom: "15px" }}>
            לייג אריין די אינפארמאציע
          </Divider>

          <Form.Item
            label="זמן:"
            colon={false}
            name="zman"
            labelCol={{ span: 8 }} // Adjust the label width
            wrapperCol={{ span: 16 }} // Adjust the input width
            rules={[{ required: true, message: "Please select Zman!" }]}
          >
            <Select
              options={[
                { value: "חורף", label: "חורף" },
                { value: "קיץ", label: "קיץ" },
              ]}
              placeholder="...וועל אויס א זמן"
            />
          </Form.Item>

          <Form.Item
            label="אנפאנג / סוף זמן:"
            colon={false}
            name="zman_starts_ends"
            labelCol={{ span: 8 }} // Adjust the label width
            wrapperCol={{ span: 16 }} // Adjust the input width
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <HebrewDatePicker onChange={handleDateChange} />
          </Form.Item>

          <Form.Item
            label="סדרה:"
            colon={false}
            name="closed_weeks"
            labelCol={{ span: 4 }} // Adjust the label width
            wrapperCol={{ span: 16 }} // Adjust the input width
            required
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {selectedSedras.map((sedra, index) => (
                <Space key={index} align="baseline">
                  <SedraSelect
                    placeholder="Search to Select..."
                    onChange={(value) => {
                      const updatedSedras = [...selectedSedras];
                      updatedSedras[index] = value;
                      setSelectedSedras(updatedSedras);
                      form.setFieldsValue({
                        closed_weeks: updatedSedras,
                      });
                    }}
                  />
                  {selectedSedras.length > 1 && (
                    <MinusCircleOutlined
                      onClick={() => handleRemoveSedra(index)}
                      style={{ fontSize: "20px", color: "#999" }}
                    />
                  )}
                </Space>
              ))}
              <Button
                type="dashed"
                onClick={handleAddSedra}
                icon={<PlusOutlined />}
                style={{
                  width: "350px",
                  marginTop: "10px",
                }}
              >
                לייג צו א סדרה
              </Button>
            </Space>
          </Form.Item>

          <Form.Item
            label="ראונד טריפ באס פרייז:"
            colon={false}
            name="bus_price"
            labelCol={{ span: 12 }} // Adjust the label width
            wrapperCol={{ span: 16 }} // Adjust the input width
            rules={[
              {
                required: true,
                message: "Please input bus round trip price!",
              },
            ]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="...לייג אריין ראונד טריפ באס פרייז"
              style={{ direction: "ltr" }}
            />
          </Form.Item>

          <Form.Item
            label="ראונד טריפ ווען פרייז:"
            colon={false}
            name="van_price"
            labelCol={{ span: 12 }} // Adjust the label width
            wrapperCol={{ span: 16 }} // Adjust the input width
            rules={[
              {
                required: true,
                message: "Please input van round trip price!",
              },
            ]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="...לייג אריין ראונד טריפ ווען פרייז"
              style={{ direction: "ltr" }}
            />
          </Form.Item>

          <Form.Item
            label="וואשן פרייז:"
            colon={false}
            name="wash_price"
            labelCol={{ span: 12 }} // Adjust the label width
            wrapperCol={{ span: 16 }} // Adjust the input width
            rules={[
              {
                required: true,
                message: "Please input wash bag price!",
              },
            ]}
          >
            <Input
              prefix={<BsCurrencyDollar />}
              placeholder="...לייג אריין וואשן פרייז"
              style={{ direction: "ltr" }}
            />
          </Form.Item>

          <Divider orientation="start" style={{ paddingBottom: "15px" }}>
            סך הכל
          </Divider>

          <div className="update_total_goal_container">
            <div className="update_total_goal_inner">
              <Form.Item
                label='ס"ה באס פרייז:'
                colon={false}
                name="total_bus_goal"
                labelCol={{ span: 12 }} // Adjust the label width
                wrapperCol={{ span: 12 }} // Adjust the input width
              >
                <Input
                  prefix={<BsCurrencyDollar />}
                  disabled
                  style={{ direction: "ltr" }}
                />
              </Form.Item>
            </div>

            <div className="update_total_goal_inner">
              <Form.Item
                label='ס"ה ווען פרייז:'
                colon={false}
                name="total_van_goal"
                labelCol={{ span: 12 }} // Adjust the label width
                wrapperCol={{ span: 12 }} // Adjust the input width
              >
                <Input
                  prefix={<BsCurrencyDollar />}
                  disabled
                  style={{ direction: "ltr" }}
                />
              </Form.Item>
            </div>

            <div className="update_total_goal_inner">
              <Form.Item
                label='ס"ה וואשן פרייז:'
                colon={false}
                name="total_wash_goal"
                labelCol={{ span: 12 }} // Adjust the label width
                wrapperCol={{ span: 12 }} // Adjust the input width
              >
                <Input
                  prefix={<BsCurrencyDollar />}
                  disabled
                  style={{ direction: "ltr" }}
                />
              </Form.Item>
            </div>

            <div className="update_total_goal_inner">
              <Form.Item
                label='ס"ה וואכן:'
                colon={false}
                name="total_zman_weeks"
                labelCol={{ span: 12 }} // Adjust the label width
                wrapperCol={{ span: 12 }} // Adjust the input width
              >
                <Input disabled style={{ direction: "ltr" }} />
              </Form.Item>
            </div>
          </div>

          <div className="submit_goal_form_btn_container">
            <Button
              type="primary"
              htmlType="submit"
              className="update_goal_form_submit_btn"
              loading={loading}
            >
              Submit
            </Button>
            <Button
              type="default"
              className="update_cancel_goal_form_btn"
              onClick={() => setIsZmanInfoEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateClosedWeeks;
