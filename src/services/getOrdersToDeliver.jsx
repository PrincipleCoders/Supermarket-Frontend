import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'delivery/order/ready/all';

const GetOrdersToDeliver = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const ordersToDeliver = response.data;

        console.log('Orders to Deliver:', ordersToDeliver);
        return ordersToDeliver;
    } catch (error) {
        console.error('Error fetching orders to deliver:', error);
        return null;
    };
}
export default GetOrdersToDeliver;
