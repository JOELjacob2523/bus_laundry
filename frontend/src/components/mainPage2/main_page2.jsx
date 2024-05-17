import "./main_page2.css";
import React, { useState, useEffect } from "react";
import { getUserInfo } from "../servers";
import { Card } from "antd";

const MainPage2 = ({ cityCounts }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchData();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main_container">
      <div className="main_page_header_container">
        <Card className="total_income_card">
          <h2 className="header2">
            <span>?</span> די קומענדיגע מאל וואס מען פארט אהיים איז פרשת
          </h2>
        </Card>
      </div>
      <div className="total_income_container">
        <Card title="Total income" className="total_income_card">
          <div>
            עס דארף זיין $? פאר זמן ה?, עס איז דא $?, עס דארף נאך אריינקומען $?
            .
          </div>
        </Card>
      </div>

      <div className="student_amount_container">
        <Card title="וויליאמסבורג" style={{ textAlign: "right" }}>
          <div>
            עס זענען איינגעשריבן <strong>{cityCounts.brooklyn}</strong> בחורים
            קיין וויליאמסבורג
          </div>
        </Card>
        <Card title="מאנסי" style={{ textAlign: "right" }}>
          <div>
            עס זענען איינגעשריבן <strong>{cityCounts.monsey}</strong> בחורים
            קיין מאנסי
          </div>
        </Card>
        <Card title="בארא פארק" style={{ textAlign: "right" }}>
          <div>
            עס זענען איינגעשריבן <strong>{cityCounts.boropark}</strong> בחורים
            קיין בארא פארק
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MainPage2;
