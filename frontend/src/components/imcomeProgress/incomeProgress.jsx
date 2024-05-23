import React from "react";
import { Flex, Progress } from "antd";

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
    <Flex
      wrap
      gap="middle"
      style={{
        marginTop: 16,
      }}
    >
      <Progress
        type="dashboard"
        steps={8}
        percent={50}
        trailColor="rgba(0, 0, 0, 0.06)"
        strokeWidth={10}
      />
      <div>באסעס איז שוין אריינגעקומען?</div>
      <div>וואשן איז שוין אריינגעקומען?</div>
      <div>ס"ה דארף נאך אריינקומען ?</div>
    </Flex>
  </Flex>
);
export default IncomeProgress;
