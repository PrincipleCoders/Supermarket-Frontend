import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'order/';

const UpdateRemainingOrders = async (orderId, newIsPackedStatus) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(
      API_URL + orderId + '/isPacked/' + newIsPackedStatus,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedOrder = response.data;
    console.log('IsPacked status updated:', updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.error('Error updating IsPacked status:', error);
    return null;
  }
};

export default UpdateRemainingOrders;
