import "./studentInfo.css";
import React, { useEffect, useState, forwardRef } from "react";
import { Card, List, Checkbox } from "antd";
import KYLetterhead from "../../../images/KY_Letterhead.png";
import { useAuth } from "../../AuthProvider/AuthProvider";

const StudentInfoToPrint = forwardRef((props, ref) => {
  const [indeterminate, setIndeterminate] = useState([]);
  const [zmanGoal, setZmanGoal] = useState([]);

  const { data } = props;
  const { zmanGoalData } = useAuth();

  useEffect(() => {
    setZmanGoal(zmanGoalData);
    if (
      !zmanGoal?.[0]?.total_bus_goal ||
      !zmanGoal?.[0]?.total_wash_goal ||
      !zmanGoal?.[0]?.total_van_goal ||
      !data?.length
    ) {
      setIndeterminate([]);
      return;
    }
    const newStates = data.map((student) => {
      const totalPaid = Number(student?.payment?.total_paid) || 0;
      const studentCity = student.city;
      const totalGoal = [
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
      return totalPaid >= totalGoal;
    });

    setIndeterminate(newStates);
  }, [data, zmanGoal, zmanGoalData]);

  return (
    <div ref={ref} className="student_info_to_print_container">
      {Array.from({ length: Math.ceil(data.length / 4) }).map(
        (_, pageIndex) => {
          const start = pageIndex * 4;
          const end = start + 4;
          const pageItems = data.slice(start, end);

          return (
            <div key={pageIndex} className="print_page">
              <div className="KY_letterhead_img_container print_only">
                <img
                  className="KY_letterhead_img"
                  alt="KYLetterhead"
                  src={KYLetterhead}
                />
              </div>
              <List
                itemLayout="vertical"
                className="print_list_container"
                dataSource={pageItems}
                renderItem={(student, index) => (
                  <div className="print_card_item">
                    <Card
                      type="inner"
                      size="small"
                      title={
                        <div className="print_list_titel_container">
                          <div className="print_list_titel_checkbox">
                            <Checkbox
                              key={student.student_id || start + index}
                              indeterminate={
                                indeterminate[start + index] || false
                              }
                            />
                          </div>
                          <div
                            className="print_list_titel_inner"
                            style={{ fontFamily: "OYoelTovia" }}
                          >
                            {student.first_name} {student.last_name}
                          </div>
                        </div>
                      }
                    >
                      <List.Item.Meta
                        description={
                          <div className="print_list_data_container">
                            <div className="label-container">
                              Age:
                              <div className="strong-container">
                                <strong>{student.age}</strong>
                              </div>
                            </div>

                            <div className="label-container">
                              Address:
                              <div className="strong-container">
                                <strong>{student.address1}</strong>
                              </div>
                            </div>

                            <div className="label-container">
                              City-State-Zip:
                              <div className="strong-container">
                                <strong>{student.city_state_zip}</strong>
                              </div>
                            </div>

                            <div className="label-container">
                              Phone Number:
                              <div className="strong-container">
                                <strong>
                                  {student.phone
                                    ? student.phone.replace(
                                        /^(\d{3})(\d{3})(\d{4})/,
                                        "$1-$2-$3"
                                      )
                                    : "N/A"}
                                </strong>
                              </div>
                            </div>

                            <div className="label-container">
                              Paid For Bus:
                              <div className="strong-container">
                                {student.payment ? (
                                  <strong>
                                    ${student.payment.bus_amount || 0}
                                  </strong>
                                ) : (
                                  <strong>$0</strong>
                                )}
                              </div>
                            </div>

                            <div className="label-container">
                              Paid For Wash:
                              <div className="strong-container">
                                {student.payment ? (
                                  <strong>
                                    ${student.payment.wash_amount || 0}
                                  </strong>
                                ) : (
                                  <strong>$0</strong>
                                )}
                              </div>
                            </div>

                            <div className="label-container">
                              Total Paid:
                              <div className="strong-container">
                                {student.payment ? (
                                  <strong>${student.payment.total_paid}</strong>
                                ) : (
                                  <strong>$0</strong>
                                )}
                              </div>
                            </div>

                            <div className="label-container">
                              Payment Date:
                              <div className="strong-container">
                                {student.payment ? (
                                  <strong>{student.payment.pay_date}</strong>
                                ) : (
                                  <strong>N/A</strong>
                                )}
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </div>
                )}
              />
            </div>
          );
        }
      )}
    </div>
  );
});

export default StudentInfoToPrint;
