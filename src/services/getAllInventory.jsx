import axios from 'axios';

const GetAllInventoryItems = async () => {
  try {
    const response = await axios.get('https://localhost:8081/allInventoryItems');

    // Assuming the server responds with an array of inventory items
    const inventoryItems = response.data;

    // Handle the inventory items as needed, e.g., update local state or display them
    console.log('All Inventory Items:', inventoryItems);
    return inventoryItems;
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    // Handle the error, e.g., display an error message to the user
    return null; // Return null or a default value indicating failure
  }
};

export default GetAllInventoryItems;
