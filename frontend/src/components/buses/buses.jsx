import "../../Fonts/fonts.css";
import "./buses.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Pagination,
  Empty,
  Button,
  message,
  Typography,
  Flex,
  Spin,
  ConfigProvider,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { archiveOldStudentPayments } from "../../servers/postRequest";
import AddUser from "../addUser/newUserBtn";
import UserCard from "./userCard";
import SearchBar from "../search/search";
import { Helmet } from "react-helmet";
import { useAuth } from "../AuthProvider/AuthProvider";

const { Title } = Typography;

const customLocale = {
  Pagination: {
    items_per_page: "- בלעטער",
    jump_to: "גיי צו",
    jump_to_confirm: "באַשטעטיקן",
    page: "בלאט",
  },
};

const Buses = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [filteredUserInfo, setFilteredUserInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { authData, studentData, paymentData } = useAuth();
  const navigate = useNavigate();

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payments = paymentData;
        const adminIdData = studentData;

        if (!adminIdData || !paymentData) {
          setLoading(true);
        }

        // Group the payments by student_id
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

        // Set the data
        setUserInfo(adminIdData);
        setPaymentInfo(paymentMap);
        setFilteredUserInfo(adminIdData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [studentData, paymentData]);

  const handleUserAdded = async (newUser) => {
    try {
      const updatedUserInfo = studentData;
      setUserInfo(updatedUserInfo);
      setFilteredUserInfo(updatedUserInfo);
    } catch (err) {
      console.error("Failed to fetch updated user info:", err);
    }
  };

  // Handle pagination
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Handle search
  const handleSearch = (filteredData) => {
    setFilteredUserInfo(filteredData);
    setCurrentPage(1);
  };

  // Reset search
  const resetSearch = () => {
    setFilteredUserInfo(userInfo);
    setCurrentPage(1);
  };

  // Handle checkbox change
  const handleCheckboxChange = (studentId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(studentId)) {
        return prevSelectedUsers.filter((id) => id !== studentId);
      } else {
        return [...prevSelectedUsers, studentId];
      }
    });
  };

  // Handle archive
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

  // Update payment
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

  // Loading spinner
  if (loading) {
    <Flex className="loading_flax">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />{" "}
      Loading...
    </Flex>;
  }

  // Calculate the cards to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredUserInfo.slice(startIndex, endIndex);

  return (
    <div className="main_buses_container">
      <Helmet>
        <title>Bus & Wash - KJ Mesivta Bus & Laundry</title>
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
                ~ עס איז איינגעשריבן {filteredUserInfo.length}{" "}
                {filteredUserInfo.length > 1 ? "בחורים" : "בחור"} ~
              </Title>
            </div>
            <div className="top_pagination">
              {filteredUserInfo.length > pageSize && (
                <ConfigProvider locale={{ ...customLocale }}>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredUserInfo.length}
                    onChange={handlePageChange}
                    showSizeChanger={true}
                    pageSizeOptions={["30", "50", "100", "200"]}
                  />
                </ConfigProvider>
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
              <AddUser
                onUserAdded={handleUserAdded}
                setFilteredUserInfo={setFilteredUserInfo}
              />
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
                      setFilteredUserInfo={setFilteredUserInfo}
                      authData={authData}
                    />
                  </Col>
                ))}
              </Row>
              {filteredUserInfo.length > pageSize && (
                <div className="pagination">
                  <ConfigProvider locale={{ ...customLocale }}>
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={filteredUserInfo.length}
                      onChange={handlePageChange}
                      showSizeChanger={true}
                      pageSizeOptions={["30", "50", "100", "200"]}
                    />
                  </ConfigProvider>
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
