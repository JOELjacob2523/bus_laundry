import "./header.css";
import KYSymbol from "../../images/KYSymbol.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HebrewDate from "../hebrewDate/hebrewDate";
import { getStudentLoginInfo } from "../../servers/userRequests/getUserRequest";
import { useAuth } from "../AuthProvider/AuthProvider";
import Profile from "../profile/profile";

const PageHeader = () => {
  const { authData } = useAuth();
  const [userInfo, setUserInfo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //get user info by id
        const data = await getStudentLoginInfo(authData.userId);
        setUserInfo(data);
      } catch (err) {
        console.error(err);
        navigate("/error500");
      }
    };
    fetchData();
  }, [authData.userId, navigate]);

  return (
    <div className="header_container">
      <div className="KY_symbol_container">
        <a href="http://localhost:3000/" className="KY_symbol_container">
          <img className="KY_symbol_img" alt="KYSymbol" src={KYSymbol} />
        </a>
      </div>
      <div className="hebrew_date">
        <HebrewDate />
      </div>
      <div className="profile_container">
        <div style={{ paddingBottom: "5px" }}>Hello, {userInfo.first_name}</div>
        <Profile />
      </div>
    </div>
  );
};
export default PageHeader;
