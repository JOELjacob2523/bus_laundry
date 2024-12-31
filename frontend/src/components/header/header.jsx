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
    } else if (authData.role === "Super Admin") {
      setStatus("Super Admin");
    } else {
      setStatus("User");
    }
  }, [authData.role]);

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
        <div className="profile_info">
          <div>
            Hello, {authData.first_name} {authData.last_name}
          </div>
          <div>Status: {status}</div>
        </div>
        <Profile
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          authData={authData}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
};
export default PageHeader;
