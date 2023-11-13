import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'user/all';

const GetAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const allUsers = response.data;
    console.log('All Users:', allUsers);
    return allUsers;
  } catch (error) {
    console.error('Error fetching all users:', error);
    return null; // Return null or a default value indicating failure
  }
};

export default GetAllUsers;
