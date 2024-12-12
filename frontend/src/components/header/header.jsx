import "./header.css";
import KYSymbol from "../../images/KYSymbol.png";
import items from "./headerItems";
import React, { useEffect, useState } from "react";
import HebrewDate from "../hebrewDate/hebrewDate";
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getStudentLoginInfo } from "../../servers/userRequests/getUserRequest";
import { useAuth } from "../AuthProvider/AuthProvider";

const PageHeader = () => {
  // const { userId } = useAuth();
  const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getStudentLoginInfo(userId);
  //     setUserName(data.first_name);
  //   };
  //   fetchData();
  // }, [userId]);

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
        {/* <div style={{ paddingBottom: "5px" }}>Hello, {userName}</div> */}
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
          className="dropdown"
        >
          <Avatar size={48} icon={<UserOutlined />} className="profile" />
        </Dropdown>
      </div>
    </div>
  );
};
export default PageHeader;
