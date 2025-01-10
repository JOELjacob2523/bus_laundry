import "./editUser.css";
import { Button, Empty, Form, Input, message, Select, Spin } from "antd";
import { getUserInfoById } from "../../servers/getRequest";
import { updateUserInfo } from "../../servers/postRequest";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { GiRotaryPhone } from "react-icons/gi";
import { PiCityLight } from "react-icons/pi";
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";

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

const EditUser = ({
  studentId,
  token,
  handleEditCancel,
  student,
  disabled,
  showButtons,
  isEditing,
  setUserDisabled,
  setShowButtons,
  setModalOpen,
}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfoById(studentId, token);
        if (data && data.student_id) {
          setUserInfo(data);
        } else {
          console.error("Invalid user data:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId, token]);

  const onFinish = async (values) => {
    try {
      await updateUserInfo(values);
      setUserInfo(values);
      setUserDisabled(true);
      setShowButtons(false);
      setModalOpen(false);
      message.success(
        `${userInfo.first_name} ${userInfo.last_name} updated successfully`,
        2
      );
    } catch (error) {
      console.error("Error updating student:", error);
      navigate("/error500");
    }
  };

  if (loading) {
    return <Spin spinning="loading" tip="Loading..." fullscreen={true} />;
  }

  if (!userInfo)
    return (
      <div>
        <Empty description="User not found" />
      </div>
    );

  return (
    <div>
      <Form
        {...layout}
        onFinish={onFinish}
        className="edit_user_form"
        validateMessages={validateMessages}
        initialValues={userInfo}
        action="/student/update_user_info"
        method="POST"
      >
        <Form.Item name="student_id" hidden={true}>
          <Input />
        </Form.Item>
        <div>
          <div style={{ textAlign: "right", paddingRight: "5px" }}>
            :אדרעסס 1
          </div>
          <div>
            <Form.Item
              name="address1"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                disabled={disabled}
                style={{ width: "300px" }}
                prefix={<FaMapMarkerAlt />}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "right", paddingRight: "5px" }}>
            :אדרעסס 2
          </div>
          <div>
            <Form.Item name="address2">
              <Input
                style={{ width: "315px" }}
                disabled={disabled}
                prefix={<FaMapMarkerAlt />}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "right", paddingRight: "5px" }}>:סיטי</div>
          <div>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                disabled={disabled}
                style={{ width: "200px" }}
                prefix={<PiCityLight />}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "right", paddingRight: "5px" }}>:שטאט</div>
          <div>
            <Form.Item
              name="state"
              rules={[
                {
                  min: 0,
                  max: 10,
                  required: true,
                },
              ]}
            >
              <Input
                disabled={disabled}
                style={{ width: "200px" }}
                prefix={<FaCity />}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "right", paddingRight: "5px" }}>
            :זיפ קאוד
          </div>
          <div>
            <Form.Item
              name="zip_code"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                disabled={disabled}
                style={{ width: "200px" }}
                prefix={<FaMapMarkerAlt />}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "right", paddingRight: "5px" }}>
            :יארגאנג
          </div>
          <div>
            <Form.Item name="age">
              {isEditing ? (
                <Select
                  options={[
                    { value: "שיעור צעירים", label: "שיעור צעירים" },
                    { value: "'שיעור א", label: "'שיעור א" },
                    { value: "'שיעור ב", label: "'שיעור ב" },
                  ]}
                  disabled={disabled}
                  style={{ width: "200px" }}
                />
              ) : (
                <Input disabled={disabled} style={{ width: "180px" }} />
              )}
            </Form.Item>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "right", paddingRight: "5px" }}>
            :טעל. נומער
          </div>
          <div>
            {!isEditing ? (
              <Input
                value={
                  student.phone
                    ? student.phone.replace(
                        /^(\d{3})(\d{3})(\d{4})/,
                        "$1-$2-$3"
                      )
                    : "N/A"
                }
                prefix={<GiRotaryPhone />}
                disabled={disabled}
              />
            ) : (
              <Form.Item name="phone">
                <Input disabled={disabled} style={{ width: "200px" }} />
              </Form.Item>
            )}
          </div>
        </div>
        <div>
          <div style={{ textAlign: "right", paddingRight: "5px" }}>:דאטום</div>
          <div>
            <Input
              value={
                student.date
                  ? new Date(student.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "N/A"
              }
              style={{ width: "250px" }}
              prefix={<CiCalendarDate />}
              disabled
            />
          </div>
        </div>
        {showButtons && (
          <div className="edit_user_form_container">
            <Form.Item className="edit_user_form_btns">
              <div>
                <Button onClick={handleEditCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </div>
            </Form.Item>
          </div>
        )}
      </Form>
    </div>
  );
};

export default EditUser;
