import axios from "axios";
let URL = `http://localhost:3001`;

//add user info
export const userInfo = async (formData) => {
  try {
    const response = await axios.post(`${URL}/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
    } else {
      console.log(`Error inserting! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

//confirm user info
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${URL}/login`,
      { email, password },
      { withCredentials: true }
    );

    if (response.status === 200) {
      return response;
    } else {
      console.log(`Error inserting! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

// //verify admin password
// export const verifyAdminPassword = async (password, newRole, id) => {
//   try {
//     const response = await axios.post(
//       `${URL}/verify_admin_password`,
//       { password, newRole, id },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.status === 200) {
//       console.log("Updated Success!!");
//     } else {
//       console.log(`Error updating! ${response.data}`);
//     }
//   } catch (err) {
//     console.error("Error:", err.message);
//     throw err;
//   }
// };

export const sendEmail = async (email) => {
  try {
    const response = await axios.post(
      `${URL}/forgot_password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      console.log(`Error sending email! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

export const resetPassword = async (newPassword, confirmationNumber) => {
  try {
    const response = await axios.post(
      `${URL}/reset_password`,
      { newPassword, confirmationNumber },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      console.log(`Error reseting password! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

//update user info
export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.post(
      `${URL}/update_user_profile_info`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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

//upload user logo
export const uploadUserlogo = async (file, adminId) => {
  const formData = new FormData();
  formData.append("logo_image", file);
  formData.append("user_id", adminId);
  try {
    const response = await axios.post(`${URL}/upload_user_logo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log(`Updated Success!!`);
    } else {
      console.log(`Error updating! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

//insert user CC link
export const insertCCLink = async (formData) => {
  try {
    const response = await axios.post(`${URL}/CC_link`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log(`Updated Success!!`);
    } else {
      console.log(`Error updating! ${response.data}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};
