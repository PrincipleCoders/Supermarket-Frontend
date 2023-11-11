import axios from 'axios';

const GetAllUsers = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get('https://localhost:8081/getAllUsers', {
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
