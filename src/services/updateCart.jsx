import axios from 'axios';

const UpdateCart = async (cartItemId, quantity) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(
      'https://localhost:8081/updateCart',
      {
        cartItemId: cartItemId,
        quantity: quantity,
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
