import axios from 'axios';

const PostNewOrder = async (userId) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.post(
      'https://localhost:8081/createNewOrder',
      {
        userId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newOrder = response.data;
    console.log('New order created:', newOrder);
    return newOrder;
  } catch (error) {
    console.error('Error creating new order:', error);
    return null; 
  }
};

export default PostNewOrder;
