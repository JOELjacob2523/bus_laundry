import "./mainOldDataPage.css";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Collapse, Empty, Input, Modal, Radio } from "antd";
import OldZmanData from "./mainOldDataItems";
import OldSummerPayments from "../oldSummerPayments/oldSummerPayments";
import { Helmet } from "react-helmet";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

const MainOldDataPage = () => {
  const [items, setItems] = useState([]);
  const [oldZmanGoal, setOldZmanGoal] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [isSummerModalOpen, setIsSummerModalOpen] = useState(false);
  const [isWinterModalOpen, setIsWinterModalOpen] = useState(false);
  const [selectedHebrewYear, setSelectedHebrewYear] = useState("");
  const [selectedZman, setSelectedZman] = useState("");

  const { authData } = useAuth();

  useEffect(() => {
    if (originalItems.length === 0 && items.length > 0) {
      setOriginalItems(items);
    }
  }, [items, originalItems]);

  const normalizeString = (str) => {
    return str
      ?.trim()
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
        return itemLabel?.includes(normalizedValue);
      });
      setItems(filteredItems);
    }
  };

  const showSummerModal = useCallback((hebrewYear, zman) => {
    setSelectedHebrewYear(hebrewYear);
    setSelectedZman(zman);
    setIsSummerModalOpen(true);
  }, []);

  const handleSummerOk = useCallback(() => {
    setIsSummerModalOpen(false);
  }, []);

  const handleSummerCancel = useCallback(() => {
    setIsSummerModalOpen(false);
  }, []);

  const showWinterModal = useCallback((hebrewYear, zman) => {
    setSelectedHebrewYear(hebrewYear);
    setSelectedZman(zman);
    setIsWinterModalOpen(true);
  }, []);

  const handleWinterOk = useCallback(() => {
    setIsWinterModalOpen(false);
  }, []);

  const handleWinterCancel = useCallback(() => {
    setIsWinterModalOpen(false);
  }, []);

  const handleRadioChange = (e, item) => {
    const zman = e.target.value;
    if (zman === "קיץ") {
      showSummerModal(item.label, zman);
    } else if (zman === "חורף") {
      showWinterModal(item.label, zman);
    }
  };

  return (
    <div className="main_old_data_container">
      <Helmet>
        <title>Old Information - KJ Mesivta Bus & Laundry</title>
      </Helmet>
      <OldZmanData
        setItems={setItems}
        showSummerModal={showSummerModal}
        showWinterModal={showWinterModal}
        setOldZmanGoal={setOldZmanGoal}
        authData={authData}
      />
      <Card
        type="inner"
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
        <Collapse accordion>
          {items.length > 0 ? (
            items.map((item) => (
              <Collapse.Panel header={item.label} key={item.key}>
                <Radio.Group
                  value={item.value}
                  onChange={(e) => handleRadioChange(e, item)}
                >
                  <Radio value="חורף">חורף</Radio>
                  <Radio value="קיץ">קיץ</Radio>
                </Radio.Group>
              </Collapse.Panel>
            ))
          ) : (
            <div style={{ padding: "5px" }}>
              <Empty description="No data found" />
            </div>
          )}
        </Collapse>
        <Modal
          title={<div style={{ textAlign: "center" }}>זמן הקיץ</div>}
          open={isSummerModalOpen}
          onOk={handleSummerOk}
          onCancel={handleSummerCancel}
          footer={null}
          width={1000}
        >
          <OldSummerPayments
            oldZmanGoal={oldZmanGoal}
            items={items}
            selectedHebrewYear={selectedHebrewYear}
            selectedZman={selectedZman}
            authData={authData}
          />
        </Modal>
        <Modal
          title={<div style={{ textAlign: "center" }}>זמן החורף</div>}
          open={isWinterModalOpen}
          onOk={handleWinterOk}
          onCancel={handleWinterCancel}
          footer={null}
          width={1000}
        >
          <OldSummerPayments
            oldZmanGoal={oldZmanGoal}
            items={items}
            selectedHebrewYear={selectedHebrewYear}
            selectedZman={selectedZman}
            authData={authData}
            isWinter
          />
        </Modal>
      </Card>
    </div>
  );
};
export default MainOldDataPage;
