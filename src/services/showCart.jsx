import axios from 'axios';

const GetCartItems = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get('https://localhost:8081/cartItems', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const cartItems = response.data;
    console.log('Cart Items:', cartItems);
    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
   
    return null; 
  }
};

export default GetCartItems;
