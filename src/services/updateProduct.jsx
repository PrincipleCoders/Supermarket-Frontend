import axios from 'axios';

const UpdateProduct = async (productId, product) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(
      `https://localhost:8081/updateProduct/${productId}`, product , 
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
