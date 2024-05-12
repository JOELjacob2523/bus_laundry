import "./main_page.css";
import React, { useState } from "react";
import FirstName from "../user_info";
import FullInfo from "../full_name";
import MonseyStudents from "../monsey_students";

const MainPage = ({ cityCounts }) => {
  const [visibility, setVisibility] = useState({
    form: false,
    info: false,
    wili: false,
    bp: false,
    monsey: false,
  });

  const toggleVisibility = (key) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [key]: !prevVisibility[key],
    }));
  };

  return (
    <div className="main_container">
      <h2 className="header2">
        <span>?</span> די קומענדיגע מאל וואס מען פארט אהיים איז פרשת
      </h2>
    </div>
  );
};

export default MainPage;
