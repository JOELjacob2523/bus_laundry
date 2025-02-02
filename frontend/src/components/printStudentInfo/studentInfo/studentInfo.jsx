import "./studentInfo.css";
import React, { useEffect, useState, forwardRef } from "react";
import { Card, List, Checkbox, Empty, Typography } from "antd";
import { useAuth } from "../../AuthProvider/AuthProvider";

const { Title } = Typography;

const StudentInfoToPrint = forwardRef((props, ref) => {
  const [indeterminate, setIndeterminate] = useState([]);
  const [zmanGoal, setZmanGoal] = useState([]);

  const { data, infoParagraph, logoImage } = props;
  const { authData, zmanGoalData } = useAuth();

  // set the zman goal and indeterminate states
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

  // console.log(authData.user_logo.filename);

  return (
    <div ref={ref} className="student_info_to_print_container">
      <div className="info_paragraph_container">
        <Title level={2} italic={true} style={{ fontFamily: "OYoelTovia" }}>
          {infoParagraph}
        </Title>
      </div>
      {data.length === 0 ? (
        <div className="empty_container">
          <Empty description="עס איז נישט דא יעצט קיין אינפארמאציע" />
        </div>
      ) : (
        Array.from({ length: Math.ceil(data.length / 3) }).map(
          (_, pageIndex) => {
            const start = pageIndex * 3;
            const end = start + 3;
            const pageItems = data.slice(start, end);

            return (
              <div key={pageIndex} className="print_page">
                {authData.user_logo ? (
                  <div className="KY_letterhead_img_container print_only">
                    <img
                      className="KY_letterhead_img"
                      alt="KYLetterhead"
                      src={`http://localhost:3001/images/${logoImage}`}
                    />
                  </div>
                ) : (
                  <Empty
                    description={
                      <div>
                        אריינצוברענגען דא דיין בילד, גיי צו{" "}
                        <strong>איבריגע דעטאלן</strong>
                      </div>
                    }
                  />
                )}
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
                                    <strong>
                                      ${student.payment.total_paid}
                                    </strong>
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
        )
      )}
    </div>
  );
});

export default StudentInfoToPrint;
