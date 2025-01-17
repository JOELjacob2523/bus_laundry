import "./studentInfo.css";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import {
  getAllStudentInfoByAdminID,
  getAllPaymentInfoByAdminID,
} from "../../../servers/getRequest";
import { Card, List } from "antd";
import KYLetterhead from "../../../images/KY_Letterhead.png";
import { useAuth } from "../../AuthProvider/AuthProvider";

const StudentInfoToPrint = forwardRef((props, ref) => {
  const [studentInfo, setStudentInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const searchInput = useRef(null);

  const { authData } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await getAllStudentInfoByAdminID(
          authData.parent_admin_id
        );
        const payments = await getAllPaymentInfoByAdminID(
          authData.parent_admin_id
        );

        setStudentInfo(students);
        setPaymentInfo(payments);

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
  }, [authData.parent_admin_id]);

  return (
    // <div ref={ref} className="student_info_to_print_container">
    //   <div className="KY_letterhead_img_container">
    //     <img
    //       className="KY_letterhead_img"
    //       alt="KYLetterhead"
    //       src={KYLetterhead}
    //     />
    //   </div>
    //   <div className="print_main_container">
    //     <List
    //       itemLayout="vertical"
    //       className="print_list_container"
    //       dataSource={mergedData}
    //       bordered
    //       renderItem={(student, index) => (
    //         <>
    //           <List.Item className="print_list_item">
    //             <List.Item.Meta
    //               title={
    //                 <div className="print_list_titel_container">
    //                   {student.first_name} {student.last_name}{" "}
    //                 </div>
    //               }
    //               description={
    //                 <div className="print_list_data_container">
    //                   <div className="label-container">
    //                     Age:{" "}
    //                     <div className="strong-container">
    //                       <strong>{student.age}</strong>
    //                     </div>
    //                   </div>

    //                   <div className="label-container">
    //                     Address:
    //                     <div className="strong-container">
    //                       <strong>{student.address1}</strong>
    //                     </div>
    //                   </div>

    //                   <div className="label-container">
    //                     City-State-Zip:
    //                     <div className="strong-container">
    //                       <strong>{student.city_state_zip}</strong>
    //                     </div>
    //                   </div>

    //                   <div className="label-container">
    //                     Phone Number:
    //                     <div className="strong-container">
    //                       <strong>
    //                         {student.phone
    //                           ? student.phone.replace(
    //                               /^(\d{3})(\d{3})(\d{4})/,
    //                               "$1-$2-$3"
    //                             )
    //                           : "N/A"}
    //                       </strong>
    //                     </div>
    //                   </div>

    //                   <div className="label-container">
    //                     Paid For Bus:
    //                     <div className="strong-container">
    //                       {student.payment ? (
    //                         <strong>
    //                           $
    //                           {(student.payment &&
    //                             student.payment.bus_amount) ||
    //                             0}
    //                         </strong>
    //                       ) : (
    //                         <strong>$0</strong>
    //                       )}
    //                     </div>
    //                   </div>

    //                   <div className="label-container">
    //                     Paid For Wash:
    //                     <div className="strong-container">
    //                       {student.payment ? (
    //                         <strong>
    //                           $
    //                           {(student.payment &&
    //                             student.payment.wash_amount) ||
    //                             0}
    //                         </strong>
    //                       ) : (
    //                         <strong>$0</strong>
    //                       )}
    //                     </div>
    //                   </div>

    //                   <div className="label-container">
    //                     Total Paid:
    //                     <div className="strong-container">
    //                       {student.payment ? (
    //                         <strong>
    //                           ${student.payment && student.payment.total_paid}
    //                         </strong>
    //                       ) : (
    //                         <strong>$0</strong>
    //                       )}
    //                     </div>
    //                   </div>

    //                   <div className="label-container">
    //                     Payment Date:
    //                     <div className="strong-container">
    //                       {student.payment ? (
    //                         <strong>
    //                           {student.payment && student.payment.pay_date}
    //                         </strong>
    //                       ) : (
    //                         <strong>N/A</strong>
    //                       )}
    //                     </div>
    //                   </div>
    //                 </div>
    //               }
    //             />
    //           </List.Item>
    //           {(index + 1) % 5 === 0 && (
    //             <div
    //               className="page_break"
    //               style={{ pageBreakAfter: "always" }}
    //             ></div>
    //           )}
    //         </>
    //       )}
    //     />
    //   </div>
    // </div>
    <div ref={ref} className="student_info_to_print_container">
      {Array.from({ length: Math.ceil(mergedData.length / 4) }).map(
        (_, pageIndex) => {
          const start = pageIndex * 4;
          const end = start + 4;
          const pageItems = mergedData.slice(start, end);

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
                renderItem={(student) => (
                  // <List.Item className="print_list_item">
                  <div className="print_card_item">
                    <Card
                      type="inner"
                      size="small"
                      title={
                        <div
                          className="print_list_titel_container"
                          style={{ fontFamily: "OYoelTovia" }}
                        >
                          {student.first_name} {student.last_name}
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
                  // </List.Item>
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
