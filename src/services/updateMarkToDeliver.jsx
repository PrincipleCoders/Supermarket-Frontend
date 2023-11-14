import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'deliver/markToDeliverStatus/';

const UpdateMarkToDeliver = async (orderId, markStatus) => {
  try {
    const token = localStorage.getItem('userToken');
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

export default UpdateMarkToDeliver;