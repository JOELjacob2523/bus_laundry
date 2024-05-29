import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const HebcalDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [jewishHolidays, setJewishHolidays] = useState([]);

  useEffect(() => {
    const fetchJewishHolidays = async () => {
      try {
        const response = await axios.get(
          `https://www.hebcal.com/hebcal?v=1&year=${new Date().getFullYear()}&month=x&maj=on&min=on&mod=on&nx=on&mf=on&ss=on&c=on&geo=geoname`
        );
        const dates = response.data.items.map((item) => new Date(item.date));
        setJewishHolidays(dates);
      } catch (error) {
        console.error("Error fetching Jewish holidays:", error);
      }
    };

    fetchJewishHolidays();
  }, []);

  const isJewishHoliday = (date) => {
    return jewishHolidays.some((d) => d.getTime() === date.getTime());
  };

  const highlightDates = {
    "react-datepicker__day--highlighted-custom-1": jewishHolidays,
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        highlightDates={highlightDates}
        dayClassName={(date) =>
          isJewishHoliday(date) ? "highlight" : undefined
        }
        inline
      />
      <style>
        {`
          .highlight.react-datepicker__day--highlighted-custom-1 {
            background-color: #ffb3b3;
            color: #000;
          }
        `}
      </style>
    </div>
  );
};

export default HebcalDatePicker;
