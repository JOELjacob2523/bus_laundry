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
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        // initialValues={}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Dragger">
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
                Click or drag file to this area to upload
              </div>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadImage;
