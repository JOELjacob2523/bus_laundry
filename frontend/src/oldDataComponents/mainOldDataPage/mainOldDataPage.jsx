import "./mainOldDataPage.css";
import React, { useEffect, useState } from "react";
import { Card, Collapse, Input, Modal } from "antd";
import OldZmanData from "./mainOldDataItems";
import OldSummerPayments from "../oldPayments/oldPayments";

const MainOldDataPage = () => {
  const [items, setItems] = useState([]);
  const [oldZmanGoal, setOldZmanGoal] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [isSummerModalOpen, setIsSummerModalOpen] = useState(false);
  const [isWinterModalOpen, setIsWinterModalOpen] = useState(false);

  useEffect(() => {
    if (originalItems.length === 0 && items.length > 0) {
      setOriginalItems(items);
    }
  }, [items, originalItems]);

  const normalizeString = (str) => {
    return str
      .trim()
      .toLowerCase()
      .normalize("NFC")
      .replace(/״/g, '"')
      .replace(/['"]/g, "");
  };

  const onSearch = (value) => {
    if (!value) {
      setItems(originalItems);
    } else {
      const normalizedValue = normalizeString(value);
      const filteredItems = originalItems.filter((item) => {
        const itemLabel = normalizeString(item.label);
        return itemLabel.includes(normalizedValue);
      });
      setItems(filteredItems);
    }
  };

  const showSummerModal = () => {
    setIsSummerModalOpen(true);
  };
  const handleSummerOk = () => {
    setIsSummerModalOpen(false);
  };
  const handleSummerCancel = () => {
    setIsSummerModalOpen(false);
  };

  const showWinterModal = () => {
    setIsWinterModalOpen(true);
  };
  const handleWinterOk = () => {
    setIsWinterModalOpen(false);
  };
  const handleWinterCancel = () => {
    setIsWinterModalOpen(false);
  };

  return (
    <div className="main_old_data_container">
      <OldZmanData
        setItems={setItems}
        showSummerModal={showSummerModal}
        showWinterModal={showWinterModal}
        setOldZmanGoal={setOldZmanGoal}
      />
      <Card
        title={<div className="modal_title">אינפארמאציע לויט די יארן</div>}
        className="main_old_data_card"
      >
        <div className="old_data_search_container">
          <Input.Search
            allowClear
            onSearch={onSearch}
            className="old_data_search_input"
            placeholder="Type to search..."
          />
        </div>
        <Collapse accordion items={items} />
        <Modal
          title=""
          open={isSummerModalOpen}
          onOk={handleSummerOk}
          onCancel={handleSummerCancel}
          footer={null}
        >
          <OldSummerPayments oldZmanGoal={oldZmanGoal} items={items} />
        </Modal>
        <Modal
          title=""
          open={isWinterModalOpen}
          onOk={handleWinterOk}
          onCancel={handleWinterCancel}
          footer={null}
        >
          winter
        </Modal>
      </Card>
    </div>
  );
};
export default MainOldDataPage;
