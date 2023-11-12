import axios from 'axios';

const UpdateUserRole = async (userId, newRole) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(
      `https://localhost:8081/updateUserRole/${userId}`,
      {
        userRole: newRole,
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
