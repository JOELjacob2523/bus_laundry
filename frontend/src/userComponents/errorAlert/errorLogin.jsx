import React, { useState } from "react";
import { Alert, Button } from "antd";

const ErrorLogin = ({ message }) => {
  return (
    <Alert
      message="Error"
      description={message}
      type="error"
      showIcon
      closable
    />
  );
};
export default ErrorLogin;
