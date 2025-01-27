import "./addUser.css";
import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import Draggable from "react-draggable";
import AddUserForm from "./addUser";
import { useAuth } from "../AuthProvider/AuthProvider";

const AddUser = ({ onUserAdded, setFilteredUserInfo }) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [key, setKey] = useState(0);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const { authData } = useAuth();

  // open the modal
  const showModal = () => {
    setOpen(true);
  };

  // close the modal
  const handleOk = () => {
    setOpen(false);
  };

  // close the modal
  const handleCancel = () => {
    setOpen(false);
    setKey((prevKey) => prevKey + 1);
  };

  // set the bounds of the modal
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <div className="add_btn_container">
        <Button type="primary" className="add_btn" onClick={showModal}>
          לייג צו א בחור
        </Button>
      </div>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            לייג צו א בחור
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        key={key}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
        footer={null}
      >
        {/* AddUserForm component */}
        <AddUserForm
          handleCancel={handleCancel}
          onUserAdded={onUserAdded}
          authData={authData}
          setFilteredUserInfo={setFilteredUserInfo}
        />
      </Modal>
    </>
  );
};
export default AddUser;
