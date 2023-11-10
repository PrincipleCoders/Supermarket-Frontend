import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllOrders = async() => {
    try {

        const token = localStorage.getItem('userToken');
        const response = await axios.get('https://localhost:8081/allorders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return (response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};
export default GetAllOrders;


