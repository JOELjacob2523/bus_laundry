import "./balance.css";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";

const StudentBalance = ({ payment }) => {
  const [zmanGoal, setZmanGoal] = useState(null);
  const [zmanStart, setZmanStart] = useState(0);
  const [zmanEnd, setZmanEnd] = useState(0);

  const { zmanGoalData } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allZmanGoalData = zmanGoalData;

        if (allZmanGoalData && allZmanGoalData[0]) {
          // Convert relevant fields to numbers
          allZmanGoalData[0].bus_price = Number(allZmanGoalData[0].bus_price);
          allZmanGoalData[0].wash_price = Number(allZmanGoalData[0].wash_price);
          allZmanGoalData[0].total_bus_goal = Number(
            allZmanGoalData[0].total_bus_goal
          );
          allZmanGoalData[0].total_wash_goal = Number(
            allZmanGoalData[0].total_wash_goal
          );
          allZmanGoalData[0].total_zman_goal = Number(
            allZmanGoalData[0].total_zman_goal
          );
        }

        setZmanGoal(allZmanGoalData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [zmanGoalData]);

  useEffect(() => {
    if (!zmanGoal || !zmanGoal.length === 0) return;
    const startDate = new Date(zmanGoal[0].zman_starts_ends?.start.date);
    setZmanStart(startDate);
    const endDate = new Date(zmanGoal[0].zman_starts_ends?.end.date);
    setZmanEnd(endDate);
  }, [zmanGoal]);

  let totalPayments = 0;

  payment.forEach((pay) => {
    const { bus_amount, wash_amount, total_paid } = pay;
    const paidAmount = Number(total_paid) || 0;

    if (bus_amount && !wash_amount) {
      totalPayments += paidAmount;
    } else if (wash_amount && !bus_amount) {
      totalPayments += paidAmount;
    } else if (bus_amount && wash_amount) {
      totalPayments += paidAmount;
    }
  });

  const calculateTotalCost = () => {
    if (!zmanGoal || !zmanGoal[0])
      return { totalCost: 0, remainingWeeksCost: 0 };

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the number of weeks that have passed since zmanStart
    const numberOfWeeksPassed = Math.floor(
      (Math.min(currentDate, zmanEnd) - zmanStart) / (7 * 24 * 60 * 60 * 1000)
    );

    // Calculate closed bus weeks
    const closedBusWeeks = zmanGoal[0].closed_weeks.filter((closedWeek) => {
      const closedDate = new Date(closedWeek.date);
      closedDate.setHours(0, 0, 0, 0);
      return closedDate < currentDate;
    }).length;

    // Total costs
    const pastWashCost = numberOfWeeksPassed * zmanGoal[0].wash_price;
    const pastBusCost = closedBusWeeks * zmanGoal[0].bus_price;
    const totalCost = pastWashCost + pastBusCost;

    // Payment attribution
    let remainingPayments = totalPayments;
    let usedWashCost = 0;
    let usedBusCost = 0;

    // Deduct wash costs first
    if (remainingPayments >= pastWashCost) {
      usedWashCost = pastWashCost;
      remainingPayments -= pastWashCost;
    } else {
      usedWashCost = remainingPayments;
      remainingPayments = 0;
    }

    // Deduct bus costs next
    if (remainingPayments >= pastBusCost) {
      usedBusCost = pastBusCost;
      remainingPayments -= pastBusCost;
    } else {
      usedBusCost = remainingPayments;
      remainingPayments = 0;
    }

    const balance = totalPayments - totalCost;

    return {
      totalCost,
      pastWashCost,
      pastBusCost,
      usedWashCost,
      usedBusCost,
      balance,
    };
  };

  const { totalCost } = calculateTotalCost();

  let balance = 0;
  payment.some((pay) => {
    const { date } = pay;
    let day = new Date(date);
    day.setHours(0, 0, 0, 0);
    if (day > zmanStart && day < zmanEnd) {
      balance = totalPayments - totalCost;
      return true;
    }
    return false;
  });

  let balanceColor;

  if (payment.length === 0 || balance >= 0) {
    balanceColor = "black";
  } else if (balance > 0) {
    balanceColor = "green";
  } else {
    balanceColor = "red";
  }

  return (
    <div className="payment_info_container">
      {payment.length === 0 ? (
        <div className="no_payment">No payments found</div>
      ) : (
        <div style={{ color: balanceColor }}>${balance?.toFixed(2)}</div>
      )}
    </div>
  );
};

export default StudentBalance;
