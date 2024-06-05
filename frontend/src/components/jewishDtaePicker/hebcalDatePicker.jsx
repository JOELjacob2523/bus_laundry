// import "./hebcalDatePicker.css";
// import React, { useState } from "react";
// import { ReactJewishDatePicker, BasicJewishDay } from "react-jewish-datepicker";
// import "react-jewish-datepicker/dist/index.css";

// const HebrewDatePicker = () => {
//   const [basicJewishDay, setBasicJewishDay] = useState();

//   return (
//     <div className="selected_date_container">
//       <ReactJewishDatePicker
//         value={new Date()}
//         isHebrew
//         isRange
//         onClick={(day) => {
//           setBasicJewishDay(day);
//         }}
//       />
//     </div>
//   );
// };

import "./hebcalDatePicker.css";
import React, { useState } from "react";
import { ReactJewishDatePicker, BasicJewishDay } from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";

const HebrewDatePicker = ({ onChange }) => {
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleDateChange = (day) => {
    setDateRange(day);
    if (onChange) {
      onChange(day);
    }
  };

  return (
    <div className="selected_date_container">
      <ReactJewishDatePicker
        value={new Date()}
        isHebrew
        isRange
        onClick={handleDateChange}
      />
    </div>
  );
};

export default HebrewDatePicker;
