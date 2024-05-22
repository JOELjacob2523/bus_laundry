import "./buses.css";
import React, { useState, useEffect } from "react";
import { Row, Col, Pagination } from "antd";
import { getAllUserInfo } from "../../servers/getRequest";
import AddUser from "../addUser/newUserBtn";
import UserCard from "../editUser/userCard";
import SearchBar from "../search/search";

const Buses = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(32);

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
        <div className="scrollable_cards">
          <div className="add_user_container">
            <div className="search_inner">
              <SearchBar />
            </div>
            <div className="add_user_inner">
              <AddUser />
            </div>
          </div>
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
                <UserCard user={user} />
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
              pageSizeOptions={["32", "50", "100", "200"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buses;
