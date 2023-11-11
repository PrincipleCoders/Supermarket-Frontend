import axios from 'axios';

const GetOrdersToDeliver = async () => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('https://localhost:8081/ordersToDeliver', {
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
