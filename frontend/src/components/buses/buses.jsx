import "../../Fonts/fonts.css";
import "./buses.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Pagination, Empty, Button, message, Typography } from "antd";
import { getAllPaymentInfo, getAllUserInfo } from "../../servers/getRequest";
import { archiveOldStudentPayments } from "../../servers/postRequest";
import AddUser from "../addUser/newUserBtn";
import UserCard from "./userCard";
import SearchBar from "../search/search";
import { Helmet } from "react-helmet";

const { Title } = Typography;

const Buses = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [filteredUserInfo, setFilteredUserInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUserInfo();
        const payments = await getAllPaymentInfo();

        const paymentMap = payments.reduce((acc, payment) => {
          const { student_id } = payment;
          if (!student_id) {
            console.warn("Payment is missing student_id:", payment);
            return acc;
          }
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

  const handleUserAdded = async (newUser) => {
    try {
      const updatedUserInfo = await getAllUserInfo();
      setUserInfo(updatedUserInfo);
      setFilteredUserInfo(updatedUserInfo);
    } catch (err) {
      console.error("Failed to fetch updated user info:", err);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = (filteredData) => {
    setFilteredUserInfo(filteredData);
    setCurrentPage(1);
  };

  const resetSearch = () => {
    setFilteredUserInfo(userInfo);
    setCurrentPage(1);
  };

  const handleCheckboxChange = (studentId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(studentId)) {
        return prevSelectedUsers.filter((id) => id !== studentId);
      } else {
        return [...prevSelectedUsers, studentId];
      }
    });
  };

  const handleArchive = async (selectedUsers) => {
    try {
      await archiveOldStudentPayments(selectedUsers);
      message.success("Students archived successfully", 1.5, () => navigate(0));
      setSelectedUsers([]);
    } catch (err) {
      console.error(err);
      message.open({
        type: "error",
        content: "Failed to archive students",
      });
    }
  };

  const updatePayment = (updatedPayment) => {
    setPaymentInfo((prevPayments) => {
      // Convert the object to an array of payments
      const paymentsArray = Object.values(prevPayments).flat();

      // Update the payment
      const updatedPayments = paymentsArray.map((payment) =>
        payment.student_id === updatedPayment.student_id &&
        payment.id === updatedPayment.id
          ? { ...payment, ...updatedPayment }
          : payment
      );

      // Recreate the object grouped by `student_id`
      const updatedPaymentMap = updatedPayments.reduce((acc, payment) => {
        const { student_id } = payment;
        if (!acc[student_id]) acc[student_id] = [];
        acc[student_id].push(payment);
        return acc;
      }, {});

      return updatedPaymentMap; // Set the updated object
    });
  };

  // Calculate the cards to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredUserInfo.slice(startIndex, endIndex);

  return (
    <div className="main_buses_container">
      <Helmet>
        <title>Bus & Wash - Kadishes Yoel Bus & Laundry</title>
      </Helmet>
      <div className="content_container">
        <div className="scrollable_cards">
          <div className="second_header_container">
            <div className="bocherim_count_container">
              <Title
                level={2}
                style={{
                  fontFamily: "OYoelTovia",
                }}
              >
                ~ עס זענען איינגעשריבן {userInfo.length} בחורים ~
              </Title>
            </div>
            <div className="top_pagination">
              {filteredUserInfo.length > pageSize && (
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredUserInfo.length}
                  onChange={handlePageChange}
                  showSizeChanger
                  pageSizeOptions={["30", "50", "100", "200"]}
                />
              )}
            </div>
          </div>
          <div className="add_user_container">
            <div className="search_inner">
              <SearchBar
                input={filteredUserInfo}
                onSearch={handleSearch}
                resetSearch={resetSearch}
              />
            </div>
            <div className="add_user_inner">
              <AddUser onUserAdded={handleUserAdded} />
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Button
                type="primary"
                onClick={() => handleArchive(selectedUsers)}
              >
                Archive Selected
              </Button>
            </div>
          )}
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
                      updatePayment={updatePayment}
                      isSelected={selectedUsers.includes(student.student_id)}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  </Col>
                ))}
              </Row>
              {filteredUserInfo.length > pageSize && (
                <div className="pagination">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredUserInfo.length}
                    onChange={handlePageChange}
                    showSizeChanger
                    pageSizeOptions={["30", "50", "100", "200"]}
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
