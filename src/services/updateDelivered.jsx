import axios from 'axios';

const UpdateDelivered = async (orderId, markStatus) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(
      `https://localhost:8081/updateDelivered/${orderId}`,
      {
        isDelivered: markStatus,
      },
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