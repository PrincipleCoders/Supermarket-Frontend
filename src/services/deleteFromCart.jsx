import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'order/cart/user/';

const RemoveItemFromCart = async (itemId,userId) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.delete(API_URL + userId + '/product/' + itemId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export default RemoveItemFromCart;
