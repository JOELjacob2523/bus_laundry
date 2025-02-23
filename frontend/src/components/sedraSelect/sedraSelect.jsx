import React, { useEffect, useState } from "react";
import { HDate } from "hebcal";
import { Select } from "antd";

const { Option } = Select;

const SedraSelect = ({ onChange }) => {
  const [sedras, setSedras] = useState([]);

  // Fetch all sedras for the current year
  useEffect(() => {
    const getAllSedras = (year) => {
      const startDate = new HDate(new Date(year, 0, 1));
      const endDate = new HDate(new Date(year + 1, 12, 1));

      const sedras = [];

      for (
        let date = startDate;
        date.abs() <= endDate.abs();
        date = date.next()
      ) {
        if (date.getDay() === 6) {
          const events = date.getSedra("h");
          const fullYear = date.toString("h");
          if (events && events.length > 0) {
            const gregDate = date.greg();
            const parsha = events.join(" - ");
            sedras.push({
              id: `${gregDate.toISOString().split("T")[0]} - ${parsha}`,
              date: gregDate.toISOString().split("T")[0],
              sedra: parsha,
              hebrewDate: fullYear,
            });
          }
        }
      }

      return sedras;
    };

    // set the current year
    const year = new Date().getFullYear();
    const fetchedSedras = getAllSedras(year);
    setSedras(fetchedSedras);
  }, []);

  // Handle the change of the select
  const handleSelectChange = (value, option) => {
    const selectedSedra = sedras.find((sedra) => sedra.id === value);
    onChange(selectedSedra);
  };

  return (
    <div>
      <Select
        showSearch
        onChange={handleSelectChange}
        style={{
          width: 350,
        }}
        placeholder="Search to Select"
        optionFilterProp="label"
        filterOption={(input, option) =>
          option.label
            ? option.label
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            : false
        }
        // Sort the options by the sedra name
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
      >
        {sedras.map((sedra, index) => (
          <Option key={index} value={sedra.id}>
            {sedra.date} - פרשת {sedra.sedra} - {sedra.hebrewDate}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SedraSelect;
