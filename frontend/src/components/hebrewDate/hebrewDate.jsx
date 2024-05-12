import "./hebrewDate.css";
import React, { useState, useEffect } from "react";
import Hebcal from "hebcal";
import { HDate, HebrewDateEvent } from "@hebcal/core";

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
    let period = "צופרי";

    if (hour > 12) {
      hour = hour - 12;
      period = "נאכמיטאג";
    }

    return `${hour}:${min < 10 ? "0" : ""}${min} ${period}`;
  }

  const jewishWeekDays = {
    0: `א'`,
    1: `ב'`,
    2: `ג'`,
    3: `ד'`,
    4: `ה'`,
    5: `ו'`,
    6: "שבת קודש",
  };

  //Hebcal.HDate().locale = "he";

  const hd = new HDate(new Date());
  const ev = new HebrewDateEvent(hd);

  const hebrewDate = ev.render("he");
  const day = Hebcal.HDate(new Date()).getDay();
  const sedra = Hebcal.HDate(new Date()).getSedra("h");
  //"he-x-NoNikud"

  return (
    <>
      <h1 className="hebrew_date">
        {`יום ${jewishWeekDays[day]} ${sedra} ${hebrewDate} ${now}`}
      </h1>
    </>
  );
};

export default HebrewDate;
