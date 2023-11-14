import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'auth/user/';

const GetUserAuthInfo = async (userId) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(API_URL + userId, {
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

export default GetUserAuthInfo;
