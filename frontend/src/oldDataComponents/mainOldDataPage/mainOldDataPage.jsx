import "./mainOldDataPage.css";
import React, { useEffect, useState } from "react";
import { Card, Collapse, Input } from "antd";
import OldZmanData from "./mainOldDataItems";

const MainOldDataPage = () => {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);

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
      // If the search value is empty, reset to the original items
      setItems(originalItems);
    } else {
      const normalizedValue = normalizeString(value);
      // Filter the items based on the search value
      const filteredItems = originalItems.filter((item) => {
        const itemLabel = normalizeString(item.label);
        return itemLabel.includes(normalizedValue);
      });
      setItems(filteredItems);
    }
  };

  return (
    <div className="main_old_data_container">
      <OldZmanData setItems={setItems} />
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
      </Card>
    </div>
  );
};
export default MainOldDataPage;
