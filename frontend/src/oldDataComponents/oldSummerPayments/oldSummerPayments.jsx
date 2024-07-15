import { useEffect, useState } from "react";
import { getOldPaymentInfo } from "../../servers/getRequest";
import { Descriptions, Empty } from "antd";

const OldSummerPayments = ({ oldZmanGoal, items, selectedHebrewYear }) => {
  const [paymentData, setPaymentData] = useState([]);
  // const [hebrewYears, setHebrewYears] = useState([]);
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);

  useEffect(() => {
    const fetchOldPayments = async () => {
      const data = await getOldPaymentInfo();

      const startDateSet = new Set();
      const endDateSet = new Set();
      const hebrewYearSet = new Set();

      oldZmanGoal.forEach((goal) => {
        startDateSet.add(goal.zman_starts_ends.start.date);
        endDateSet.add(goal.zman_starts_ends.end.date);
      });

      items.forEach((item) => {
        hebrewYearSet.add(item.label);
      });

      setStartDates(Array.from(startDateSet));
      setEndDates(Array.from(endDateSet));
      // setHebrewYears(Array.from(hebrewYearSet));
      setPaymentData(data);
    };
    fetchOldPayments();
  }, [oldZmanGoal, items]);

  const isDateInRange = (date, startDates, endDates) => {
    return startDates.some((startDate, index) => {
      const endDate = endDates[index];
      return (
        new Date(startDate) <= new Date(date) &&
        new Date(date) <= new Date(endDate)
      );
    });
  };

  const getMatchingPayments = () => {
    return paymentData.filter((payment) => {
      const inDateRange = isDateInRange(payment.date, startDates, endDates);
      return selectedHebrewYear === payment.hebrewYear && inDateRange;
    });
  };

  const matchingPayments = getMatchingPayments();

  return (
    <div>
      {matchingPayments.length > 0 ? (
        matchingPayments.map((payment, index) => (
          // <div key={index}>{payment.first_name}</div>
          <div key={index}>
            <Descriptions
              title={`${payment.first_name} ${payment.last_name}`}
              items={"Hello"}
            />
          </div>
        ))
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
};

export default OldSummerPayments;
