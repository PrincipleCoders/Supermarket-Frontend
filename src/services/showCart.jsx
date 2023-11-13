import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'order/cart/user/';

const GetCartItems = async (userId) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(API_URL + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const cartItems = response.data;
    console.log('Cart Items:', cartItems);
    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
   
    return error; 
  }
};

export default GetCartItems;
