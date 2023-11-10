import axios from 'axios';

const UpdateMarkToDeliver = async (orderId, markStatus) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(
      `https://localhost:8081/updateMarktoDeliver/${orderId}`,
      {
        markToDeliver: markStatus,
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

export default UpdateMarkToDeliver;