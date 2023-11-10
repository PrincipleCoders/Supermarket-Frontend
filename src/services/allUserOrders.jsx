import axios from 'axios';

const GetUserOrders = async () => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('https://localhost:8081/allOrders', {
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
