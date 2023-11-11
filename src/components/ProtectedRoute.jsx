import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAlert} from "./AlertContext.jsx";

const ProtectedRoute = ({ element , roles , isLink= false }) => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const showAlert = useAlert();

    useEffect(() => {
        // Get the token and user data from local storage
        const userData = localStorage.getItem('user');
        const user = JSON.parse(userData);
        setUser(user);
    }, [location]);


    if (roles.includes('ADMIN')){
        return element;
    }

    if (isLink){
        return null;
    }
    else {
        showAlert('You are not authorized to access this page','error');
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
