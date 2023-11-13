import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'order/remaining/all';

const GetRemainingOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming the server responds with an array of remaining orders
    const remainingOrders = response.data;

    // Handle the remaining orders as needed, e.g., update local state or display them
    console.log('Remaining Orders:', remainingOrders);
    return remainingOrders;
  } catch (error) {
    console.error('Error fetching remaining orders:', error);
    // Handle the error, e.g., display an error message to the user
    return null; // Return null or a default value indicating failure
  }
};

export default GetRemainingOrders;
