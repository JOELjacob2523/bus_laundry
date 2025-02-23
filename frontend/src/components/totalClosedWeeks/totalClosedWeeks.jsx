import styles from "./totalClosedWeeks.css";
import "../../Fonts/fonts.css";
import React, { useEffect, useState } from "react";
import { Card, Divider, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { FiInfo } from "react-icons/fi";
import UpdateClosedWeeks from "../updateZmanInfo/updateZmanInfo";
import { useAuth } from "../AuthProvider/AuthProvider";

// Format number to currency
const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

// TotalClosedWeeks component
const TotalClosedWeeks = ({ zmanGoal }) => {
  const [zman, setZman] = useState([]);
  const [sedra, setSedra] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isZmanInfoEditing, setIsZmanInfoEditing] = useState(false);

  const { authData } = useAuth();

  // Set zman and sedra
  useEffect(() => {
    zmanGoal.map((detail) => setZman(detail));
    const sedrasArray = zmanGoal.flatMap((sedras) =>
      sedras.closed_weeks.map((sedra) => sedra.sedra)
    );
    setSedra(sedrasArray);
  }, [zmanGoal]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsZmanInfoEditing(false);
  };

  // Content for notification
  const content = (
    <div className="main_content_weeks_container">
      <div className="content_weeks_container">
        {isZmanInfoEditing ? (
          <div>
            <UpdateClosedWeeks setIsZmanInfoEditing={setIsZmanInfoEditing} />
          </div>
        ) : (
          <Card
            title={
              <div className="total_sedra_card_title">
                {(authData?.role === "Administrator" ||
                  authData?.role === "Manager") && (
                  <EditOutlined
                    type="primary"
                    className="update_zman_goal_btn"
                    onClick={() => setIsZmanInfoEditing(true)}
                  />
                )}
                <div>זמן אינפארמאציע</div>
              </div>
            }
            className="total_sedra_card_container"
            type="inner"
          >
            <div className="sedra_item_container">
              <div className="sedra_item">
                <div
                  style={{
                    fontFamily: "OYoelToviaBold",
                  }}
                >
                  {zman.zman}
                </div>
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  :זמן
                </div>
              </div>

              <div className="sedra_item">
                <div
                  style={{
                    fontFamily: "OYoelToviaBold",
                  }}
                >
                  {zman.zman_starts_ends &&
                  zman.zman_starts_ends.start &&
                  zman.zman_starts_ends.start.jewishDateStrHebrew
                    ? zman.zman_starts_ends.start.jewishDateStrHebrew
                    : ""}
                </div>
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  :תחילת הזמן
                </div>
              </div>

              <div className="sedra_item">
                <div
                  style={{
                    fontFamily: "OYoelToviaBold",
                  }}
                >
                  {zman.zman_starts_ends &&
                  zman.zman_starts_ends.end &&
                  zman.zman_starts_ends.end.jewishDateStrHebrew
                    ? zman.zman_starts_ends.end.jewishDateStrHebrew
                    : ""}
                </div>
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  :סוף הזמן
                </div>
              </div>

              <div className="sedra_item">
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  {zman.total_zman_weeks}
                </div>
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  :ס"ה וואכן אינעם זמן
                </div>
              </div>

              <div className="sedra_item">
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  {`$${formatNumber(zman.total_bus_goal)}`}
                </div>
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  :ס"ה באס פרייז{" "}
                </div>
              </div>

              <div className="sedra_item">
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  {`$${formatNumber(zman.total_van_goal)}`}
                </div>
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  :ס"ה ווען פרייז{" "}
                </div>
              </div>

              <div className="sedra_item">
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  {`$${formatNumber(zman.total_wash_goal)}`}
                </div>
                <div
                  style={{
                    fontFamily: "OYoelTovia",
                  }}
                >
                  :ס"ה וואשן פרייז{" "}
                </div>
              </div>
            </div>
            <Divider>פארמאכטע וואכן</Divider>
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
                      {`( ${index + 1}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="sedra_item">
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                {sedra.length}
              </div>
              <div
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                :ס"ה פארמאכטע וואכן
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <FiInfo onClick={showModal} className="total_weeks_icon" />
      <Modal
        title="Update Zman Information"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={550}
      >
        {content}
      </Modal>
    </div>
  );
};

export default TotalClosedWeeks;
