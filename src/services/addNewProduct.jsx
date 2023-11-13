import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'inventory/product';

const AddNewProduct = async (newItem) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.post(API_URL, newItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming the server responds with the newly added item or a success message
    const addedItem = response.data;

    // Handle the added item as needed, e.g., update local state or display a success message
    console.log('Item added to inventory:', addedItem);
    return addedItem;
  } catch (error) {
    console.error('Error adding item to inventory:', error);
    // Handle the error, e.g., display an error message to the user
    return null; // Return null or a default value indicating failure
  }
};

export default AddNewProduct;
