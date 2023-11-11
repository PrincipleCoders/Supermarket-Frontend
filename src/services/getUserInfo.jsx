import axios from 'axios';

const GetUserInfo = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get('https://localhost:8081/userInfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userInfo = response.data;
    console.log('User info retrieved successfully:', userInfo);
    return userInfo;

  } catch (error) {
    console.error('Error fetching user info:', error);
   
    return null; 
  }
};

export default GetUserInfo;
