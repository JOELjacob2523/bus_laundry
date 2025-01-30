import "./uploadImage.css";
import React, { useState } from "react";
import { Button, Card, Form, Modal, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadUserlogo } from "../../servers/userRequests/postUserRequest";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import { IoIosDownload } from "react-icons/io";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const UploadImage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { authData } = useAuth();

  const isModalOpen = () => {
    setModalOpen(true);
  };

  const isModalClosed = () => {
    setModalOpen(false);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    return e?.fileList || [];
  };

  const onFinish = async (values) => {
    const file = values.dragger[0].originFileObj;
    const adminId = authData.parent_admin_id;
    await uploadUserlogo(file, adminId);
  };

  return (
    <div>
      <Card
        title={<div className="modal_title">דעטאלן</div>}
        className="zman_goal_card"
      >
        <div className="zman_goal_description">
          דרוק דא צו אריינצולייגן איבריגע דעטאלן
        </div>
        <Button
          onClick={isModalOpen}
          className="upload_user_logo_btn"
          disabled={!authData.role === "Administrator"}
        >
          <IoIosDownload />
        </Button>
      </Card>

      <Modal
        open={modalOpen}
        onOk={isModalClosed}
        onCancel={isModalClosed}
        footer={null}
      >
        <Card
          title={<div className="modal_title">איבריגע דעטאלן</div>}
          className="upload_form_card"
          type="inner"
        >
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            className="upload_form"
            style={{
              maxWidth: 600,
            }}
          >
            {/* <Form.Item> */}
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                name="logo_image"
                // action="http://localhost:3001/upload_user_logo"
                action={null}
                beforeUpload={() => false}
              >
                <div className="ant-upload-drag-icon">
                  <InboxOutlined />
                </div>
                <div className="ant-upload-text">
                  Click or drag file here to upload
                </div>
              </Upload.Dragger>
            </Form.Item>
            {/* </Form.Item> */}

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <div className="upload_submit_container">
                <div>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </div>
                <div>
                  <Button htmlType="reset">Reset</Button>
                </div>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default UploadImage;
