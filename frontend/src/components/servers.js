import axios from 'axios';  
let URL = `http://localhost:3001`;

  export const userInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try{
    const response = await axios.post(`${URL}/user_info`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200){
      console.log('Success!!')
    } else {
      console.log(`Error inserting! ${response.data}`)
    }
  } catch (err){
    console.error('Error:', err.message);
  }
}

  export const getUserInfo = async () => {
    try {
      const response = await axios.get(`${URL}/get_user_info`)
      const data = response.data;
        return data;
      }
      catch(error) {
        console.error('Error fetching data:', error);
      }
    }