import "./main_page2.css";
import React, { useState, useEffect } from "react";
import { getAllUserInfo } from "../../servers/getRequest";
import { getAllZmanGoalInfo } from "../../servers/getRequest";
import { Card, Spin } from "antd";
import IncomeProgress from "../imcomeProgress/incomeProgress";
import UpdateClosedWeeks from "../updateZmanInfo/updateZmanInfo";

const MainPage2 = ({ cityCounts }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [zmanGoal, setZmanGoal] = useState(null);
  const [restWeeks, setRestWeeks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getAllUserInfo();
      const zmanGoalData = await getAllZmanGoalInfo();
      setUserInfo(userData);
      setZmanGoal(zmanGoalData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (zmanGoal && Array.isArray(zmanGoal) && zmanGoal.length > 0) {
      const zmanEndDate = zmanGoal[0].zman_starts_ends.end.date;
    }
  }, [zmanGoal]);

  useEffect(() => {
    let now = new Date();
    if (zmanGoal && Array.isArray(zmanGoal) && zmanGoal.length > 0) {
      let zmanEnd = new Date(zmanGoal[0].zman_starts_ends.end.date);

      let differenceInMilliseconds = zmanEnd - now;
      let differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      let differenceInWeeks = Math.ceil(differenceInDays / 7);

      setRestWeeks(differenceInWeeks);
    }
  }, [zmanGoal]);

  if (!userInfo || !zmanGoal) {
    return (
      <div>
        <Spin fullscreen={true} tip="Loading..."></Spin>
      </div>
    );
  }

  return (
    <div className="main_container">
      <div className="main_page_header_container">
        <Card
          title={
            <div className="main_title_container">
              <div>{<UpdateClosedWeeks />}</div>
              {zmanGoal.map((goal, index) => (
                <div key={index} className="zman_name">
                  זמן ה{goal.zman}
                </div>
              ))}
              <div>זמן אינפארמאציע</div>
            </div>
          }
          className="header2_card"
          style={{ textAlign: "right" }}
        >
          <div className="zman_info_details">
            {zmanGoal.map((goal, index) => (
              <div key={index}>
                <h3 className="rest_weeks">
                  עס איז נאך דא {restWeeks} וואכן אינעם זמן ה{goal.zman}
                </h3>
                <h4 key={index} className="header2">
                  די קומענדיגע מאל וואס מען פארט אהיים איז פרשת{" "}
                  <strong>{goal.closed_weeks[1]}</strong>
                </h4>
                {/* <h4 className="header2">
                  עס דארף אריינגעקומען{" "}
                  <span className="sub_total_zman_goal">$</span>
                  {goal.total_zman_goal * userInfo.length} פאר זמן ה{goal.zman}
                </h4> */}
                <IncomeProgress
                  currentAmount={4691}
                  goalAmount={goal.total_zman_goal * userInfo.length}
                />{" "}
              </div>
            ))}
          </div>
        </Card>

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
    </div>
  );
};

export default MainPage2;
