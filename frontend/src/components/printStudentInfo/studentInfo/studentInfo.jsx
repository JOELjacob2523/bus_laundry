import React, { useEffect, useRef, useState, forwardRef } from "react";
import { getAllPaymentInfo, getAllUserInfo } from "../../../servers/getRequest";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import KYLetterhead from "../../../images/KY_Letterhead.png";

const StudentInfoToPrint = forwardRef((props, ref) => {
  const [studentInfo, setStudentInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await getAllUserInfo();
        const payments = await getAllPaymentInfo();

        setStudentInfo(students);
        setPaymentInfo(payments);

        const merged = students.map((student) => {
          return {
            ...student,
            payment: payments.find(
              (payment) => payment.student_id === student.student_id
            ),
            city_state_zip: `${student.city}, ${student.state} ${student.zip_code}`,
          };
        });
        setMergedData(merged);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      ...getColumnSearchProps("first_name"),
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      ...getColumnSearchProps("last_name"),
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address 1",
      dataIndex: "address1",
      key: "address1",
      ...getColumnSearchProps("address1"),
    },
    {
      title: "Address 2",
      dataIndex: "address2",
      key: "address2",
      ...getColumnSearchProps("address2"),
    },
    {
      title: "City-State-Zip",
      dataIndex: "city_state_zip",
      key: "city_state_zip",
      ...getColumnSearchProps("city_state_zip"),
    },
    {
      title: "Balance",
      dataIndex: ["payment", "total_paid"],
      key: "payment.total_paid",
      render: (payment) => (payment && payment ? payment.total_paid : "-"),
      ...getColumnSearchProps("payment.total_paid"),
    },
    {
      title: "Payment Date",
      dataIndex: ["payment", "pay_date"],
      key: "payment.pay_date",
      render: (payment) => (payment && payment ? payment.pay_date : "-"),
      ...getColumnSearchProps("payment.pay_date"),
    },
  ];

  return (
    <div className="student_info_to_print" ref={ref}>
      <div className="KY_letterhead_img_container">
        <img
          className="KY_letterhead_img"
          alt="KYLetterhead"
          src={KYLetterhead}
        />
      </div>{" "}
      <Table columns={columns} dataSource={mergedData} pagination={false} />
    </div>
  );
});

export default StudentInfoToPrint;
