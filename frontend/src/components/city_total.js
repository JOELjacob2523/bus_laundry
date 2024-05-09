import {useState, useEffect } from 'react';
import { getUserInfo } from './servers';
import Buttons from './main_page';
import MonseyStudents from './monsey_students';

const CityTotal = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [cityData, setCitiData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await getUserInfo();
                setUserInfo(data);
            } catch (err){
                console.error('Error fetching data:', err)
            }
        };
        
        fetchData();
    }, [])

    useEffect(() => {

        const data = userInfo.map((user) => ({
            city: user.city.trim().toLowerCase().replace(/\s+/g, '')        
      }));
        setCitiData(data)
    }, [userInfo])

    const cityCounts = {
        monroe: 0,
        brooklyn: 0,
        monsey: 0,
        boropark: 0,
    };

    cityData.forEach((cityItem) => {
        const cityName = cityItem.city;
        cityCounts[cityName] += 1;
    });

      return (
        <>
            {cityCounts && (
                < Buttons cityCounts={cityCounts} />
            )}
            {userInfo.length > 0 && (
                < MonseyStudents monseyStudents={userInfo}/> 
            )}         
        </>
      );
}

export default CityTotal