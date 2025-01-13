import "./missingZmanInfo.css";
import React from "react";
import { Button, Empty, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const MissingZmanInfo = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Empty
        styles={{
          image: {
            height: 60,
          },
        }}
        description={
          <Typography.Text>
            <div style={{ fontFamily: "OYoelTovia", fontSize: "20px" }}>
              "דרוק דא אריינצולייגן די זמן אינפארמאציע און קלויב אויס{" "}
              <span style={{ fontFamily: "OYoelToviaBold" }}>
                "זמן אינפארמאציע
              </span>
            </div>
          </Typography.Text>
        }
      >
        <Button type="primary" onClick={() => navigate("details")}>
          זמן אינפארמאציע
        </Button>
      </Empty>
    </div>
  );
};
export default MissingZmanInfo;
