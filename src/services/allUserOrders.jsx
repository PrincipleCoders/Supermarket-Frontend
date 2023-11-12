import axios from 'axios';

const GetUserOrders = async (userId) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:8087/order/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const orders = response.data;
        console.log('All Orders:', orders);
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);

        return null;
    }
};

export default GetUserOrders;
