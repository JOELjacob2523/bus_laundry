import "./printStudentInfo.css";
import React, { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { Button, Card, Cascader, Modal } from "antd";
import { IoMdPrint } from "react-icons/io";
import StudentInfoToPrint from "./studentInfo/studentInfo";
import GoogleMaps from "../googleMapRoutes/googleMaps";
import KYLetterhead from "../../images/KY_Letterhead.png";
import { useAuth } from "../AuthProvider/AuthProvider";

const PrintStudentInfo = () => {
  const [open, setOpen] = useState(false);
  const [googleMpasModalOpen, setGoogleMpasModalOpen] = useState(false);
  const [mergedData, setMergedData] = useState([]);
  const [zmanGoal, setZmanGoal] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { studentData, paymentData, zmanGoalData } = useAuth();
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = studentData;
        const payments = paymentData;
        const zmanGoalInfo = zmanGoalData;

        setZmanGoal(zmanGoalInfo);

        const merged = students.map((student, index) => {
          return {
            key: index,
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
  }, [studentData, paymentData, zmanGoalData]);

  const options = [
    {
      value: "all",
      label: "אלע בחורים",
    },
    {
      value: "paid",
      label: "באצאלט",
      children: [
        {
          value: "paid_in_full",
          label: "אויסגעצאלט",
        },
        {
          value: "paid_bus_only",
          label: "באצאלט פאר טראנספארטאציע",
        },
        {
          value: "paid_wash_only",
          label: "באצאלט פאר וואשן",
        },
      ],
    },
    {
      value: "unpaid",
      label: "נישט באצאלט",
      children: [
        {
          value: "unpaid_bus",
          label: "נישט באצאלט פאר טראנספארטאציע",
        },
        {
          value: "unpaid_wash",
          label: "נישט באצאלט פאר וואשן",
        },
      ],
    },
    {
      value: "age",
      label: "ביי די יארגאנג",
      children: [
        {
          value: "age_1",
          label: `'שיעור א`,
        },
        {
          value: "age_2",
          label: `'שיעור ב`,
        },
        {
          value: "young_age",
          label: `שיעור צעירים`,
        },
      ],
    },
  ];

  const handleFilterChange = (value) => {
    if (!value) {
      // Default behavior when value is cleared
      setFilteredData(mergedData);
      return;
    }

    const selectedOption = value[value.length - 1];

    if (selectedOption === "paid_in_full") {
      // Filter students who paid in full
      const unpaidStudents = mergedData.filter((student) => {
        const totalPaid = Number(student.payment?.total_paid || 0);
        const studentCity = student.city;
        const totalTravle = [
          "Monsey",
          "Airmont",
          "Spring Valley",
          "Suffern",
          "New City",
        ].includes(studentCity)
          ? Number(zmanGoal[0]?.total_van_goal) +
            Number(zmanGoal[0]?.total_wash_goal)
          : Number(zmanGoal[0]?.total_bus_goal) +
            Number(zmanGoal[0]?.total_wash_goal);
        return totalPaid === totalTravle;
      });
      setFilteredData(unpaidStudents);
    } else if (selectedOption === "paid_bus_only") {
      // Filter students who paid for travle only
      const unpaidStudents = mergedData.filter((student) => {
        const totalPaid = Number(student.payment?.total_paid || 0);
        const studentCity = student.city;
        const totalTravle = [
          "Monsey",
          "Airmont",
          "Spring Valley",
          "Suffern",
          "New City",
        ].includes(studentCity)
          ? Number(zmanGoal[0]?.total_van_goal)
          : Number(zmanGoal[0]?.total_bus_goal);
        return totalPaid === totalTravle;
      });
      setFilteredData(unpaidStudents);
    } else if (selectedOption === "unpaid_bus") {
      // Filter students who paid for travle only
      const unpaidStudents = mergedData.filter((student) => {
        const totalTravlePaid = Number(student.payment?.bus_amount || 0);
        const studentCity = student.city;
        const totalTravle = [
          "Monsey",
          "Airmont",
          "Spring Valley",
          "Suffern",
          "New City",
        ].includes(studentCity)
          ? Number(zmanGoal[0]?.total_van_goal)
          : Number(zmanGoal[0]?.total_bus_goal);
        return totalTravlePaid < totalTravle;
      });
      setFilteredData(unpaidStudents);
    } else if (selectedOption === "paid_wash_only") {
      // Filter students who paid for wash only
      const unpaidStudents = mergedData.filter((student) => {
        const totalPaid = Number(student.payment?.total_paid || 0);
        const totalWash = Number(zmanGoal[0]?.total_wash_goal);
        return totalPaid === totalWash;
      });
      setFilteredData(unpaidStudents);
    } else if (selectedOption === "unpaid_wash") {
      // Filter students who paid for wash only
      const unpaidStudents = mergedData.filter((student) => {
        const totalWashPaid = Number(student.payment?.wash_amount || 0);
        const totalWash = Number(zmanGoal[0]?.total_wash_goal);
        return totalWashPaid < totalWash;
      });
      setFilteredData(unpaidStudents);
    } else if (selectedOption === "age_1") {
      // Filter students of שיעור א
      const ageOneStudents = mergedData.filter(
        (student) => student.age === "'שיעור א"
      );
      setFilteredData(ageOneStudents);
    } else if (selectedOption === "age_2") {
      // Filter students of שיעור ב
      const ageTwoStudents = mergedData.filter(
        (student) => student.age === "'שיעור ב"
      );
      setFilteredData(ageTwoStudents);
    } else if (selectedOption === "young_age") {
      // Filter students of שיעור צעירים
      const youngAgeStudents = mergedData.filter(
        (student) => student.age === "שיעור צעירים"
      );
      setFilteredData(youngAgeStudents);
    } else if (selectedOption === "all") {
      // Default: Show all students
      setFilteredData(mergedData);
    }
  };

  return (
    <>
      <div>
        <Card
          title={<div className="modal_title">בחורים אינפארמאציע</div>}
          className="zman_goal_card"
        >
          <div className="zman_goal_description">
            דרוק דא ארויסצופרינטן אינפארמאציע
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="print_student_info_btn"
          >
            <IoMdPrint />
          </Button>
        </Card>
      </div>
      <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={1100}
        footer={null}
      >
        <div className="print_container">
          <div className="KY_letterhead_img_container">
            <img
              className="KY_letterhead_img"
              alt="KYLetterhead"
              src={KYLetterhead}
            />
          </div>

          <div className="print_student_info_header">
            <div>
              <ReactToPrint
                trigger={() => (
                  <div className="print_student_table_info_container">
                    <div className="print_student_table_info_btn">
                      <Button
                        type="primary"
                        className="print_student_table_info"
                        // onClick={() => console.log(componentRef.current)}
                      >
                        Print this page
                      </Button>
                    </div>
                  </div>
                )}
                content={() => componentRef.current}
              />
            </div>

            <div>
              <Cascader
                options={options}
                onChange={handleFilterChange}
                placeholder="...קלויב אויס א גרופע"
                style={{ width: 400 }}
                size="large"
              />
            </div>

            <div className="google_maps_btn_container">
              <Button
                type="primary"
                onClick={() => setGoogleMpasModalOpen(true)}
              >
                Google Maps
              </Button>
            </div>
          </div>
        </div>

        <div className="print_student_info_container">
          <StudentInfoToPrint ref={componentRef} data={filteredData} />
        </div>
        <Modal
          open={googleMpasModalOpen}
          onCancel={() => setGoogleMpasModalOpen(false)}
          footer={null}
          width={1100}
          className="google_maps_modal"
        >
          <GoogleMaps />
        </Modal>
      </Modal>
    </>
  );
};
export default PrintStudentInfo;
