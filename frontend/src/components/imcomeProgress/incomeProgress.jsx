import "./incomeProgress.css";
import React, { useEffect, useState } from "react";
import { Flex, Progress, Space, Typography } from "antd";
import { GoGoal } from "react-icons/go";
import { GiBus, GiWashingMachine } from "react-icons/gi";
import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";

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

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const IncomeProgress = ({
  currentAmount,
  goalAmount,
  paymentInfo,
  zmanGoal,
}) => {
  const [bus, setBus] = useState(0);
  const [wash, setWash] = useState(0);

  const percentage = (currentAmount / goalAmount) * 100;

  useEffect(() => {
    const calculateIncome = () => {
      const totalBus = Array.isArray(zmanGoal)
        ? zmanGoal.reduce(
            (acc, goal) => acc + parseFloat(goal.total_bus_goal),
            0
          )
        : 0;

      const totalWash = Array.isArray(zmanGoal)
        ? zmanGoal.reduce(
            (acc, goal) => acc + parseFloat(goal.total_wash_goal),
            0
          )
        : 0;

      let busSum = 0;
      let washSum = 0;

      paymentInfo.forEach((payment) => {
        const { bus, wash, bus_wash } = payment;

        if (bus === "1") {
          busSum += totalBus;
        }

        if (wash === "1") {
          washSum += totalWash;
        }

        if (bus_wash === "1") {
          busSum += totalBus;
          washSum += totalWash;
        }
      });

      setBus(busSum);
      setWash(washSum);
    };

    calculateIncome();
  }, [paymentInfo, zmanGoal]);

  return (
    <div className="main_progress_container">
      <div className="long_progress">
        <Flex vertical gap="middle">
          <Progress
            percent={percentage}
            strokeColor={twoColors}
            format={(percent) => `${percent.toFixed(0)}%`}
          />
        </Flex>
      </div>
      <div className="bottom_container">
        <div>
          <Flex wrap gap="middle" className="round_progress">
            <Progress
              type="dashboard"
              steps={8}
              percent={percentage}
              format={(percent) => `${percent.toFixed(0)}%`}
              trailColor="rgba(0, 0, 0, 0.06)"
              strokeWidth={10}
            />
          </Flex>
        </div>
        <div className="awaiting_income_container">
          <Space>
            <Space.Compact direction="vertical">
              <div>
                <Paragraph>
                  עס דארף אריינקומען{" "}
                  {goalAmount ? (
                    <strong> ${formatNumber(goalAmount)}</strong>
                  ) : (
                    <strong> $0.00</strong>
                  )}
                  <GoGoal className="goal_icon" />
                </Paragraph>
              </div>
              <div>
                <Paragraph>
                  באסעס איז שוין אריינגעקומען{" "}
                  {bus ? (
                    <strong> ${formatNumber(bus)}</strong>
                  ) : (
                    <strong> $0.00</strong>
                  )}
                  <GiBus className="bus_goal_icon" />
                </Paragraph>
              </div>
              <div>
                <Paragraph>
                  וואשן איז שוין אריינגעקומען{" "}
                  {wash ? (
                    <strong> ${formatNumber(wash)}</strong>
                  ) : (
                    <strong> $0.00</strong>
                  )}
                  <GiWashingMachine className="wash_goal_icon" />
                </Paragraph>
              </div>
              <div>
                <Paragraph>
                  ס"ה דארף נאך אריינקומען{" "}
                  {goalAmount - (bus + wash) ? (
                    <strong> ${formatNumber(goalAmount - (bus + wash))}</strong>
                  ) : (
                    <strong> $0.00</strong>
                  )}
                  <MdDoNotDisturbOnTotalSilence className="total_goal_icon" />
                </Paragraph>
              </div>
            </Space.Compact>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default IncomeProgress;
