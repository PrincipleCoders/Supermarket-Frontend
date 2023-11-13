import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'order/checkout/user/';

const PostNewOrder = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      API_URL + `${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Response:', response);
    const newOrder = response.data;
    console.log('New order created:', newOrder);
    return newOrder;
  } catch (error) {
    console.error('Error creating new order:', error);
    return null; 
  }
};

export default PostNewOrder;
