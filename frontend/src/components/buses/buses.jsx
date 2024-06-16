import "./buses.css";
import React, { useState, useEffect } from "react";
import { Row, Col, Pagination, Empty } from "antd";
import { getAllPaymentInfo, getAllUserInfo } from "../../servers/getRequest";
import AddUser from "../addUser/newUserBtn";
import UserCard from "./userCard";
import SearchBar from "../search/search";

const Buses = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [filteredUserInfo, setFilteredUserInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(32);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUserInfo();
        const payments = await getAllPaymentInfo();
        console.log("Fetched payment data:", payments);

        const paymentMap = payments.reduce((acc, payment) => {
          const { student_id } = payment;
          if (!acc[student_id]) {
            acc[student_id] = [];
          }
          acc[student_id].push(payment);
          return acc;
        }, {});

        setUserInfo(data);
        setPaymentInfo(paymentMap);
        setFilteredUserInfo(data);
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

  const handleSearch = (results) => {
    setFilteredUserInfo(results);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Calculate the cards to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredUserInfo.slice(startIndex, endIndex);

  return (
    <div className="main_buses_container">
      <div className="content_container">
        <div className="scrollable_cards">
          <div className="add_user_container">
            <div className="search_inner">
              <SearchBar input={userInfo} onSearch={handleSearch} />
            </div>
            <div className="add_user_inner">
              <AddUser />
            </div>
          </div>
          {filteredUserInfo.length === 0 ? (
            <div className="data_not_found">
              <Empty description="No matches found" />
            </div>
          ) : (
            <>
              <Row gutter={16} className="row">
                {currentData.map((student) => (
                  <Col
                    key={student.student_id}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                    style={{ margin: "5px" }}
                  >
                    <UserCard
                      student={student}
                      payment={paymentInfo[student.student_id] || []}
                    />
                  </Col>
                ))}
              </Row>
              {filteredUserInfo > pageSize && (
                <div className="pagination">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredUserInfo.length}
                    onChange={handlePageChange}
                    showSizeChanger
                    pageSizeOptions={["32", "50", "100", "200"]}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buses;
