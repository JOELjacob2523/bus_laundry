import "./incomeProgress.css";
import React from "react";
import { Flex, Progress, Space, Typography } from "antd";

const { Paragraph } = Typography;

const twoColors = {
  "0%": "#108ee9",
  "100%": "#87d068",
};
const conicColors = {
  "0%": "#87d068",
  "50%": "#ffe58f",
  "100%": "#ffccc7",
};
const IncomeProgress = () => (
  <Flex vertical gap="middle">
    <Progress percent={50} strokeColor={twoColors} />
    <Flex wrap gap="middle" className="round_progress">
      <Progress
        type="dashboard"
        steps={8}
        percent={50}
        trailColor="rgba(0, 0, 0, 0.06)"
        strokeWidth={10}
      />
      <div className="awaiting_income_container">
        <Space>
          <Space.Compact direction="vertical">
            <div>
              <Paragraph className="dot_beofre">
                באסעס איז שוין אריינגעקומען?
              </Paragraph>
            </div>
            <div>
              <Paragraph className="dot_beofre">
                וואשן איז שוין אריינגעקומען?
              </Paragraph>
            </div>
            <div>
              <Paragraph className="dot_beofre">
                ס"ה דארף נאך אריינקומען ?
              </Paragraph>
            </div>
          </Space.Compact>
        </Space>
      </div>
    </Flex>
  </Flex>
);
export default IncomeProgress;
