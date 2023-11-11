import axios from 'axios';

const UpdateRemainingOrders = async (orderId, newIsPackedStatus) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(
      `https://localhost:8081/updateIsPackedStatus/${orderId}`,
      {
        isPacked: newIsPackedStatus,
      },
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
