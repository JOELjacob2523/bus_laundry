import { useEffect } from "react";
import {
  getOldZmanGoalInfo,
  getOldZmanGoalInfoByAdminId,
} from "../../servers/getRequest";
import { HDate, HebrewDateEvent } from "@hebcal/core";
import { Radio } from "antd";

const OldZmanData = ({ setItems, setOldZmanGoal, authData }) => {
  useEffect(() => {
    const fetchOldZmanData = async () => {
      // const data = await getOldZmanGoalInfo();
      const data = await getOldZmanGoalInfoByAdminId(authData.parent_admin_id);
      setOldZmanGoal(data);

      const newItems = data.map((zmanGoal) => {
        const { day, month, year } = zmanGoal.zman_starts_ends.end.jewishDate;
        const hd = new HDate(day, month, year);
        const ev = new HebrewDateEvent(hd);
        const hebrewYear = ev.render("he-x-NoNikud").split(" ")[2];

        return {
          key: zmanGoal.zman_goal_id,
          label: hebrewYear,
          items: (
            <Radio.Group>
              <Radio value="חורף">חורף</Radio>
              <Radio value="קיץ">קיץ</Radio>
            </Radio.Group>
          ),
        };
      });
      setItems(newItems);
    };
    fetchOldZmanData();
  }, [setItems, setOldZmanGoal, authData.parent_admin_id]);

  return null;
};

export default OldZmanData;
