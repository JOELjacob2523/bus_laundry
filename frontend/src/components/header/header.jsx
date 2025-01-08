import "./header.css";
import KYSymbol from "../../images/KYSymbol.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HebrewDate from "../hebrewDate/hebrewDate";
import { getStudentLoginInfo } from "../../servers/userRequests/getUserRequest";
import { useAuth } from "../AuthProvider/AuthProvider";
import Profile from "../profile/profile";

const PageHeader = () => {
  const { authData, setAuthData } = useAuth();
  const [userInfo, setUserInfo] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentLoginInfo(authData.userId);
        setUserInfo(data);
      } catch (err) {
        console.error(err);
        navigate("/error500");
      }
    };
    fetchData();
  }, [authData.userId, navigate]);

  useEffect(() => {
    if (authData.role === "Administrator") {
      setStatus("Administrator");
    } else if (authData.role === "Manager") {
      setStatus("Manager");
    } else {
      setStatus("User");
    }
  }, [authData.role]);

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
        <div className="profile_info">
          <div>
            {authData.first_name} {authData.last_name} ,א גוטן
          </div>
        </div>
        <Profile
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          authData={authData}
          setStatus={setStatus}
          setAuthData={setAuthData}
        />
      </div>
    </div>
  );
};
export default PageHeader;
