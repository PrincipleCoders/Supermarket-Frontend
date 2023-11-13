import axios from 'axios';

const DeleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.delete(
      `https://localhost:8081/inventory/deleteProduct/${productId}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const deleteMsg = response.data;

    console.log('Product deleted:', deleteMsg);
    return deleteMsg;
  } catch (error) {
    console.error('Error deleting product :', error);
    return null; 
  }
};

export default DeleteProduct;
