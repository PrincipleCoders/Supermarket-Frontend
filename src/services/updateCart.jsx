import axios from 'axios';

const UpdateCart = async (userId, productId,quantity) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.post(
      'http://localhost:8087/cart',
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
