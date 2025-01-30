import "./header.css";
import React from "react";
import HebrewDate from "../hebrewDate/hebrewDate";
import { useAuth } from "../AuthProvider/AuthProvider";
import Profile from "../profile/profile";

const PageHeader = () => {
  const { authData, setAuthData } = useAuth();

  return (
    <div className="header_container">
      <div className="header_yeshiva_container">
        <div
          className="header_yeshive_inner"
          style={{ fontFamily: "OYoelTovia" }}
        >
          ביזט איינגעשריבן פאר ישיבה
        </div>
        <div
          className="header_yeshive_name"
          style={{ fontFamily: "OYoelToviaBold" }}
        >
          "{authData.yeshiva}"
        </div>
      </div>
      <div className="hebrew_date">
        <HebrewDate />
      </div>
      <div className="profile_container">
        <div className="profile_info" style={{ fontFamily: "OYoelToviaBold" }}>
          <div className="header_welcome_container">
            <div className="header_welcome_inner">!א גוטן</div>
            <div className="header_welcome_name">
              {authData.first_name} {authData.last_name}
            </div>
          </div>
        </div>
        <Profile authData={authData} setAuthData={setAuthData} />
      </div>
    </div>
  );
};
export default PageHeader;
