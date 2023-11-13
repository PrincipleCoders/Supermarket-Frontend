import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'inventory/product';

const UpdateProduct = async (product) => {
  try {
    console.log('Updating product:', product);
    const token = localStorage.getItem('userToken');
    const response = await axios.put(
      API_URL, product , 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedProduct = response.data;

    console.log('Product quantity updated:', updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product quantity:', error);
    return null; 
  }
};

export default UpdateProduct;
