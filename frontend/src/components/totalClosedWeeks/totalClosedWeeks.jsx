import styles from "./totalClosedWeeks.css";
import "../../Fonts/fonts.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Space, notification } from "antd";
import { FiInfo } from "react-icons/fi";

const TotalClosedWeeks = ({ zmanGoal }) => {
  const [sedra, setSedra] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const sedrasArray = zmanGoal.flatMap((sedras) =>
      sedras.closed_weeks.map((sedra) => sedra.sedra)
    );
    setSedra(sedrasArray);
  }, [zmanGoal]);

  const content = (
    <div className="main_content_weeks_container">
      <div className="content_weeks_container">
        <Card
          title={<div>די פאלגענדע וואכן איז מען פארמאכט</div>}
          className="total_sedra_card_container"
        >
          {sedra.map((item, index) => (
            <div key={index} className={styles.sedra_item}>
              <div className="sedra_item_container">
                <div className="sedra_item">
                  <div
                    style={{
                      fontFamily: "OYoelToviaBold",
                    }}
                  >
                    פרשת {item}
                  </div>
                  <div
                    style={{
                      fontFamily: "OYoelTovia",
                    }}
                  >
                    נומער {index + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );

  const openNotification = (placement) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Destroy All
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          Ok
        </Button>
      </Space>
    );
    api.open({
      description: (
        <div className="total_weeks_description_container">{content}</div>
      ),
      placement,
      btn,
      key,
      duration: null,
      style: { paddingTop: "50px" },
    });
  };

  return (
    <div>
      {contextHolder}
      <FiInfo
        onClick={() => openNotification("top")}
        className="total_weeks_icon"
      />
    </div>
  );
};

export default TotalClosedWeeks;
