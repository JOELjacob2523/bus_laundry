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

  const balance = totalPayments;
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
        <div style={{ color: balanceColor }}>${balance}</div>
      )}
    </div>
  );
};

export default StudentBalance;
