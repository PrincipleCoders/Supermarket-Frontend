import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAlert} from "./AlertContext.jsx";

const ProtectedRoute = ({ element , roles , isLink= false }) => {
    const showAlert = useAlert();
    // const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    // useEffect(() => {
    //     // Get the token and user data from local storage
    //     const userData = localStorage.getItem('user');
    //     const user = JSON.parse(userData);
    //     console.log(user);
    // }, [location]);  

    console.log(user);
    if (user && roles.includes(user.role)){
        return element;
    }
    else if (isLink){
        return null;
    }
    else if (user){
        showAlert('You are not authorized to access this page','error');
        return <Navigate to="/" />;
    }
    else {
        showAlert('You are not authorized to access this page','error');
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
