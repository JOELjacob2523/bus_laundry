import "./printStudentInfo.css";
import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button, Card, Modal } from "antd";
import { IoMdPrint } from "react-icons/io";
import StudentInfoToPrint from "./studentInfo/studentInfo";

const PrintStudentInfo = () => {
  const [open, setOpen] = useState(false);
  const componentRef = useRef(null);

  return (
    <>
      <div>
        <Card
          title={<div className="modal_title">בחורים אינפארמאציע</div>}
          className="zman_goal_card"
        >
          <div className="zman_goal_description">
            דרוק דא ארויסצופרינטן די בחורים אינפארמאציע
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
        title={<div className="modal_title">בחורים אינפארמאציע</div>}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={1700}
        footer={null}
      >
        <div>
          <ReactToPrint
            trigger={() => (
              <div className="print_student_table_info_container">
                <Button type="primary" className="print_student_table_info">
                  Print this page
                </Button>
              </div>
            )}
            content={() => componentRef.current}
          />
          <StudentInfoToPrint ref={componentRef} />
        </div>
      </Modal>
    </>
  );
};
export default PrintStudentInfo;
