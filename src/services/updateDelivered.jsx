import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'delivery/delivered/';

const UpdateDelivered = async (orderId, markStatus) => {
  try {
    const token = localStorage.getItem('userToken');
    console.log(orderId, markStatus)
    const response = await axios.put(
      API_URL + orderId + '/' + markStatus,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedOrder = response.data;
    console.log('markToDeliver status updated:', updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.error('Error updating markToDeliver status:', error);
    return null;
  }
};

export default UpdateDelivered;