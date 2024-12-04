import "./incomeTotalDetails.css";
import React, { useState, useEffect } from "react";
import { Descriptions, Modal } from "antd";
import { TbListDetails } from "react-icons/tb";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const IncomeTotalDetails = ({ paymentInfo }) => {
  const [incomeDetails, setIncomeDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (paymentInfo.length > 0) {
      const totals = paymentInfo.reduce(
        (acc, pay) => {
          acc.cash += Number(pay.cash) || 0;
          acc.checks += Number(pay.checks) || 0;
          acc.credit_card += Number(pay.credit_card) || 0;
          acc.total_paid += Number(pay.total_paid) || 0;
          acc.total +=
            (Number(pay.cash) || 0) +
            (Number(pay.checks) || 0) +
            (Number(pay.credit_card) || 0);
          return acc;
        },
        { cash: 0, checks: 0, credit_card: 0, total: 0, total_paid: 0 }
      );
      setIncomeDetails(totals);
    } else {
      setIncomeDetails({
        cash: 0,
        checks: 0,
        creditCard: 0,
        total: 0,
        total_paid: 0,
      });
    }
  }, [paymentInfo]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>{<TbListDetails onClick={showModal} />}</div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <Descriptions title="סך הכל געלט דעטאלן" layout="vertical" bordered>
          <Descriptions.Item
            label={
              <div className="withdrawal_display_container">
                <div>
                  <strong>${formatNumber(incomeDetails.total)}</strong>
                </div>
                <div>:ס"ה אריינגעקומען</div>
              </div>
            }
            span={3}
          >
            <div className="withdrawal_display_container">
              <div>
                <strong>${formatNumber(incomeDetails.cash)}</strong>
              </div>
              <div>:קעש</div>
            </div>
            <div className="withdrawal_display_container">
              <div>
                <strong>${formatNumber(incomeDetails.checks)}</strong>
              </div>
              <div>:טשעקס</div>
            </div>
            <div className="withdrawal_display_container">
              <div>
                <strong>${formatNumber(incomeDetails.credit_card)}</strong>
              </div>
              <div>:קרעדיט קארד</div>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};
export default IncomeTotalDetails;
