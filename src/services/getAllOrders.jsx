import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'order/user/all';

const GetAllOrders = async() => {
    try {

        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return (response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};
export default GetAllOrders;


