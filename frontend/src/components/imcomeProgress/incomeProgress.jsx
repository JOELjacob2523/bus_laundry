import "./incomeProgress.css";
import React, { useEffect, useState } from "react";
import { Flex, Progress, Card } from "antd";
import TotalBalance from "../totalBalance/totalBalance";

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
        <Card
          title={<div className="modal_title">ס"ה געלט ארויס</div>}
          className="total_balance_card"
        >
          <TotalBalance bus={bus} wash={wash} goalAmount={goalAmount} />
        </Card>
        <Card
          title={<div className="modal_title">ס"ה געלט אריין</div>}
          className="awaiting_income_card"
        >
          <div className="awaiting_income_container">
            <div className="awaiting_income_inner">
              <div>
                {goalAmount ? (
                  <strong> ${formatNumber(goalAmount)}</strong>
                ) : (
                  <strong> $0</strong>
                )}
              </div>
              <div>עס דארף אריינקומען</div>
            </div>
            <div>
              <div className="awaiting_income_inner">
                {bus ? (
                  <strong> ${formatNumber(bus)}</strong>
                ) : (
                  <strong> $0</strong>
                )}
                <div>באסעס איז שוין אריינגעקומען </div>
              </div>
            </div>
            <div>
              <div className="awaiting_income_inner">
                {wash ? (
                  <strong> ${formatNumber(wash)}</strong>
                ) : (
                  <strong> $0</strong>
                )}
                <div>וואשן איז שוין אריינגעקומען </div>
              </div>
            </div>
            <div>
              <div className="awaiting_income_inner">
                {goalAmount - (bus + wash) ? (
                  <strong> ${formatNumber(goalAmount - (bus + wash))}</strong>
                ) : (
                  <strong> $0</strong>
                )}
                <div>ס"ה דארף נאך אריינקומען </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default IncomeProgress;
