import "./totalBalance.css";
import React, { useState, useEffect } from "react";
import {
  getOldPaymentInfo,
  getAllWithdrawalInfoByAdminId,
} from "../../servers/getRequest";

const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

const TotalBalance = ({ paymentInfo, authData }) => {
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [busMoney, setBusMoney] = useState(0);
  const [washMoney, setWashMoney] = useState(0);
  const [customMoney, setCustomMoney] = useState(0);
  const [oldPyaments, setOldPayments] = useState(0);
  const [incomeDetails, setIncomeDetails] = useState([]);

  // Fetch data from the server
  useEffect(() => {
    async function fetchData() {
      try {
        const adminIdData = await getAllWithdrawalInfoByAdminId(
          authData.parent_admin_id
        );
        const oldData = await getOldPaymentInfo(); // get old payments
        setWithdrawalData(adminIdData); // set withdrawal data
        setOldPayments(oldData); // set old payments
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [withdrawalData, authData.parent_admin_id]);

  // Calculate the total income
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
      setIncomeDetails(totals); // set the total income
    } else {
      // if there is no payment info
      setIncomeDetails({
        cash: 0,
        checks: 0,
        creditCard: 0,
        total: 0,
        total_paid: 0,
      });
    }
  }, [paymentInfo]);

  // Calculate the total old income
  const totalOldIncome = Array.isArray(oldPyaments)
    ? oldPyaments.reduce((acc, pay) => acc + parseFloat(pay.total_paid), 0)
    : 0;

  // Calculate the total withdrawals
  useEffect(() => {
    const withdrawals = () => {
      let totalBusMoney = 0;
      let totalWashMoney = 0;
      let totalCustomMoney = 0;

      withdrawalData.forEach((withdrawal) => {
        if (
          withdrawal.withdrawal_to === "באס" ||
          withdrawal.withdrawal_to === "קאר/מיני ווען" ||
          withdrawal.withdrawal_to === "ספרינטער "
        ) {
          totalBusMoney += parseFloat(withdrawal.amount) || 0;
        } else if (withdrawal.withdrawal_to === "וואשן") {
          totalWashMoney += parseFloat(withdrawal.amount) || 0;
        } else {
          totalCustomMoney += parseFloat(withdrawal.amount) || 0;
        }
      });
      setBusMoney(totalBusMoney); // set the total bus money
      setWashMoney(totalWashMoney); // set the total wash money
      setCustomMoney(totalCustomMoney); // set the total custom money
    };
    withdrawals();
  }, [withdrawalData]);

  // Set the balance color
  let balanceColor;
  if (incomeDetails.total - busMoney + washMoney >= 0) {
    balanceColor = "black";
  } else if (incomeDetails.total - busMoney + washMoney < 0) {
    balanceColor = "red";
  }

  return (
    <div>
      <div>
        <div className="total_balance_container">
          <div className="total_balance_inner">
            <div>
              {incomeDetails.total + totalOldIncome ? (
                <strong>
                  ${formatNumber(incomeDetails.total + totalOldIncome)}
                </strong>
              ) : (
                <strong>$0</strong>
              )}
            </div>
            <div>עס איז אריינגעקומען </div>
          </div>

          <div className="total_balance_inner">
            <div>
              {washMoney ? (
                <strong>${formatNumber(washMoney)}</strong>
              ) : (
                <strong>$0</strong>
              )}
            </div>
            <div>עס איז ארויס פאר וואשן </div>
          </div>

          <div className="total_balance_inner">
            <div>
              {busMoney ? (
                <strong>${formatNumber(busMoney)}</strong>
              ) : (
                <strong>$0</strong>
              )}
            </div>
            <div>עס איז ארויס פאר באסעס </div>
          </div>

          <div className="total_balance_inner">
            <div>
              {customMoney ? (
                <strong>${formatNumber(customMoney)}</strong>
              ) : (
                <strong>$0</strong>
              )}
            </div>
            <div>Change עס איז ארויס פאר</div>
          </div>

          <div className="total_balance_inner">
            <div style={{ color: balanceColor }}>
              {busMoney + washMoney ? (
                <strong>
                  $
                  {formatNumber(
                    incomeDetails.total +
                      totalOldIncome -
                      busMoney -
                      washMoney -
                      customMoney
                  )}
                </strong>
              ) : (
                <strong>$0</strong>
              )}
            </div>
            <div>עס איז געבליבן </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBalance;
