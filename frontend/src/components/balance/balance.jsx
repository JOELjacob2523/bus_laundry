import { useEffect, useState } from "react";
import { getAllZmanGoalInfo } from "../../servers/getRequest";
import "./balance.css";

const StudentBalance = ({ payment }) => {
  const [zmanGoal, setZmanGoal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const zmanGoalData = await getAllZmanGoalInfo();
        setZmanGoal(zmanGoalData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const totalPayments = payment.reduce(
    (acc, pay) => acc + parseFloat(pay.total_paid),
    0
  );

  // const weeklyCost = zmanGoal?.[0]?.wash_price || 0;
  // const highWeeklyCost = zmanGoal?.[0]?.bus_price || 0;

  // const isHighCostWeek = (week) => {
  //   if (!zmanGoal || !zmanGoal[0] || !zmanGoal[0].closed_weeks) return false;

  //   return zmanGoal[0].closed_weeks.some((closedWeek) => {
  //     const closedDate = new Date(closedWeek.date);
  //     return (
  //       closedDate.getFullYear() === week.getFullYear() &&
  //       closedDate.getMonth() === week.getMonth() &&
  //       closedDate.getDate() === week.getDate()
  //     );
  //   });
  // };

  // // Calculate the total cost up to the current date
  // const calculateTotalCost = () => {
  //   if (!zmanGoal || !zmanGoal[0]) return 0;

  //   const startDate = new Date(zmanGoal[0].zman_starts_ends.start.date);
  //   const endDate = new Date(zmanGoal[0].zman_starts_ends.end.date);
  //   const currentDate = new Date();

  //   let totalCost = 0;
  //   let week = new Date(startDate);

  //   while (week <= endDate && week <= currentDate) {
  //     let weekCost = weeklyCost;

  //     if (isHighCostWeek(week)) {
  //       weekCost += highWeeklyCost;
  //     }

  //     totalCost += weekCost;

  //     // Move to the next week
  //     week.setDate(week.getDate() + 7);
  //   }

  //   return totalCost;
  // };

  // const totalCost = calculateTotalCost();
  // const balance = totalPayments - totalCost;

  // console.log("Total Payments:", totalPayments);
  // console.log("Total Cost:", totalCost);
  // console.log("Balance:", balance);

  let balance = totalPayments;
  let balanceColor;
  if (zmanGoal && zmanGoal[0] && balance < zmanGoal[0].total_zman_goal) {
    balanceColor = "red";
  } else if (zmanGoal && zmanGoal[0] && balance > zmanGoal[0].total_zman_goal) {
    balanceColor = "green";
  } else {
    balanceColor = "black";
  }

  return (
    <div className="payment_info_container">
      {payment.length === 0 ? (
        <div className="no_payment">No payments found</div>
      ) : (
        <div style={{ color: balanceColor }}>${balance.toFixed(2)}</div>
      )}
    </div>
  );
};

export default StudentBalance;
