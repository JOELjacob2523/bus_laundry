import "./balance.css";

const StudentBalance = ({ payment }) => {
  const totalPayments = payment.reduce(
    (acc, pay) => acc + parseFloat(pay.total_paid),
    0
  );

  const balance = totalPayments;
  const balanceColor = balance >= 0 ? "green" : "red";

  return (
    <div className="payment_info_container">
      {payment.length === 0 ? (
        <div>No payments found</div>
      ) : (
        <div style={{ color: balanceColor }}>${balance}</div>
      )}
    </div>
  );
};

export default StudentBalance;
