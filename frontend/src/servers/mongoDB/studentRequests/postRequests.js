import axios from "axios";
let URL = `http://localhost:3001/student`;

//add student info
export const MDBuserInfo = async (formData) => {
  try {
    const response = await axios.post(`${URL}/student_info_mdb`, formData, {
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
