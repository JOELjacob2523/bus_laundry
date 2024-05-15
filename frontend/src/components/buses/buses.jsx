import "./buses.css";
import { getUserInfo } from "../servers";
import { Button, Card, Col, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const Buses = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const data = userInfo.map((user) => ({
    // user_id: user.user_id,
    // first_name: user.first_name,
    // last_name: user.last_name,
    // age: user.age,
    // address1: user.address1,
    // address2: user.address2,
    // city: user.city,
    // state: user.state,
    // zip_code: user.zip_code,
  }));

  return (
    <div className="main_buses_container">
      <div className="content_container">
        <div>
          <Row gutter={16} className="row">
            {userInfo.map((user) => (
              <Col
                key={user.user_id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                style={{
                  margin: "5px",
                }}
              >
                <Card
                  title={`${user.first_name} ${user.last_name}`}
                  bordered={false}
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <div className="user_info_container">
                    <div>Age</div>
                    <div>{user.age}</div>
                  </div>
                  <div className="user_info_container">
                    <div>Address 1</div>
                    <div>{user.address1}</div>
                  </div>
                  <div className="user_info_container">
                    <div>Address 2</div>
                    <div>{user.address2}</div>
                  </div>
                  <div className="user_info_container">
                    <div>City</div>
                    <div>{user.city}</div>
                  </div>
                  <div className="user_info_container">
                    <div>State</div>
                    <div>{user.state}</div>
                  </div>
                  <div className="user_info_container">
                    <div>Zip Code</div>
                    <div>{user.zip_code}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <div className="add_btn_container">
        <Button type="primary" className="add_btn">
          Add New User
        </Button>
      </div>
    </div>
  );
};

export default Buses;
