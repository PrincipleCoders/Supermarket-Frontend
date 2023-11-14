import axios from 'axios';

const GetOrderItems = async(userId,orderId) => {
    try {

        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:8088/inventory/product/Items/${userId}/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return (response.data);
    } catch (error) {
        console.error('Error fetching Items:', error);
    }
};
export default GetOrderItems;