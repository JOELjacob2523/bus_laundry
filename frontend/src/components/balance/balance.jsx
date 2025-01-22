import "./balance.css";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";

const StudentBalance = ({ payment }) => {
  const [zmanGoal, setZmanGoal] = useState(null);
  const [zmanStart, setZmanStart] = useState(0);
  const [zmanEnd, setZmanEnd] = useState(0);
  const [studentLocation, setStudentLocation] = useState([]);

  const { zmanGoalData, studentData } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allZmanGoalData = zmanGoalData;

        if (allZmanGoalData && allZmanGoalData[0]) {
          // Convert relevant fields to numbers
          allZmanGoalData[0].bus_price = Number(allZmanGoalData[0].bus_price);
          allZmanGoalData[0].van_price = Number(allZmanGoalData[0].van_price);
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
          allZmanGoalData[0].total_van_goal = Number(
            allZmanGoalData[0].total_van_goal
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

  useEffect(() => {
    if (studentData && studentData.length > 0 && payment.length > 0) {
      const paymentCity = payment.map((pay) => {
        const student = studentData.find(
          (student) => student.student_id === pay.student_id
        );
        return student?.city || "Unknown";
      });
      setStudentLocation(paymentCity);
    }
  }, [studentData, payment]);

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
    const closedWeeks = zmanGoal[0].closed_weeks.filter((closedWeek) => {
      const closedDate = new Date(closedWeek.date);
      closedDate.setHours(0, 0, 0, 0);
      return closedDate < currentDate;
    }).length;

    const isVanLocation = studentLocation.some((location) =>
      ["Monsey", "Airmont", "Spring Valley", "Suffern", "New City"].includes(
        location
      )
    );

    // Determine the cost based on the location
    let costPerWeek = isVanLocation
      ? zmanGoal[0].van_price
      : zmanGoal[0].bus_price;

    // Total costs
    const pastWashCost = numberOfWeeksPassed * zmanGoal[0].wash_price;
    const pastTravelCost = closedWeeks * costPerWeek;
    const totalCost = pastWashCost + pastTravelCost;

    // Payment attribution
    let remainingPayments = totalPayments;
    let usedWashCost = 0;
    let usedTravelCost = 0;

    // Deduct wash costs first
    if (remainingPayments >= pastWashCost) {
      usedWashCost = pastWashCost;
      remainingPayments -= pastWashCost;
    } else {
      usedWashCost = remainingPayments;
      remainingPayments = 0;
    }

    // Deduct travel costs (bus/van) next
    if (remainingPayments >= pastTravelCost) {
      usedTravelCost = pastTravelCost;
      remainingPayments -= pastTravelCost;
    } else {
      usedTravelCost = remainingPayments;
      remainingPayments = 0;
    }

    const balance = totalPayments - totalCost;

    return {
      totalCost,
      pastWashCost,
      pastTravelCost,
      usedWashCost,
      usedTravelCost,
      balance,
    };
  };

  const { totalCost, pastWashCost, pastTravelCost } = calculateTotalCost();

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

  const busZmanGoal =
    zmanGoal?.[0]?.total_bus_goal + zmanGoal?.[0]?.total_wash_goal;
  const vanZmanGoal =
    zmanGoal?.[0]?.total_van_goal + zmanGoal?.[0]?.total_wash_goal;

  const normalizedLocation = String(studentLocation || "")
    ?.trim()
    ?.toLowerCase();
  const isVanLocation = [
    "monsey",
    "airmont",
    "spring valley",
    "suffern",
    "new city",
  ].includes(normalizedLocation);

  let busBalanceColor = "black";
  let vanBalanceColor = "black";

  if (isVanLocation) {
    if (
      payment.length === 0 ||
      balance === vanZmanGoal - pastWashCost - pastTravelCost
    ) {
      vanBalanceColor = "black";
    } else if (balance > vanZmanGoal - pastWashCost - pastTravelCost) {
      vanBalanceColor = "green";
    } else if (balance < vanZmanGoal - pastWashCost - pastTravelCost) {
      vanBalanceColor = "red";
    }
  } else {
    if (
      payment.length === 0 ||
      balance === busZmanGoal - pastWashCost - pastTravelCost
    ) {
      busBalanceColor = "black";
    } else if (balance > busZmanGoal - pastWashCost - pastTravelCost) {
      busBalanceColor = "green";
    } else if (balance < busZmanGoal - pastWashCost - pastTravelCost) {
      busBalanceColor = "red";
    }
  }

  return (
    <div className="payment_info_container">
      {payment.length === 0 ? (
        <div className="no_payment">No payments found</div>
      ) : (
        <div>
          {isVanLocation ? (
            <div style={{ color: vanBalanceColor }}>${balance?.toFixed(2)}</div>
          ) : (
            <div style={{ color: busBalanceColor }}>${balance?.toFixed(2)}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentBalance;
