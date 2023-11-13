import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'order/user/';

const GetUserOrders = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL + userId, {
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
