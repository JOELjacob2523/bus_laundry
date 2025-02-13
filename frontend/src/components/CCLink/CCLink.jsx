import "./CCLink.css";
import React, { useState } from "react";
import { Button, Card, Form, Input, message, Modal } from "antd";
import { useAuth } from "../AuthProvider/AuthProvider";
import { insertCCLink } from "../../servers/userRequests/postUserRequest";

const CCLink = () => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(0);

  const { authData } = useAuth();

  const openModal = () => {
    setOpen(true);
    setKey(key + 1);
  };

  const closeModal = () => {
    setOpen(false);
    setKey(key + 1);
  };

  const onFinish = async (values) => {
    await insertCCLink(values);
    closeModal();
    message.success("Link added successfully", 2);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button
        onClick={openModal}
        type="primary"
        disabled={authData.role === "User" || authData.role === "Manager"}
      >
        Add your CC Link
      </Button>
      <Modal open={open} onOk={closeModal} onCancel={closeModal}>
        <Card title="Credit Card Link" style={{ margin: "20px" }}>
          <Form
            key={key}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              user_id: authData.userId,
            }}
          >
            <Form.Item name="user_id">
              <Input hidden={true} />
            </Form.Item>
            <Form.Item label="CC Link" name="CC_link">
              <Input />
            </Form.Item>

            <div className="link_submit_btn_container">
              <Button
                type="primary"
                htmlType="submit"
                className="link_submit_btn"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default CCLink;
