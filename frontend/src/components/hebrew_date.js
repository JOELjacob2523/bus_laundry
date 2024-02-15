import React, { useState, useEffect } from 'react';
import Hebcal from 'hebcal';

const HebrewDate = () => {
  const [now, setNow] = useState(getFormattedTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(getFormattedTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getFormattedTime() {
    let hour = new Date().getHours();
    let min = new Date().getMinutes();
    let period = 'צופרי';

    if (hour > 12) {
      hour = hour - 12;
      period = 'נאכמיטאג';
    }

    return `${hour}:${min < 10 ? '0' : ''}${min} ${period}`;
  }

  const jewishWeekDays = {
    0: 'זונטאג',
    1: 'מאנטאג',
    2: 'דינסטאג',
    3: 'מיטוואך',
    4: 'דאנערשטאג',
    5: 'פרייטאג',
    6: 'שבת קודש'
  }

  const hebrewDate = Hebcal.HDate(new Date()).toString('h');
  const day = Hebcal.HDate(new Date()).getDay();
  const sedra = Hebcal.HDate(new Date()).getSedra('h');

  return (
    <>
    <h1 className="container text-center fw-bold mt-5">
      {`${jewishWeekDays[day]} פרשת ${sedra} ${hebrewDate} ${now}`}
    </h1>
    </>
  );
};

export default HebrewDate;
