import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'order/cart/add'

const UpdateCart = async (userId, productId,quantity) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(
      API_URL,
      {
        productId: productId,
        userId: userId,
        quantity: quantity
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    console.log('Cart updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating cart:', error);
    // Handle the error, e.g., display an error message to the user
  }
};

export default UpdateCart;
