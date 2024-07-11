import { useEffect, useState } from "react";
import { getOldPaymentInfo } from "../../servers/getRequest";

const OldSummerPayments = ({ oldZmanGoal, items }) => {
  const [paymentData, setPyamentData] = useState([]);
  // const [hebrewYear, setHebrewYear] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    const fetchOldPayments = async () => {
      const data = await getOldPaymentInfo();

      const startDate = oldZmanGoal.map((start) => {
        const date = start.zman_starts_ends.start.date;
        return date;
      });
      setStart(startDate);

      const endDate = oldZmanGoal.map((start) => {
        const date = start.zman_starts_ends.end.date;
        return date;
      });
      setEnd(endDate);

      // const hebrewYearString = data.map((zmanGoal) => {
      //   const hebrewDate = zmanGoal.pay_date;
      //   if (typeof hebrewDate === "string") {
      //     const dateParts = hebrewDate.split(" ");
      //     if (dateParts.length === 3) {
      //       const hebrewYear = dateParts[2];
      //       return hebrewYear;
      //     }
      //   }
      //   return null;
      // });
      // setHebrewYear(hebrewYearString);
      setPyamentData(data);
    };
    fetchOldPayments();
  }, [oldZmanGoal, items]);

  console.log("Start", start);
  console.log("End", end);

  return (
    <div>
      {paymentData.map((payment, index) => (
        <div key={index}>{payment.first_name}</div>
      ))}
    </div>
  );
};

export default OldSummerPayments;
