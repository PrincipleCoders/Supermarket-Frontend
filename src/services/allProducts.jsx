import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'inventory/product/all';

const AllProducts = async() => {
    try {

        const token = localStorage.getItem('userToken');
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return (response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};
export default AllProducts;


