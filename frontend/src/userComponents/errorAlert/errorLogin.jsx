import React from "react";
import { Alert } from "antd";
const ErrorLogin = () => (
  <>
    <Alert
      message="Error"
      description="Incorrect username or password, Please try again!!"
      type="error"
      showIcon
      closable
    />
  </>
);
export default ErrorLogin;
