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

export const paymentForm = async (formData) => {
  try {
    const response = await axios.post(`${URL}/submit_cc_form`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Filled Success!!");
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};
