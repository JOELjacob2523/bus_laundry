import axios from "axios";
let URL = `http://localhost:3001`;

//add user info
export const userInfo = async (formData) => {
  try {
    const response = await axios.post(`${URL}/user_info`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("Success!!");
    } else {
      console.log(`Error inserting! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

//update user info
export const updateUserInfo = async (formData) => {
  try {
    const response = await axios.post(`${URL}/update_user_info`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("Updated Success!!");
    } else {
      console.log(`Error updating! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};
