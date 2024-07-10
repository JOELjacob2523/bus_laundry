import { useEffect } from "react";
import { getOldZmanGoalInfo } from "../../servers/getRequest";
import { HDate, HebrewDateEvent } from "@hebcal/core";
import { Select } from "antd";

const OldZmanData = ({ setItems }) => {
  useEffect(() => {
    const fetchOldZmanData = async () => {
      const data = await getOldZmanGoalInfo();

      const newItems = data.map((zmanGoal) => {
        const { day, month, year } = zmanGoal.zman_starts_ends.end.jewishDate;
        const hd = new HDate(day, month, year);
        const ev = new HebrewDateEvent(hd);
        const hebrewYear = ev.render("he-x-NoNikud").split(" ")[3];

        return {
          key: zmanGoal.zman_goal_id,
          label: hebrewYear,
          children: (
            <Select
              options={[
                { value: "חורף", label: "חורף" },
                { value: "קיץ", label: "קיץ" },
              ]}
              placeholder="קלויב א זמן"
              style={{ width: "20%" }}
            />
          ),
        };
      });
      setItems(newItems);
    };
    fetchOldZmanData();
  }, [setItems]);

  return null;
};

export default OldZmanData;
