import "./buses.css";
import React, { useState, useEffect } from "react";
import { Card, Col, Row, Pagination, Button } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { getAllUserInfo } from "../../servers/getRequest";
import AddUser from "../addUser/newUserBtn";
import EditUser from "../editUser/editUserBtn";

const Buses = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUserInfo();
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Calculate the cards to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = userInfo.slice(startIndex, endIndex);

  return (
    <div className="main_buses_container">
      <div className="content_container">
        <div className="add_user_container">
          <div>Search</div>
          <AddUser />
        </div>
        <div className="scrollable_cards">
          <Row gutter={16} className="row">
            {currentData.map((user) => (
              <Col
                key={user.user_id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                style={{ margin: "5px" }}
              >
                <Card
                  title={`${user.first_name} ${user.last_name}`}
                  bordered={false}
                  actions={[<EditUser />, <EllipsisOutlined key="ellipsis" />]}
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
          <div className="pagination">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={userInfo.length}
              onChange={handlePageChange}
              showSizeChanger
              pageSizeOptions={["8", "16", "24", "32"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buses;
