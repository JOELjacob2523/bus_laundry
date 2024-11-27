import { useEffect, useState } from "react";
import { getAllZmanGoalInfo } from "../../servers/getRequest";
import "./balance.css";

const StudentBalance = ({ payment }) => {
  const [zmanGoal, setZmanGoal] = useState(null);
  const [zmanStart, setZmanStart] = useState(0);
  const [zmanEnd, setZmanEnd] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const zmanGoalData = await getAllZmanGoalInfo();

        if (zmanGoalData && zmanGoalData[0]) {
          // Convert relevant fields to numbers
          zmanGoalData[0].bus_price = Number(zmanGoalData[0].bus_price);
          zmanGoalData[0].wash_price = Number(zmanGoalData[0].wash_price);
          zmanGoalData[0].total_bus_goal = Number(
            zmanGoalData[0].total_bus_goal
          );
          zmanGoalData[0].total_wash_goal = Number(
            zmanGoalData[0].total_wash_goal
          );
          zmanGoalData[0].total_zman_goal = Number(
            zmanGoalData[0].total_zman_goal
          );
        }

        setZmanGoal(zmanGoalData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!zmanGoal || !zmanGoal.length === 0) return;
    const startDate = new Date(zmanGoal[0].zman_starts_ends?.start.date);
    setZmanStart(startDate);
    const endDate = new Date(zmanGoal[0].zman_starts_ends?.end.date);
    setZmanEnd(endDate);
  }, [zmanGoal]);

  let totalPayments = 0;

  payment.forEach((pay) => {
    const { payment_type, total_paid } = pay;
    const paidAmount = Number(total_paid) || 0;

    if (payment_type === "bus") {
      totalPayments += paidAmount;
    } else if (payment_type === "wash") {
      totalPayments += paidAmount;
    } else if (payment_type === "bus_wash") {
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

    let pastWashCost = 0;
    // Calculate costs for wash for the past weeks
    for (let i = 0; i < numberOfWeeksPassed; i++) {
      pastWashCost += Number(zmanGoal[0].wash_price) || 0;
    }

    let pastBusCost = 0;
    // Calculate costs for bus for the past weeks
    zmanGoal[0].closed_weeks.forEach((closedWeek) => {
      const closedDate = new Date(closedWeek.date);
      closedDate.setHours(0, 0, 0, 0);

      if (closedDate < currentDate) {
        pastBusCost += Number(zmanGoal[0].bus_price) || 0;
      }
    });

    let totalCost = 0;

    if (totalPayments === zmanGoal[0].total_bus_goal) {
      totalCost += pastBusCost;
    } else if (totalPayments === zmanGoal[0].total_wash_goal) {
      totalCost += pastWashCost;
    } else if (totalPayments === zmanGoal[0].total_zman_goal) {
      totalCost += pastWashCost + pastBusCost;
    }

    return { totalCost };
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

  if (payment.length === 0 || balance === 0) {
    balanceColor = "black";
  } else if (balance > 0) {
    balanceColor = "green";
  } else {
    balanceColor = "red";
  }

  // if (payment.length === 0 || balance === 0) {
  //   balanceColor = "black";
  // } else if (balance >= remainingWeeksCost) {
  //   balanceColor = "green";
  // } else if (balance < remainingWeeksCost) {
  //   balanceColor = "red";
  // } else {
  //   balanceColor = "black";
  // }

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
