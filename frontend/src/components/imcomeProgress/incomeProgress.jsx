import "./incomeProgress.css";
import React, { useEffect, useState } from "react";
import { Flex, Progress, Card, Modal } from "antd";
import TotalBalance from "../totalBalance/totalBalance";
import { TbListDetails } from "react-icons/tb";
import WithdrawalsDetials from "../withdrawals/detailedWithdrawals";
import IncomeTotalDetails from "../incomeTotalDetails/incomeTotalDetails";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const percentage = (currentAmount / goalAmount) * 100;

  useEffect(() => {
    const calculateIncome = () => {
      let busSum = 0;
      let washSum = 0;

      for (let payment of paymentInfo) {
        if (payment.bus_amount && !payment.wash_amount) {
          // Only bus payment
          busSum += parseFloat(payment.bus_amount);
        } else if (payment.wash_amount && !payment.bus_amount) {
          // Only wash payment
          washSum += parseFloat(payment.wash_amount);
        } else if (payment.bus_amount && payment.wash_amount) {
          // Bus and wash payment
          busSum += parseFloat(payment.bus_amount);
          washSum += parseFloat(payment.wash_amount);
        }
      }
      setBus(busSum);
      setWash(washSum);
    };

    calculateIncome();
  }, [paymentInfo, zmanGoal]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEdit = () => {
    setIsEditing(true);
    setShowButtons(true);
  };

  const handleEditCancel = () => {
    setShowButtons(false);
    setIsEditing(false);
  };

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
          <div>עס איז אריינגעקומען</div>
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
          title={
            <div className="withdrawal_title_container">
              <div>{<TbListDetails onClick={showModal} />}</div>
              <div className="modal_title">ס"ה געלט ארויס</div>
            </div>
          }
          className="total_balance_card"
        >
          <TotalBalance paymentInfo={paymentInfo} />
        </Card>

        <Card
          title={
            <div className="withdrawal_title_container">
              <div>
                <IncomeTotalDetails paymentInfo={paymentInfo} />
              </div>
              <div className="modal_title">ס"ה געלט אריין</div>
            </div>
          }
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
      <div className="withdrawal_details_container">
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={500}
        >
          <WithdrawalsDetials
            handleEdit={handleEdit}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            showButtons={showButtons}
            setShowButtons={setShowButtons}
            handleEditCancel={handleEditCancel}
          />
        </Modal>
      </div>
    </div>
  );
};
export default IncomeProgress;
