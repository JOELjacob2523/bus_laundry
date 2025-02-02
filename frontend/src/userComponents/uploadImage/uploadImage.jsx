import "./uploadImage.css";
import React from "react";
import { Button, Form, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { uploadUserlogo } from "../../servers/userRequests/postUserRequest";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const UploadImage = () => {
  const { authData } = useAuth();

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
      <div className="upload_container">
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          className="upload_form"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger
              name="logo_image"
              action={null}
              beforeUpload={() => false}
            >
              <div className="ant-upload-drag-icon">
                <InboxOutlined />
              </div>
              <div className="ant-upload-text">
                דרוק דא אדער שלעפ אריין דיין בילד
              </div>
            </Upload.Dragger>
          </Form.Item>

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
                <Button htmlType="reset">Reset Load</Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UploadImage;
