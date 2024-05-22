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
export const getUserInfoById = async (userId, token) => {
  try {
    const response = await axios.get(`${URL}/get_user_info`, {
      params: {
        user_id: userId,
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
