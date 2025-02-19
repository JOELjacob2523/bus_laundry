import "./printStudentInfo.css";
import React, { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { Button, Card, Cascader, Modal } from "antd";
import { IoMdPrint } from "react-icons/io";
import StudentInfoToPrint from "./studentInfo/studentInfo";
import GoogleMaps from "../googleMapRoutes/googleMaps";
import { useAuth } from "../AuthProvider/AuthProvider";
import UploadImage from "../../userComponents/uploadImage/uploadImage";

const PrintStudentInfo = () => {
  const [open, setOpen] = useState(false);
  const [googleMpasModalOpen, setGoogleMpasModalOpen] = useState(false);
  const [mergedData, setMergedData] = useState([]);
  const [zmanGoal, setZmanGoal] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [infoParagraph, setInfoParagraph] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [key, setKey] = useState(0);

  const { authData, studentData, paymentData, zmanGoalData } = useAuth();
  const componentRef = useRef(null);

  // Merge student and payment data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = studentData;
        const payments = paymentData;
        const zmanGoalInfo = zmanGoalData;
        const logo = authData?.user_logo.filename;

        setLogoImage(logo);
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
  }, [studentData, paymentData, zmanGoalData, authData?.user_logo?.filename]);

  // Cascader options
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

  // Filter data based on selected option
  const handleFilterChange = (value) => {
    if (!value) {
      // Default behavior when value is cleared
      setFilteredData(mergedData);
      setInfoParagraph("אינפארמאציע פון אלע בחורים");
      return;
    }

    // Get the last selected option
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
      setInfoParagraph("אינפארמאציע פון באצאלטע בחורים");
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
      setInfoParagraph(
        "אינפארמאציע פון בחורים וואס האבן באצאלט פאר טראנספארטאציע"
      );
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
      setInfoParagraph(
        "אינפארמאציע פון בחורים וואס האבן נישט באצאלט פאר טראנספארטאציע"
      );
    } else if (selectedOption === "paid_wash_only") {
      // Filter students who paid for wash only
      const unpaidStudents = mergedData.filter((student) => {
        const totalPaid = Number(student.payment?.total_paid || 0);
        const totalWash = Number(zmanGoal[0]?.total_wash_goal);
        return totalPaid === totalWash;
      });
      setFilteredData(unpaidStudents);
      setInfoParagraph("אינפארמאציע פון בחורים וואס האבן באצאלט פאר וואשן");
    } else if (selectedOption === "unpaid_wash") {
      // Filter students who paid for wash only
      const unpaidStudents = mergedData.filter((student) => {
        const totalWashPaid = Number(student.payment?.wash_amount || 0);
        const totalWash = Number(zmanGoal[0]?.total_wash_goal);
        return totalWashPaid < totalWash;
      });
      setFilteredData(unpaidStudents);
      setInfoParagraph(
        "אינפארמאציע פון בחורים וואס האבן נישט באצאלט פאר וואשן"
      );
    } else if (selectedOption === "age_1") {
      // Filter students of שיעור א
      const ageOneStudents = mergedData.filter(
        (student) => student.age === "'שיעור א"
      );
      setFilteredData(ageOneStudents);
      setInfoParagraph("'אינפארמאציע פון בחורים פון שיעור א");
    } else if (selectedOption === "age_2") {
      // Filter students of שיעור ב
      const ageTwoStudents = mergedData.filter(
        (student) => student.age === "'שיעור ב"
      );
      setFilteredData(ageTwoStudents);
      setInfoParagraph("'אינפארמאציע פון בחורים פון שיעור ב");
    } else if (selectedOption === "young_age") {
      // Filter students of שיעור צעירים
      const youngAgeStudents = mergedData.filter(
        (student) => student.age === "שיעור צעירים"
      );
      setFilteredData(youngAgeStudents);
      setInfoParagraph("אינפארמאציע פון בחורים פון שיעור צעירים");
    } else if (selectedOption === "all") {
      // Default: Show all students
      setFilteredData(mergedData);
      setInfoParagraph("אינפארמאציע פון אלע בחורים");
    }
  };

  const handleCancel = () => {
    setOpen(false);
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
        onCancel={handleCancel}
        width={1100}
        footer={null}
      >
        <div className="print_container">
          {authData.user_logo ? (
            <div className="KY_letterhead_img_container">
              <img
                className="KY_letterhead_img"
                alt="KYLetterhead"
                src={`http://localhost:3001/images/${logoImage}`}
              />
            </div>
          ) : (
            <UploadImage />
          )}

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
          <StudentInfoToPrint
            ref={componentRef}
            data={filteredData}
            infoParagraph={infoParagraph}
            logoImage={logoImage}
          />
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
