import React, { useState } from "react";
import {
  ReactJewishDatePicker,
  BasicJewishDateRange,
} from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";
import { JewishMonth } from "jewish-dates-core";

const HebrewDatePicker = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // const [startDay, setStartDay] =
  //   (React.useState < BasicJewishDay) | (undefined > undefined);
  // const [endDay, setEndDay] =
  //   (React.useState < BasicJewishDay) | (undefined > undefined);
  // const basicJewishDateRange = {
  //   startDate: {
  //     day: 13,
  //     monthName: JewishMonth.Elul,
  //     year: 5788,
  //   },
  //   endDate: {
  //     day: 18,
  //     monthName: JewishMonth.Elul,
  //     year: 5788,
  //   },
  // };

  const handleDateChange = (start, end) => {
    console.log("Selected dates:", start, end);
    setDateRange({
      startDate: start,
      endDate: end,
    });
  };
  console.log("dateRange:", dateRange);
  return (
    <div>
      <ReactJewishDatePicker
        value={dateRange}
        isHebrew
        rangePicker
        // onClick={(startDay: BasicJewishDay, endDay: BasicJewishDay) => {
        //   setStartDay(startDay);
        //   setEndDay(endDay);
        // }}
        onClick={handleDateChange}
      />
      <p>
        Selected Date Range:{" "}
        {dateRange && dateRange.startDate && dateRange.endDate ? (
          <>
            {dateRange.startDate.day} {dateRange.startDate.monthName}{" "}
            {dateRange.startDate.year} - {dateRange.endDate.day}{" "}
            {dateRange.endDate.monthName} {dateRange.endDate.year}
          </>
        ) : (
          "Please select a date range"
        )}
      </p>
    </div>
  );
};

export default HebrewDatePicker;
