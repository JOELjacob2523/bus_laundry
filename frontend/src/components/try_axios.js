import axios from 'axios';

const apiCall = () => {
    axios.get('http://localhost:3001').then((data) => {
      //this console.log will be in our frontend console
      console.log(data)
    })
  }

  export default apiCall