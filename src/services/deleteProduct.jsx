import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'inventory/product/';

const DeleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.delete(
      API_URL + productId, 
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
