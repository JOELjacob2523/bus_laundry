import axios from "axios";
let URL = `http://localhost:3001`;

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get(`/check_auth`);
    return response;
  } catch (err) {
    if (err.response) {
    } else if (err.request) {
    } else {
    }
    throw err;
  }
};
