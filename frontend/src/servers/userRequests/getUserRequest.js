import axios from "axios";
let URL = `http://localhost:3001`;

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get(`/check_auth`);
    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};

//get user info by ID
export const getStudentLoginInfo = async (userId) => {
  try {
    const response = await axios.get(`${URL}/get_student_login_info`, {
      params: {
        user_id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
