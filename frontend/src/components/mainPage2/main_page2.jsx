import "../../Fonts/fonts.css";
import "./main_page2.css";
import React, { useState, useEffect } from "react";
import { Card, Empty, Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import IncomeProgress from "../imcomeProgress/incomeProgress";
import Error500 from "../error/error";
import { Helmet } from "react-helmet";
import TotalClosedWeeks from "../totalClosedWeeks/totalClosedWeeks";
import MissingZmanInfo from "../missingZmanInfo/missingZmanInfo";

const MainPage2 = ({
  cityCounts,
  authData,
  studentData,
  paymentData,
  zmanGoalData,
}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [zmanGoal, setZmanGoal] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [restWeeks, setRestWeeks] = useState(0);
  const [nextSedra, setNextSedra] = useState(null);
  const [zmanEndingDate, setZmanEndingDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminIdData = studentData;
        const zmanGoalDataByAdminId = zmanGoalData;
        const paymentInfoDataByAdminId = paymentData;
        setUserInfo(adminIdData);
        setZmanGoal(zmanGoalDataByAdminId);
        setPaymentInfo(paymentInfoDataByAdminId);
      } catch (err) {
        console.error("Error fetching data:", err);
        <Error500 />;
      }
    };
    fetchData();
  }, [studentData, paymentData, zmanGoalData]);

  useEffect(() => {
    if (zmanGoal && Array.isArray(zmanGoal) && zmanGoal.length > 0) {
      const zmanEndDate = new Date(zmanGoal[0].zman_starts_ends?.end?.date);
      setZmanEndingDate(zmanEndDate);
    }
  }, [zmanGoal]);

  useEffect(() => {
    let now = new Date();
    if (zmanGoal && Array.isArray(zmanGoal) && zmanGoal.length > 0) {
      let zmanEnd = new Date(zmanGoal[0].zman_starts_ends?.end?.date);

      let differenceInMilliseconds = zmanEnd - now;
      let differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      let differenceInWeeks = Math.ceil(differenceInDays / 7);

      setRestWeeks(differenceInWeeks);
    }
  }, [zmanGoal]);

  const total = Array.isArray(paymentInfo)
    ? paymentInfo.reduce((acc, pay) => acc + parseFloat(pay.total_paid), 0)
    : 0;

  useEffect(() => {
    const fetchNextSedra = () => {
      try {
        if (zmanGoal && Array.isArray(zmanGoal) && zmanGoal.length > 0) {
          const sedras = zmanGoal[0].closed_weeks;
          const currentDate = new Date();

          let nextSedraFound = false;

          for (let i = 0; i < sedras.length; i++) {
            const sedraDate = new Date(sedras[i].date);
            if (sedraDate >= currentDate) {
              setNextSedra(sedras[i]);
              nextSedraFound = true;
              break;
            }
          }
          if (!nextSedraFound) {
            setNextSedra(null);
          }
        }
      } catch (error) {
        console.error("Error getting next sedra:", error);
        throw error;
      }
    };
    fetchNextSedra();
  }, [zmanGoal]);

  if (!userInfo || !zmanGoal || !cityCounts) {
    return (
      <div>
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
      </div>
    );
  }

  return (
    <div className="main_container">
      <Helmet>
        <title>Home - KJ Mesivta Bus & Laundry</title>
      </Helmet>
      <div className="main_page_header_container">
        <Card
          type="inner"
          title={
            <div>
              {zmanGoal.map((goal, index) => (
                <div className="main_title_container" key={index}>
                  <div>
                    <TotalClosedWeeks zmanGoal={zmanGoal} />
                  </div>
                  <div key={index} className="zman_name">
                    זמן אינפארמאציע פאר זמן ה{goal.zman}
                  </div>
                </div>
              ))}
            </div>
          }
          className="header2_card"
          style={{ textAlign: "right" }}
        >
          <div className="zman_info_details">
            {zmanGoal && zmanGoal.length > 0 ? (
              zmanGoal.map((goal, index) => (
                <div key={index}>
                  <h3
                    className="rest_weeks"
                    style={{ fontFamily: "OYoelTovia" }}
                  >
                    {new Date() > zmanEndingDate ? (
                      <>עס איז יעצט בין הזמנים</>
                    ) : (
                      <>
                        עס איז נאך דא{" "}
                        {restWeeks > 1 ? `${restWeeks} וואכן` : "1 וואך"} אינעם
                        זמן ה{goal.zman}
                      </>
                    )}
                  </h3>
                  <h4
                    key={index}
                    className="header2"
                    style={{ fontFamily: "OYoelTovia" }}
                  >
                    די קומענדיגע מאל וואס מען פארט אהיים איז{" "}
                    <strong style={{ fontFamily: "OYoelToviaBold" }}>
                      {nextSedra
                        ? `פרשת ${nextSedra && nextSedra.sedra}`
                        : `סוף זמן`}
                    </strong>
                  </h4>
                  <IncomeProgress
                    zmanGoal={zmanGoal}
                    paymentInfo={paymentInfo}
                    currentAmount={total}
                    goalAmount={goal.total_zman_goal * userInfo.length}
                    authData={authData}
                  />
                </div>
              ))
            ) : (
              <div>
                {authData.role === "Administrator" ? (
                  <div>
                    <MissingZmanInfo />
                  </div>
                ) : (
                  <div>
                    <Empty
                      description={
                        <div
                          style={{ fontFamily: "OYoelTovia", fontSize: "20px" }}
                        >
                          עס איז נאכנישט דא קיין זמן אינפארמאציע
                        </div>
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        <div className="student_amount_container">
          <Card
            title="וויליאמסבורג"
            style={{ textAlign: "right" }}
            type="inner"
          >
            <div>
              עס איז איינגעשריבן <strong>{cityCounts.brooklyn}</strong>{" "}
              {cityCounts.brooklyn > 1 ? "בחורים" : "בחור"} קיין וויליאמסבורג
            </div>
          </Card>
          <Card title="מאנסי" style={{ textAlign: "right" }} type="inner">
            <div>
              עס איז איינגעשריבן{" "}
              <strong>
                {cityCounts.monsey +
                  cityCounts.airmont +
                  cityCounts.springvalley +
                  cityCounts.suffern +
                  cityCounts.newcity}
              </strong>{" "}
              {cityCounts.monsey +
                cityCounts.airmont +
                cityCounts.springvalley +
                cityCounts.suffern +
                cityCounts.newcity >
              1
                ? "בחורים"
                : "בחור"}{" "}
              קיין מאנסי
            </div>
          </Card>
          <Card title="בארא פארק" style={{ textAlign: "right" }} type="inner">
            <div>
              עס איז איינגעשריבן <strong>{cityCounts.boropark}</strong>{" "}
              {cityCounts.boropark > 1 ? "בחורים" : "בחור"} קיין בארא פארק
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainPage2;
