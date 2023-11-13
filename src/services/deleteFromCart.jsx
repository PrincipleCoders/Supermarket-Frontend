import axios from 'axios';

const RemoveItemFromCart = async (itemId,userId) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.delete(`http://localhost:8087/cart/user/${userId}/product/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming the server responds with a success message or updated cart data
    const responseData = response.data;

    // Handle the response as needed, e.g., update local state or display a success message
    console.log('Item removed successfully:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error removing item from the cart:', error);
    // Handle the error, e.g., display an error message to the user
    return null; // Return null or a default value indicating failure
  }
};

export default RemoveItemFromCart;
