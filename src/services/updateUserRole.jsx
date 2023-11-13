import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'auth/user/role';

const UpdateUserRole = async (userId, newRole) => {
  try {
    const token = localStorage.getItem('userToken');
    console.log('Updating user role:', userId, newRole);
    const response = await axios.put(
      API_URL,
      {
        userId: userId,
        role: newRole,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedUser = response.data;
    console.log('User role updated:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user role:', error);
   
    return null; 
  }
};

export default UpdateUserRole;
