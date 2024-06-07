import axios from "axios";
let URL = `http://localhost:3001`;

//get user info
export const getAllUserInfo = async () => {
  try {
    const response = await axios.get(`${URL}/get_all_user_info`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//get user info by ID
export const getUserInfoById = async (studentId, token) => {
  try {
    const response = await axios.get(`${URL}/get_user_info`, {
      params: {
        student_id: studentId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

//get zman goal info
export const getAllZmanGoalInfo = async () => {
  try {
    const response = await axios.get(`${URL}/get_zman_goal`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
