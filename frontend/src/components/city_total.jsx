import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainPage2 from "./mainPage2/main_page2";
import { useAuth } from "./AuthProvider/AuthProvider";

const CityTotal = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [cityData, setCitiData] = useState([]);

  const { authData, studentData, paymentData, zmanGoalData } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminIdData = studentData;
        setUserInfo(adminIdData);
      } catch (err) {
        console.error("Error fetching data:", err);
        navigate("/error500");
      }
    };

    fetchData();
  }, [navigate, studentData]);

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
    newcity: 0,
  };

  cityData.forEach((cityItem) => {
    const cityName = cityItem.city;
    if (cityCounts[cityName] !== undefined) {
      cityCounts[cityName] += 1;
    }
  });

  return (
    <>
      {cityCounts && (
        <MainPage2
          cityCounts={cityCounts}
          authData={authData}
          studentData={studentData}
          paymentData={paymentData}
          zmanGoalData={zmanGoalData}
        />
      )}
    </>
  );
};

export default CityTotal;
