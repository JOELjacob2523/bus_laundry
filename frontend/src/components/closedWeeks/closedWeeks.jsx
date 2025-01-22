import "./closedWeeks.css";
import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Drawer,
  message,
} from "antd";
import { BsCurrencyDollar } from "react-icons/bs";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import HebrewDatePicker from "../jewishDtaePicker/hebcalDatePicker";
import { zmanGoalInfoByAdminId } from "../../servers/postRequest";
import { useNavigate } from "react-router-dom";
import SedraSelect from "../sedraSelect/sedraSelect";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../AuthProvider/AuthProvider";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const ClosedWeeks = () => {
  const [form] = Form.useForm();
  const [selectedSedras, setSelectedSedras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [zmanGoalOpen, setZmanGoalOpen] = useState(false);
  const [key, setKey] = useState(0);

  const navigate = useNavigate();
  const { authData } = useAuth();

  const calculateWeeksBetweenDates = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMilliseconds = endDate - startDate;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.ceil(diffInDays / 7);
  };

  const handleFormChange = (_, allValues) => {
    const busPrice = Number(allValues.bus_price) || 0;
    const vanPrice = Number(allValues.van_price) || 0;
    const washPrice = Number(allValues.wash_price) || 0;
    const closedWeeksCount = selectedSedras.length;

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

    const totalBusGoal = busPrice * closedWeeksCount;
    const totalVanGoal = vanPrice * closedWeeksCount;
    const totalWashGoal = washPrice * totalZmanWeeks;
    const totalZmanGoal = totalBusGoal + totalWashGoal;

    form.setFieldsValue({
      total_zman_weeks: totalZmanWeeks,
      total_zman_goal: totalZmanGoal,
      total_bus_goal: totalBusGoal,
      total_van_goal: totalVanGoal,
      total_wash_goal: totalWashGoal,
    });
  };

  const handleAddSedra = () => {
    setSelectedSedras([...selectedSedras, ""]);
  };

  const handleRemoveSedra = (index) => {
    const updatedSedras = [...selectedSedras];
    updatedSedras.splice(index, 1);
    setSelectedSedras(updatedSedras);
    form.setFieldsValue({ closed_weeks: updatedSedras });
  };

  const handleDateChange = (dateRange) => {
    form.setFieldsValue({ zman_starts_ends: dateRange });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = { ...values, user_id: authData.parent_admin_id };
      await zmanGoalInfoByAdminId(formData);
      message.success("Zman goal added successfully", 2, () =>
        navigate("/home/buses")
      );
    } catch (error) {
      console.error("Error adding zman goal:", error);
      navigate("/error500");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showZmanDrawer = () => {
    setZmanGoalOpen(true);
  };
  const closeZmanDrawer = () => {
    setZmanGoalOpen(false);
    setKey(key + 1);
  };

  return (
    <div className="zman_goal_container">
      <div>
        <Card
          title={<div className="modal_title">זמן אינפארמאציע</div>}
          className="zman_goal_card"
        >
          <div className="zman_goal_description">
            דרוק דא אריינצולייגן זמן אינפארמאציע
          </div>
          <Button onClick={showZmanDrawer} className="add_zman_goal_btn">
            <FaPlus />
          </Button>
        </Card>
      </div>
      <div>
        <Drawer
          title={<div className="modal_title">זמן אינפארמאציע</div>}
          width={900}
          open={zmanGoalOpen}
          onClose={closeZmanDrawer}
          footer={null}
          key={key}
          className="zman_goal_drawer"
        >
          <Card className="zman_goal_card">
            <div className="zman_goal_container_inner">
              <Form
                {...formItemLayout}
                form={form}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                variant="filled"
                className="zman_goal_form"
                onValuesChange={handleFormChange}
                action="/zman_goal"
                method="POST"
              >
                <Form.Item name="user_id" style={{ lineHeight: 1 }}>
                  <Input hidden={true} />
                </Form.Item>
                <Form.Item
                  label=":זמן"
                  colon={false}
                  name="zman"
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
                  label=":אנפאנג / סוף זמן"
                  colon={false}
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

                <Form.Item
                  label=":סדרה"
                  colon={false}
                  name="closed_weeks"
                  required
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {selectedSedras.map((sedra, index) => (
                      <Space key={index} align="baseline">
                        <SedraSelect
                          style={{ width: "200px" }}
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
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      לייג צו א סדרה
                    </Button>
                  </Space>
                </Form.Item>

                <Form.Item
                  label=":ראונד טריפ באס פרייז"
                  colon={false}
                  name="bus_price"
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
                  />
                </Form.Item>

                <Form.Item
                  label=":ראונד טריפ ווען פרייז"
                  colon={false}
                  name="van_price"
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
                  />
                </Form.Item>

                <Form.Item
                  label=":וואשן פרייז"
                  colon={false}
                  name="wash_price"
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
                  />
                </Form.Item>

                <Divider>Total</Divider>

                <div className="total_goal_container">
                  <div>
                    <Form.Item
                      label=':ס"ה וואכן'
                      colon={false}
                      name="total_zman_weeks"
                      labelCol={{ span: 8 }} // Adjust the label width
                      wrapperCol={{ span: 16 }} // Adjust the input width
                    >
                      <Input disabled style={{ width: "200px" }} />
                    </Form.Item>
                  </div>

                  <div>
                    <Form.Item
                      label=':ס"ה זמן פרייז'
                      colon={false}
                      name="total_zman_goal"
                      labelCol={{ span: 8 }} // Adjust the label width
                      wrapperCol={{ span: 16 }} // Adjust the input width
                    >
                      <Input
                        prefix={<BsCurrencyDollar />}
                        disabled
                        style={{ width: "200px" }}
                      />
                    </Form.Item>
                  </div>

                  <div>
                    <Form.Item
                      label=':ס"ה באס פרייז'
                      colon={false}
                      name="total_bus_goal"
                      labelCol={{ span: 8 }} // Adjust the label width
                      wrapperCol={{ span: 16 }} // Adjust the input width
                    >
                      <Input
                        prefix={<BsCurrencyDollar />}
                        disabled
                        style={{ width: "200px" }}
                      />
                    </Form.Item>
                  </div>

                  <div>
                    <Form.Item
                      label=':ס"ה ווען פרייז'
                      colon={false}
                      name="total_van_goal"
                      labelCol={{ span: 8 }} // Adjust the label width
                      wrapperCol={{ span: 16 }} // Adjust the input width
                    >
                      <Input
                        prefix={<BsCurrencyDollar />}
                        disabled
                        style={{ width: "200px" }}
                      />
                    </Form.Item>
                  </div>

                  <div>
                    <Form.Item
                      label=':ס"ה וואשן פרייז'
                      colon={false}
                      name="total_wash_goal"
                      labelCol={{ span: 8 }} // Adjust the label width
                      wrapperCol={{ span: 16 }} // Adjust the input width
                    >
                      <Input
                        prefix={<BsCurrencyDollar />}
                        disabled
                        style={{ width: "200px" }}
                      />
                    </Form.Item>
                  </div>
                </div>

                <Form.Item className="submit_goal_form_btn_container">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submit_goal_form_btn"
                    loading={loading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Drawer>
      </div>
    </div>
  );
};

export default ClosedWeeks;
