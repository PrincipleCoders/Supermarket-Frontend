import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'order/user/all';

export default async function getAllOrders() {
    try {
        const response = await axios.get(API_URL);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


