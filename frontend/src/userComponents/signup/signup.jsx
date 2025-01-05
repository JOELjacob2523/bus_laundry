import "./signup.css";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { TbPasswordUser } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../servers/userRequests/postUserRequest";
import KYLetterhead from "../../images/KY_Letterhead.png";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useEffect } from "react";

const UserSignup = () => {
  const [key, setKey] = useState(0);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const { authData } = useAuth();

  useEffect(() => {
    if (authData && authData.userId) {
      setValue(authData.userId);
    }
  }, [authData]);

  const onFinish = async (values) => {
    if (!authData || !authData.userId) {
      message.error("Authentication data is not available.");
      return;
    }
    try {
      const formData = { ...values, parent_admin_id: value || null };
      await userInfo(formData);
      setKey(key + 1);
      message.success("User added successfully", 2);
      // navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
      navigate("/error500");
    }
  };

  return (
    <div>
      <div className="signup_main_container">
        <Helmet>
          <title>Add user - Kadishes Yoel Bus & Laundry</title>
        </Helmet>
        <div className="signup_card_container">
          <div className="KY_letterhead_img_container_signup">
            <img
              className="KY_letterhead_img"
              alt="KYLetterhead"
              src={KYLetterhead}
            />
          </div>
          <div className="signup_card">
            <Card title="Signup">
              <Form
                name="normal_login"
                className="signup_form"
                action="/signup"
                method="POST"
                key={key}
                initialValues={{
                  remember: true,
                  // parent_admin_id: authData.userId,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="parent_admin_id"
                  // value={value || null}
                >
                  <Input hidden={true} />
                </Form.Item>

                <Form.Item
                  name="first_name"
                  label=":ערשטע נאמען"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: "!ביטע אריין לייגט אייער ערשטע נאמען",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="...ערשטע נאמען"
                  />
                </Form.Item>

                <Form.Item
                  name="last_name"
                  label=":לעצטע נאמען"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      message: "!ביטע אריין לייגט אייער לעצטע נאמען",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="...לעצטע נאמען"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "!Passowrd ביטע אריין לייגט אייער",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<TbPasswordUser />}
                    placeholder="Password..."
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "!Password ביטע אריין לייגט איבער אייער",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The new password that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<TbPasswordUser />}
                    placeholder="Confirm Password..."
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label=":אימעיל"
                  colon={false}
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "!ביטע אריין לייגט אייער אימעיל",
                    },
                  ]}
                >
                  <Input prefix={<MdOutlineEmail />} placeholder="...אימעיל" />
                </Form.Item>

                <Form.Item>
                  <div className="signup_form_footer">
                    {/* <div>
                      <Button
                        className="signup_form_button"
                        onClick={() => navigate("/")}
                      >
                        Cancel
                      </Button>
                    </div> */}
                    <div>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="signup_form_button"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserSignup;
