import "./header.css";
import KYSymbol from "../images/KYSymbol.png";
import { CgProfile } from "react-icons/cg";
import React from "react";
import HebrewDate from "../hebrewDate/hebrewDate";
import { Button } from "antd";

const PageHeader = () => (
  <div className="header_container">
    <div className="KY_symbol_container">
      {<img className="KY_symbol_img" alt="KYSymbol" src={KYSymbol} />}
    </div>
    <div className="hebrew_date">
      <HebrewDate />
    </div>
    <div className="profile_container">
      <Button className="profile_btn">
        <CgProfile className="profile" />
      </Button>
    </div>
  </div>
);
export default PageHeader;
