import { useState, useEffect } from "react";
import { getAllUserInfo } from "../servers/getRequest";
import Buttons from "./mainPage2/main_page2";

const CityTotal = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [cityData, setCitiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUserInfo();
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = userInfo.map((user) => ({
      city: user.city.trim().toLowerCase().replace(/\s+/g, ""),
    }));
    setCitiData(data);
  }, [userInfo]);

  const cityCounts = {
    monroe: 0,
    brooklyn: 0,
    monsey: 0,
    boropark: 0,
  };

  cityData.forEach((cityItem) => {
    const cityName = cityItem.city;
    if (cityCounts[cityName] !== undefined) {
      cityCounts[cityName] += 1;
    }
  });

  return <>{cityCounts && <Buttons cityCounts={cityCounts} />}</>;
};

export default CityTotal;
