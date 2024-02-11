import axios from 'axios';

export const apiCall = () => {
    axios.get('http://localhost:3001').then((data) => {
      //this console.log will be in our frontend console
      console.log(data)
      console.log(`This is my data ${data.data}`)
    })
  }

  export const userInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try{
    const response = await axios.post('http://localhost:3001/user_info', formData, {
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