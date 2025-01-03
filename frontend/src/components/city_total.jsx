import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserInfo } from "../servers/getRequest";
import MainPage2 from "./mainPage2/main_page2";

const CityTotal = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [cityData, setCitiData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUserInfo();
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        navigate("/error500");
      }
    };

    fetchData();
  }, [navigate]);

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
    springvalley: 0,
    airmont: 0,
    suffern: 0,
    boropark: 0,
  };

  cityData.forEach((cityItem) => {
    const cityName = cityItem.city;
    if (cityCounts[cityName] !== undefined) {
      cityCounts[cityName] += 1;
    }
  });

  return <>{cityCounts && <MainPage2 cityCounts={cityCounts} />}</>;
};

export default CityTotal;
